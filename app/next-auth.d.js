const User = {
  name: String,
  role: String,
  userName: String,
  accessToken: String,
};

module.exports = function () {
  const session = {
    user: User,
  };

  return session;
};
