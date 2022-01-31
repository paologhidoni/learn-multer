// express
const { request, response } = require("express");
const express = require("express");
const server = express();
const multer = require("multer");

const { getUsers, getAvatar, createUser } = require("./database/model.js");

// body parser 
const bodyParser = express.urlencoded({ extended: false });
server.use(bodyParser);

// static
const staticFiles = express.static("public");
server.use(staticFiles);

// cookie parser
const cookieParser = require("cookie-parser");
server.use(cookieParser(process.env.COOKIE_SECRET));


server.get("/", (req, res) => {
  getUsers().then((users) => {
    res.send(`
      <h1>Create new user</h1>
      <form enctype="multipart/form-data" method="post">
        <p>
          <label for="email">Email</label>
          <input type="email" id="email" name="email">
        </p>
        <p>
          <label for="name">Name</label>
          <input type="name" id="name" name="name">
        </p>
        <p>
          <label for="avatar">Profile picture</label>
          <input type="file" id="avatar" name="avatar">
        </p>
        <p><button>Sign up</button></p>
      </form>
      <ul>
        ${users.map(user => `
          <li>
            <h2>${user.name}</h2>
            ${user.avatar ? `<img src="/user/${user.id}/avatar" alt="" width="64" height="64">` : ""}
          </li>
        `).join("")}
     </ul>
    `)
  })
})



// const imageUpload = multer({
//   dest: 'images',
// });

// multer parses form bodies encoded with "multipart/form-data"
// this is necessary to allow file uploads
const imageUpload = multer();

server.post("/", imageUpload.single("avatar"), (req, res) => {
  const file = req.file; // to get the file
  const { email, name } = req.body; // we get email and name from the request body

  console.log(email, name, file.buffer);

  // file.buffer contains the actual raw file contents we want
  createUser(email, name, file.buffer);

  console.log("FILE", file);
  response.redirect("/");
});




// e.g. request from an img tag
// <img src="/user/3/avatar">
server.get("/user/:id/avatar", (req, res) => {
  getAvatar(req.params.id).then(user => { // avatar
    res.send(user.avatar); //avatar
  })
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});