const express = require('express');
const router = express.Router();
const Contacts = require("../models/contacts");
const Relation = require("../models/relations")


router.get('/', async(req, res, next) => {
    let contacts = await Contacts.find().sort([["name","descending"]]);
    res.render('contacts/index', { title: 'Contacts' , dataset: contacts});
});


router.get('/add', async(req, res, next) => {
    let relationList = await Relation.find().sort([["relation", "ascending"]]);
    res.render('contacts/add', { title: 'Add a new Contact' , relations: relationList});
});

router.post("/add", async(req, res, next) =>{
let newContact = new Contacts({
    name : req.body.name,
    contact : req.body.contact,
    relation: req.body.relation,
    email: req.body.email
})
await newContact.save();
res.redirect("/contacts");
});

router.get("/delete/:_id", async(req, res, next) =>{
    let contactId = req.params._id;
    await Contacts.findOneAndDelete({_id: contactId});
    res.redirect("/contacts");
});

router.get("/edit/:_id", async(req, res, next) =>{
    let contactId = req.params._id;
    let contactsData = await Contacts.findOne({_id: contactId });
    let relationsList = await Relation.find().sort([["relation", "ascending"]]);
    res.render('contacts/edit',{
        title: "Edit Contact Information",
        contacts: contactsData,
        relations: relationsList
    });
});

router.post("/edit:_id", async(req, res, next)=>{
    let contactId = req.params._id;
    await Contacts.findOneAndUpdate(
        {_id: contactId},
        {
            name: req.body.name,
            contact: req.body.contact,
            relation: req.body.relation,
            email: req.body.email
        }
    )
});

module.exports = router;
