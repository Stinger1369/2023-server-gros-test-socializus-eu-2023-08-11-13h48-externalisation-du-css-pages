// TODO: verify if this library exports sign et verify methods
import jwt from "express-jwt";

/**
 * @description a function to generate an auth token
 * @params {String} the user email
 * @params {String} the generated code
 * @returns {String} a generated auth token 
 */
const generateAuthToken = (email, code) => {
  const token = jwt.sign({ email: email, code: code }, process.env.SECRET_JWT, {
    expiresIn: "5d"
  })
  
  return token;
};

// const getToken = (req: Request) => req.header("X-Auth-Token");

/**
 * @description a function to verify user auth token
 * @params {String} the token to verify
 * @returns 
 */
const verifyAuthToken = (token) => {
  return jwt.verify(token, process.env.SECRET_JWT);
};