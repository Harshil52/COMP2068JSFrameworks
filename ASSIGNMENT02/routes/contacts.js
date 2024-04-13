const express = require("express");
const router = express.Router();
const Contacts = require("../models/contacts");
const Relation = require("../models/relations");
const authorization = require("../extensions/authorization");

router.get("/", async (req, res, next) => {
  let contacts = await Contacts.find().sort([["name", "descending"]]);
  res.render("contacts/index", {
    title: "Contacts",
    dataset: contacts,
    user: req.user,
  });
});

router.get("/add", authorization, async (req, res, next) => {
  let relationList = await Relation.find().sort([["relation", "ascending"]]);
  res.render("contacts/add", {
    title: "Add a new Contact",
    relations: relationList,
    user: req.user,
  });
});

router.post("/add", authorization, async (req, res, next) => {
  let newContact = new Contacts({
    name: req.body.name,
    contact: req.body.contact,
    relation: req.body.relation,
    email: req.body.email,
  });
  await newContact.save();
  res.redirect("/contacts");
});

router.get("/delete/:_id", authorization, async (req, res, next) => {
  let contactId = req.params._id;
  await Contacts.findOneAndDelete({ _id: contactId });
  res.redirect("/contacts");
});

router.get("/edit/:_id", authorization, async (req, res, next) => {
try{
  let contactId = req.params._id;
  let contactsData = await Contacts.findById(contactId);

  if(!contactsData){
    res.status(404).render("error", {message: "Contact Not Found"});
    return;
  }

  let relationsList = await Relation.find().sort([["relation", "ascending"]]);
  res.render("contacts/edit", {
    title: "Edit Contact Information",
    contacts: contactsData,
    relations: relationsList,
    user: req.user,
  });
}
catch(error){
    next(error);
}
});

router.post("/edit:_id",authorization, async (req, res, next) => {
  let contactId = req.params._id;
  await Contacts.findByIdAndUpdate(contactId,
    {
      name: req.body.name,
      contact: req.body.contact,
      relation: req.body.relation,
      email: req.body.email,
    }
  );
  res.redirect("/contacts");
});

module.exports = router;
