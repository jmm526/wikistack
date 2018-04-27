const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const wikiPage = require('../views/wikipage');
const { Page } = require("../models");
const main = require('../views/main');

router.get("/", async (req, res, next) => {
	try {
		const pages = await Page.findAll();
		console.log(pages);
		res.send(main(pages));
	} catch(e) { next(e); }
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

router.get("/:slug", async (req, res, next) => {
	try {
		const myslug = req.params.slug;
		let page = await Page.findOne({
			where: { slug: myslug }
		})
		res.send(wikiPage(page, 'TEMP AUTHOR'));
	} catch (e) { next(e); }
});

module.exports = router;
