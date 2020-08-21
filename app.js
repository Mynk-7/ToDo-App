const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["HTML", "CSS", "JavaScript"];
var workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    var day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {
    var item = req.body.newItem;

    items.push(item);

    res.redirect("/");
});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function() {
    console.log("Server started on PORT 3000.");
});