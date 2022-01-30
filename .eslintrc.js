module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    modules: true,
  },
  plugins: ["vue", "html", "prettier"],
  rules: {
    "prettier/prettier": "error",
    modules: 1,
  },
};
