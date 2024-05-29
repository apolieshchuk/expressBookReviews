const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  const booksResponse = await books;
  return res.send(JSON.stringify(booksResponse,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const booksResponse = await books;
  return res.send(booksResponse[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  const booksResponse = await books;
  return res.send(
    Object.keys(booksResponse).filter((isbn) => {
      return booksResponse[isbn].author === req.params.author
    }).map((isbn) => {
      return booksResponse[isbn]
    })
  )
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  const booksResponse = await books;
  return res.send(
      Object.keys(booksResponse).filter((isbn) => {
        return booksResponse[isbn].title === req.params.title
      }).map((isbn) => {
        return booksResponse[isbn]
      })
  )
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn].reviews)
});

module.exports.general = public_users;
