import { Router } from "express";
import FixedStrings from "../models/fixedStringsModel";
import isAdmin from "../utils/isAdmin";

const fixedStringsRouter = Router();
fixedStringsRouter.get("/:title", async (req, res) => {
  const { title } = req.params;
  const fixedStrings = await FixedStrings.find({ title });
  res.send(fixedStrings);
});
fixedStringsRouter.patch("/:title",isAdmin, async (req, res) => {
  const { title } = req.params;
  const { text } = req.body;
  const fixedStrings = await FixedStrings.updateOne(
    { title },
    { fixedString: text }
  );
  res.send(fixedStrings);
});
export default fixedStringsRouter;
