import express from "express";

const router = express.Router();
router.get("/error", (req, res, next) => {
  // here we cause an error in the pipeline so we see express-winston in action.
  return next(
    new Error("This is an error and it should be logged to the console")
  );
});

router.get("/", (req, res) => {
  res.write("This is a normal request, it should be logged to the console too");
  res.end();
});

export default router;
