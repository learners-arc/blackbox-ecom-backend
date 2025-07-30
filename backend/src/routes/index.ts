import { Router, IRouter } from "express";

const router: IRouter = Router();

// Health Check Route
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timeStamp: new Date().toISOString(),
  });
});

export default router;
