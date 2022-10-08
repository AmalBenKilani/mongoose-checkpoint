var express = require("express");
var mongoose = require("mongoose");
var app = express();
var Person = require('./Person')

//environment variables
require("dotenv").config();

//database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri).then(() => console.log("database connected")).catch(err => console.log(err))
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected Database Successfully");
});

app.listen(3000, function (req, res) {
  console.log("Server is started on port 3000");
});

//-----------Instructions-------------------


// record and save a record of the model Person
const person = new Person({
  name: "amal",
  age: 27,
  favouritFood: ["pizza", "hamburger", "sandwich"]
})

// person.save().then(() => console.log("person saved!").catch(err => console.log(err)))

//create many records

var arrayOfPeople = [{ name: "hamida", age: 28, favouritFood: ["apple", "banana"] }, { name: "joe", age: 30, favouritFood: ["watermelon", "burritos"] },
{ name: "jhon", age: 60, favouritFood: ["kiwi","ananas"] },{ name: "sam", age: 32, favouritFood: ["apple", "banana","burritos"] }]

var createManyPeople = function () {
  Person.create(arrayOfPeople)
}


//search in database

var searchInDB = function (personName) {
  Person.find({ name: personName }).then(doc => console.log(doc)).catch(err => console.error(err))
}


//search one person by his fav food

var searchFavFood = function (favFood) {
  Person.findOne({ favouritFood: [favFood] }).then(doc => console.log(doc)).catch(err => console.err(err))
}


//search person by id
var searchById = function(personId){
  Person.findById({ _id: "633dfba55cc45a922c2bf95d" }).then(doc => console.log(doc)).catch(err => console.err(err))
}

//Perform Classic Updates by Running Find, Edit, then Save

var findEditThenSave = function (personId) {
  var foodToAdd = 'hamburger';
  Person.findById(personId, function (err, data) {
    data.favouritFood.push(foodToAdd);
    data.save()
    if (err) {
      return console.error(err);
    }
    else {
      console.log(data);
    }
  });
};



//New Updates on a document using findandupdate

var findAndUpdate = function (personName) {
  Person.findOneAndUpdate({ name: personName }, { age: 29 }, { new: true })
    .then(doc => console.log(doc))
    .catch(err => console.error(err))

};
// findAndUpdate("hamida")

//Delete One Document

var deleteOneDocument = function (personId) {
  Person.findOneAndDelete({ _id: personId })
    .then(doc => console.log(doc))
    .catch(err => console.error(err))

}


//MongoDB and Mongoose - Delete Many Documents 
var removeName = function (personName) {
  Person.deleteMany({ name: personName })
    .then(doc => console.log('records with this given name are deleted'))
    .catch(err => console.error(err))

}


//Chain Search Query Helpers to Narrow Search Results
Person.find({ favouritFood: "burritos" })
      .sort({name:1})
  .limit(2)
  .select()
  .exec()
  .then(docs => {
    console.log(docs)
  })
  .catch(err => {
    console.error(err)
  })