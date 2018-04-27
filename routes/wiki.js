const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  res.send("GET wiki");
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const page = new Page({
    title: req.body.title,
    content: req.body.pagecontent
  });
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (e) {
    next(e);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", (req, res, next) => {
  res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
