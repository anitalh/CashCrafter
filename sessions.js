const uuid = require('uuid').v4;

// store active sessions
const sessions = {};

// add a new session
function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
};

// get the username associated with a session ID
function getSessionUser(sid) {
  return sessions[sid]?.username;
}

// delete a session
function deleteSession(sid) {
  delete sessions[sid];
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
};
