const User = {
  id: Number,
  name: String,
  Role: String,
  accessToken: String,
};

module.exports = function () {
  const session = {
    user: User,
  };

  return session;
};
