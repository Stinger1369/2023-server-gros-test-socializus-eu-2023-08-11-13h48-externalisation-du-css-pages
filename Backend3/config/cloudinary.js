
const convertToBase64 = (file) => {  //🇫🇷 convertir un fichier en base64 //🇬🇧 convert file to base64
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};
module.exports = { cloudinary, convertToBase64 };
