import User from "../models/User.js";
import { getStripe } from "../services/stripe.service.js";

/* ======================
   CREATE CHECKOUT SESSION
====================== */

export const checkout = async (req, res) => {
  try {
    const stripe = getStripe();

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Язык пользователя
    const lang = req.body?.lang === "en" ? "en" : "ru";

    // URL фронтенда
    const FRONTEND_URL = "http://127.0.0.1:5500";

    const successUrl =
      lang === "en"
        ? `${FRONTEND_URL}/en/success.html`
        : `${FRONTEND_URL}/success.html`;

    const cancelUrl =
      lang === "en"
        ? `${FRONTEND_URL}/en/cancel.html`
        : `${FRONTEND_URL}/cancel.html`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Resume Builder PRO",
            },
            unit_amount: 200, // 2.00 EUR
          },
          quantity: 1,
        },
      ],

      success_url: successUrl,
      cancel_url: cancelUrl,

      metadata: {
        userId,
      },
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ message: "Stripe error" });
  }
};

/* ======================
   STRIPE WEBHOOK
====================== */

export const stripeWebhook = async (req, res) => {
  try {
    const stripe = getStripe();

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata?.userId;

      console.log("PAYMENT SUCCESS:", userId);

      if (userId) {
        await User.findByIdAndUpdate(userId, {
          isPro: true,
        });
      }
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).send("Webhook error");
  }
};
