
const express = require('express');

const app = express();

app.get("/", function(request, response) {
  response.send('<h1>Hello, world!</h1?>');
});

app.get("/contact", function(request, response) {
  response.send("Contact me at: jean@eill.com");
});

app.get("/about", function(request, response) {
  response.send("You have found Wyckliffe the God of optimization.");
});


app.listen(3000, function() {
  console.log('Server started on port 3000')
});
