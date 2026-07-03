import Stripe from "stripe";

let stripeInstance = null;

/* ======================
   GET STRIPE INSTANCE
====================== */

export function getStripe() {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is missing");
    }

    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return stripeInstance;
}

/* ======================
   CREATE CHECKOUT SESSION
====================== */

export const createCheckoutSession = async (user) => {
  const stripe = getStripe();

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
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],

    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",

    metadata: {
      userId: user.id,
    },
  });

  return session;
};
