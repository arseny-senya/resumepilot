import express from "express";
import Resume from "../models/Resume.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* Получить все резюме пользователя */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user._id,
      isEdited: true,
    }).sort({
      updatedAt: -1,
    });

    res.json(resumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load resumes" });
  }
});

/* Создать новое резюме */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user._id,
      title: req.body.title || "Untitled Resume",
      template: req.body.template || "modern",
      data: req.body.data || {},
    });

    res.status(201).json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create resume" });
  }
});

/* Получить одно резюме */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load resume" });
  }
});

/* Обновить резюме */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      {
        title: req.body.title,
        template: req.body.template,
        data: req.body.data,
        isEdited: true,
      },
      { new: true },
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update resume" });
  }
});

/* Удалить резюме */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ message: "Resume deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete resume" });
  }
});

export default router;
