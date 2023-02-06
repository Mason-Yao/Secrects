//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const _db = require("./Database");
const {updatePostById} = require("./Database");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function () {
    console.log("Server started on port 3000");
});


renderGet("/posts", "home", homeStartingContent);

renderGet("/about", "about", aboutContent);

renderGet("/contact", "contact", contactContent);

renderGet("/compose", "compose");

renderGet("/update")

getSinglePost();

postSinglePost();

updateSinglePost();

editSinglePost();

function getSinglePost() {
    app.get("/posts/:postId", async function (req, res) {
        const idGot = req.params.postId;
        const postData = await _db.getPostById(idGot);
        res.render("post", {
            postId: postData._id,
            postTitle: postData.title,
            postContent: postData.content
        })
    })
}

function editSinglePost() {
    app.get("/posts/:postId/update", async function (req, res) {
        const idGot = req.params.postId;
        const postData = await _db.getPostById(idGot);
        res.render("update", {
            postId: postData._id,
            postTitle: postData.title,
            postContent: postData.content
        })
    })
}

function updateSinglePost() {
    app.post("/posts/:postId", async function (req, res) {
        const revisedPost = {
            title: req.body.postTitle,
            content: req.body.postContent
        }
        const idGot = req.params.postId;
        await _db.updatePostById(idGot, revisedPost);
        res.render("post", {
            postId: idGot,
            postTitle: revisedPost.title,
            postContent: revisedPost.content})
    })
}

function postSinglePost() {
    app.post("/posts", async function (req, res) {
        const post = {
            title: req.body.postTitle,
            content: req.body.postContent
        }
        await _db.addPost(post);
        res.redirect("/posts");
    })
}



function renderGet(path, view, content) {
    app.get(path, async function (req, res) {
        // posts structure is {_id:, title:, content:}
        const posts = await _db.getAllPosts();
        res.render(view, {content: content, posts: posts});
    })
}


