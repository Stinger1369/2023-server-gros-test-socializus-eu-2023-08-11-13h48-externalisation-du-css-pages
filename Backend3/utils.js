// Dependencies
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { user: User, role: Role } = require("./models");

/**
 * Routine for sending emails
 * @param
 * @returns
 */
const sendMail = async ({ from, to, subject, text, html }) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.OAUTH2_CLIENT_ID,
      process.env.OAUTH2_CLIENT_SECRET,
      process.env.OAUTH2_REDIRECT_URI
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
    });
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "no-reply@socializus.net",
        clientId: process.env.OAUTH2_CLIENT_ID,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET,
        refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const options = {
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const result = await transport.sendMail(options);
    return result;
  } catch (err) {
    return err;
  }
};

const verifyAuthorizationToken = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization);
    if (!req.headers.authorization) {
      res.status(400).json({ error: "Authorization header missing" });
      return;
    }

    // first : fetch role collections
    // 2nd : fetch user with id inside the token if exist
    // 3rd : check if user role array contain id role for admin

    const token = req.headers.authorization.replace("Bearer ", "");

    const user = await User.findOne({ token: token });
    // console.log(user);
    //const { role } = user;
    //const { name: roleName } = await Role.findById(role[0]);

    // console.log(roles);
    // const userRoles = [];

    // for (let el in roles) {
    //   if (user?.role.includes(roles[el]?.id) && roles[el]?.name == "admin") {
    //     userRoles.push(roles[el]);
    //     break;
    //   } else userRoles.push(roles[el]);
    // }
    //req.role = roleName;
    //req.user = user;

    next();
  } catch (err) {
    console.log(err?.message);
    res.status(401).json({ error: "You are not allowed" });
    return;
  }
};

const generateCode = () => {
  const firstCharSet = "123456789";
  let code = "";
  code += firstCharSet[Math.floor(Math.random() * 9)];
  for (let i = 0; i < 5; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
};

module.exports = {
  sendMail,
  verifyAuthorizationToken,
  generateCode,
};
