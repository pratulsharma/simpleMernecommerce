const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";
const jwt = require('jsonwebtoken');
const admin_auth = require("./auth_admin");
const user_auth = require("./auth_user");

// middleware to use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  import the user schema
const user = require("./models/user");
const books = require("./models/books");

// Setting up the port on the PC to get the client request
const PORT = 8000;

mongoose.connect(
  "mongodb://pratulsharma:Marit47112@ds141248.mlab.com:41248/psecommerce",
  {
    useNewUrlParser: true,
     useUnifiedTopology: true }
);

// Listen to the requests from the client
app.listen(PORT, () => {
  console.log("Listening from the client");
});

// Responding to clients send the message from the server when user lands on the home link
app.get("/", (req, res) => {
  res.send("Connected to the server");
  console.log("Connected to server")
});

// Register

app.post("/register", async (req, res) => {
  try {
    res.send("Signinaaaa");
    // console.log("test", req.body.name)
    // instansiate the model and tell what it consists
    // in the case below, it conststs components of req.body (name and password)
    // Later on we can update the components using
    // registeredUser.name = ...    or registeredUser.password = ....
    const registeredUser = new user(req.body);
    const emailFound = await user.findOne({ email: req.body.email });
    if (!emailFound) {
      console.log("New user successfully Registered!");
      const hashed = await bcrypt.hash(req.body.password, saltRounds);
      registeredUser.password = hashed;
      // console.log(registeredUser.password);
      await registeredUser.save();
    } else {
      console.log("User Already Registered! Please try again");
    }
  }
  catch(err){
    if (err) {
      console.log("Error in Registering", err);
    }
  }
})
// Sign in
// check if the email exists
// if no, ask to register
// if yes, compare the password --> send back the message about successfull sign in

app.post("/signin", async (req, res) => {
  
  try {
    const registeredUser = new user(req.body);
    const emailFound = await user.findOne({ email: req.body.email });
    console.log("email", emailFound.email)
    if (!emailFound) {
      console.log("User not found. Please Register first")
      res.send("User not found. Please Register first")
    }
    else {
      console.log("password", emailFound.password)
      const match = await bcrypt.compare(req.body.password, emailFound.password);
      if (!match) {
        console.log("Wrong password. Please try again.");
        res.send("Wrong password. Please try again")
      }
      else {
        // generate JWT and send it to the client
        console.log("You successfully logged in");
        const jwtuser = {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role}
        const token = jwt.sign(
         jwtuser
        , "sdkjgkja;ksgskjgf994382749874392439(*(*&(*&(*&(*&(*&(kjdfsdfkgsdfgsfs9987987987");
        console.log(token);
        res.json(token);
        console.log(req.body)
      }
   
    }
  }
  catch (err) {
    console.log("Error during signin", err)
  }
}
);
const names = {
  "name1": "ps",
  "name2": "ms"
};
app.get("/names", async (req, res) => {
   res.json(names)
   console.log("I am at /names" )
});

app.post("/test_admin", admin_auth, (req, res) => {
  console.log(req.user.role);
 res.send("done")
});
  
app.post("/test_user", user_auth, (req, res) => {
  console.log(req.user.role);
 res.send("done")
});

app.post("/add_product",  (req, res) => {
  const book = new books(req.body);
  book.save((err, result) => {
    if (err) {
      console.log(err);
      res.send("error in saving the product");
    } else {
      console.log("Product Saved")
      res.send("Product saved");
    }
  });

});

app.get("/find_product",  async (req, res) => {
  const bookFound = await books.find(req.body);
  console.log(bookFound);
  console.log(bookFound[0].title);
  console.log("I am at", names.name1)
 res.json(bookFound)
});



app.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  const book = new books(req.body);
  try {
    let found = await books.findById(req.params.id);
    if (!found) {
      res.send("Not Found");
      console.log("Not Found");
    } else {
      await books.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
          console.log("Error has occured in delete");
          res.send("Book not found")
        }
        else {
          console.log("Found and Deleted");
          res.send("Found and Deleted")
        }
      })
    }
  }
  catch (err) {
    console.log(err);
    res.send("Error")
  }
}
)

// Update product

app.post("/update/:id", async (req, res) => {
  try {
    let found = await books.findById(req.params.id);
    console.log("found", found)
    if (!found) {
      res.send("Not Found");
      console.log("Not Found");
    } else {
      found.pages = req.body.pages;
      found.writer = req.body.writer;
      found.description = req.body.description;
      await found.save((err, result) => {
        if (err) {
          console.log("Product Updated error ");
          res.send("Product Updated error")
        }
        else {
          console.log("result", result)
          console.log("Product Updated and saved");
          res.send("Product Updated and saved ")
        }
      })
    }
  }
  catch (err) {
    console.log(err);
    res.send("Error")
  }
}
)