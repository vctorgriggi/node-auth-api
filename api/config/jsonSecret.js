let { JWTSECRET } = process.env;

var jsonSecret = {
  secret: JWTSECRET || "outerwilds",
};

module.exports = jsonSecret;
