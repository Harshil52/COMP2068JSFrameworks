const express = require("express");
const router = express.Router();
const Contacts = require("../models/contacts");
const Relation = require("../models/relations");
const authorization = require("../extensions/authorization");

// router which gets all the contacts at a single fetch
router.get("/", async (req, res, next) => {
  // finding the contacts and sorting the list in descending order                                                                                                                                                                                     
  let contacts = await Contacts.find().sort([["name", "descending"]]);
  // rendering the index page from contacts
  res.render("contacts/index", {
    title: "Contacts",
    dataset: contacts,
    user: req.user,
  });
});

// router to add a new contact
router.get("/add", authorization, async (req, res, next) => {
  // fetching all relations into a list in ascending order
  let relationList = await Relation.find().sort([["relation", "ascending"]]);
  // Rendering the add contact page
  res.render("contacts/add", {
    title: "Add a new Contact",
    relations: relationList,
    user: req.user,
  });
});

// POST method to add a new contact
router.post("/add", authorization, async (req, res, next) => {
  // creating a new contact by receiving the values
  let newContact = new Contacts({
    name: req.body.name,
    contact: req.body.contact,
    relation: req.body.relation,
    email: req.body.email,
  });
  await newContact.save();
  res.redirect("/contacts");
});

// Router to implement the delete functionality after authorization
router.get("/delete/:_id", authorization, async (req, res, next) => {
  // selecting the contact through its Id
  let contactId = req.params._id;
  // finding the contact using Id and delete it
  await Contacts.findOneAndDelete({ _id: contactId });
  res.redirect("/contacts");
});

// Router for Implementing edit functionality after authorization 
// adding try catch to check the error else not loading
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

// POST method for edit contacts
router.post("/edit/:_id",authorization, async (req, res, next) => {
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

// exporting the route
module.exports = router;
