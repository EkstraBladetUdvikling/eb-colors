module.exports = function(ctx) {
  return {
    plugins: [require("postcss-rgb-plz")()]
  };
};
