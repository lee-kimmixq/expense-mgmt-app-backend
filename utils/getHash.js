const JSSHA = require("jssha");

const getHash = (input) => {
  const shaObj = new JSSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  shaObj.update(`${input}-${process.env.PW_SALT}`);
  return shaObj.getHash("HEX");
};

module.exports = getHash;
