import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hellow back-end world get" });
});
router.post("/", (req, res) => {
  res.json({ message: "Hellow back-end world post" });
});
router.put("/", (req, res) => {
  res.json({ message: "Hellow back-end world pull" });
});
router.delete("/", (req, res) => {
  res.json({ message: "Hellow back-end world delete" });
});

export default router;
