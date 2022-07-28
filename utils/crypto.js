const crypto = require("crypto");
var CryptoJS = require("crypto-js");

const HmacSHAEncryptURL = (usrname, pwd, url) => {
  let secret = `${JSON.stringify({ Username: usrname, Password: pwd })}`;
  let hmacRes = crypto.createHmac("sha512", secret).update(url).digest("hex");
  return hmacRes;
};

const Encrypt = async (encryptString) => {
  // let o = `${JSON.stringify({ Username: usrname, Password: pwd })}`;
  let o = encryptString;
  let encryptdata;
  const key = CryptoJS.enc.Utf8.parse("1234567890000000");
  const iv = CryptoJS.enc.Utf8.parse("1234567890000000");
  if (typeof o === "string") {
    if (o) {
      var srcs = CryptoJS.enc.Utf8.parse(o);
      encryptdata = CryptoJS.AES.encrypt(srcs, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();
    }
  } else if (typeof o === "object") {
    for (var _o in o) {
      if (o[_o]) {
        var srcs = CryptoJS.enc.Utf8.parse(o[_o]);
        o[_o] = CryptoJS.AES.encrypt(srcs, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }).toString();
      }
    }
  }
  return encryptdata;
};

module.exports = { Encrypt };
