const express = require("express");
const router = express.Router();
const Relation = require("../models/relations");

// GET method for splash relation page displaying all realtions
router.get("/", async (req, res, next) => {
  let relations = await Relation.find().sort([["relation", "ascending"]]);
  res.render("relations/index", {
    title: "Contact Relation",
    dataset: relations,
    user: req.user,
  });
});

// GET method to add new relation
router.get("/add", (req, res, next) => {
  res.render("relations/add", {
    title: "Add a new contact relation",
    user: req.user,
  });
});

// POST method to add a new relation 
router.post("/add", async (req, res, next) => {
  let newRelation = new Relation({
    relation: req.body.relation,
  });
  await newRelation.save();
  res.redirect("/relations");
});

// exporting route
module.exports = router;
