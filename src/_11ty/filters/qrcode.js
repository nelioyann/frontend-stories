const qrCode = require("qrcode");
module.exports = async function (value, callback) {
  var opts = {
    color: {
      dark: "#212121",
      light: "#FAFAFA",
    },
  };
  // let result = await qrCode.toString(value, { type: "svg", margin: 4 });
  let result = await qrCode.toDataURL(value, opts);
  callback(null, result);
};
