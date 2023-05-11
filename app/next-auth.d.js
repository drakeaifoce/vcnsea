const User = {
  name: String,
  accessToken: String,
};

module.exports = function () {
  const session = {
    user: User,
  };

  return session;
};
