const express = require("express");
const router = express.Router();
const Relation = require("../models/relations");

router.get("/", async(req, res, next) => {
    let relations = await Relation.find().sort([["relation", "ascending"]]);
    res.render("relations/index", {title: "Contact Relation", dataset: relations});
});

router.get("/add", (req, res, next) => {
    res.render("relations/add", {title: "Add a new contact relation"});
});

router.post("/add", async (req, res, next) => {
    let newRelation = new Relation({
        relation: req.body.relation
    });
    await newRelation.save();
    res.redirect("/relations");
});

module.exports = router;