

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
useUnifiedTopology: true,
useNewUrlParser: true});

const fruitsSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: [true, "No name specified."]
  },
  rating:{
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const apple = new Fruit ({
  name: "Apple",
  rating: 7,
  revivew: "Pretty Solid as a fruit"
});

//fruit.save();

const peopleSchema = new mongoose.Schema( {
  name: String,
  age: Number,
  favoriteFruit: fruitsSchema
});

const People = mongoose.model("People", peopleSchema);

const pinapple = new Fruit ({
  name: "Pineaplle",
  rating: 9,
  review: "Fair greatness."
});

const mango = new Fruit({
  name: "Mango",
  rating: 10,
  review: "My gf loves this."
});

//mango.save();

//pinapple.save();

const person = new People ({
  name: 'Amy',
  age: 12,
  favoriteFruit: pinapple
});

//person.save();

const kiwi = new Fruit ({
  name: "kiwi",
  rating: 10,
  review: "The best fruit",
});

const orange = new Fruit ({
  name: "orange",
  rating: 4,
  review: "Too sour",
});

const banana = new Fruit ({
  name: "banana",
  rating: 3,
  review: "Weird texture",
});

// Fruit.insertMany([apple, kiwi, orange, banana], function(err){
//   if (err){
//     console.log(err);
//   }else {
//     console.log("successfully logged all the fruits to db!")
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name)
    });
  }

});

People.updateOne({_id: "5e72a99d9d6d702fe0b2bfbd"}, {favoriteFruit: mango}, function(err){
  if (err) {
    console.log(err);
  }else {
    console.log("successfully updated")
  }
});


// Fruit.deleteOne({name: "Peach"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("successfully delete.")
//   }
// });

// People.deleteMany({name: "John"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("successfully deleted all the document.")
//   }
// });
