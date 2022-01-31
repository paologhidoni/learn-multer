const db = require("./connection.js");


function getUsers() {
  const GET_USERS = `SELECT id, email, name, avatar FROM users`;
  return db.query(GET_USERS).then((result) => {
    // console.log(result.rows);
    return result.rows; // array of users
  });
}

function getAvatar(id) {
  return db.query("SELECT avatar FROM users WHERE id=$1", [id]).then((result) => {
    return result.rows[0];
  })
}

function createUser(email, name, avatar) {
  const CREATE_USER = `INSERT INTO users (email, name, avatar) VALUES ($1, $2, $3)`;
  return db.query(CREATE_USER, [email, name, avatar]).then((result) => {
    // console.log('RESULT!!', result.rows[0].avatar);
    return result.rows[0];
  })
}

module.exports = { getUsers, getAvatar, createUser };