const users = {};

// validate a username
function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

// get user data by username
function getUserData(username) {
  return users[username];
}

// add user data
function addUserData(username, userData) {
  users[username] = userData;
}

module.exports = {
  isValid,
  getUserData,
  addUserData,
};