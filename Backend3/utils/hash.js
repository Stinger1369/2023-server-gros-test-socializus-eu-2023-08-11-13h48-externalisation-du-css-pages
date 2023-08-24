import bcrypt from "bcrypt";

/**
 * @description a function to generate a hash
 * @params {String} password
 * @returns a hashed password
 */
const generateHash = async (password) => { 
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * @description a function to validate a password
 * @params {String} the password to verify
 * @params {String} the hash to compare with the password
 * @returns {Boolean} true or false if the password match the hash
 */
const validateHash = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  generateHash, 
  validateHash
}