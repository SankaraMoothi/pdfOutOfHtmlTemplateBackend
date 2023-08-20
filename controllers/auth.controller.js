import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import Randomstring from "randomstring";
import nodemailer from "nodemailer";

import timer from "./timer.js";
import Users from "../modules/UsersTable.js";

/*
In Register We Actually Creating an New User With RoleId Accounding To the 
jobRole the hashing the password with bcrypt with resionable amount of salt,
there is no need for check the existing user because we already given as uniqe email 
& usname,if all condition are statisfy then we create an new user else return error
*/

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);

    let roleId;
    if (req.body.jobRole == "hr") {
      roleId = 1;
    }
    if (req.body.jobRole == "admin") {
      roleId = 2;
    }
    if (req.body.jobRole == "employee") {
      roleId = 3;
    }

    const newUser = await Users.create({
      ...req.body,
      roleId,
      password: hash,
    });

    res
      .status(200)
      .json({ message: "User has Been Created...", user: newUser });
  } catch (err) {
    res.status(401).send({ message: "Failed to Create User!", Error: err });
  }
};

/*
here we try to login to an user with username and password on the process,
first we searching that user are in our db then we compairing the password 
with bcrypt.compareSync if the password not match we send and error else
we creating an token and send as response with some details
*/

export const login = async (req, res, next) => {
  const { userName } = req.body;
  try {
    const user = await Users.findOne({ where: { userName } });
    if (!user) return next(createError(404, "User not found!"));

    if (!req.body.password) {
      const { otp } = req.body;

      let currentDate = new Date();
      let lastUpdate = user.updatedAt;
      let diff = timer(lastUpdate, currentDate);

      if (diff >= 300) {
        return res.status(400).send("token expired");
      }
      if (otp != user.otp) {
        return next(createError(400, "Wrong password or username!"));
      }
    } else {
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isCorrect) {
        return next(createError(400, "Wrong password or username!"));
      }
    }

    const token = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        roleId: user.roleId,
      },
      process.env.SECRET_KEY
    );

    res
      .status(200)
      .send({ userName: user.userName, roleId: user.roleId, token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.status(200).send("User has been logged out.");
};

export const generateOTP = async (req, res) => {
  let { userName } = req.body;
  try {
    const user = await Users.findOne({ where: { userName } });
    async function generateRandomSixDigitNumber() {
      const min = 100000;
      const max = 999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomNumber = await generateRandomSixDigitNumber();
    async function main() {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",

        secure: false,
        auth: {
          user: "diviyamuguthu@gmail.com",
          pass: process.env.PASSWORD,
        },
      });
      let mailOptions = await transporter.sendMail({
        from: `"mass"<diviyamuguthu@gmail.com>`,
        to: user.email,
        subject: "one time Password - Company",
        html: `<h4>Hello,</h4><p>We've Received a Request To one time Password For The Staff Account.
                 <h1>Take The one time Password</h1>
                 <h2
                 style="
                   background: #00466a;
                   margin: 0 0;
                   width: max-content;
                   padding: 0 10px;
                   color: #aaa;
                   border-radius: 4px;
                 "
               >
               ${randomNumber}
               </h2>
                 </p>`,
      });
    }
    main();

    const otp = await user.update({ otp: randomNumber });
    res.status(200).send("otp generated");
  } catch (error) {
    res.status(400).send("something went worng");
  }
};

//Forgot Password Linking

/* while user forgot the password we creating link and send there mail for that
we first getting mail id and check for userExist and then we send mail with the 
help of nodemailer and also storing the pass_token for later comparing purpose
if user not exist then send error*/

export const forgotpassword = async (req, res) => {
  try {
    let randomString = Randomstring.generate();
    const { userName } = req.body;

    const isUserExist = await Users.findOne({ where: { userName } });

    if (!isUserExist) {
      res.status(401).send({ error: "Invalid Credentails" });
    } else {
      async function main() {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",

          secure: false,
          auth: {
            user: "diviyamuguthu@gmail.com",
            pass: process.env.PASSWORD,
          },
        });
        let mailOptions = await transporter.sendMail({
          from: `"mass"<diviyamuguthu@gmail.com>`,
          to: isUserExist.email,
          subject: "Reset Password - Company",
          html: `<h4>Hello,</h4><p>We've Received a Request To Reset The Password For The Staff Account.You Can Reset The Password By using Below Passtoken.
          <a href=${process.env.FRONTEND_URL}/resetpassword/${randomString}>Click To Reset Your Password</a></p>
                    </p>`,
        });
      }
      main();

      const isPassToken = await isUserExist.update({ passToken: randomString });

      res.status(200).send({ msg: "email sended successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: "internet error" });
  }
};

/* resetpassword process here when the user has an link through the mail 
its also has time limit we getting pass_token newpassword and conformpassword 
from front end and some process like search for particular user with pass_token 
then comaper the new and conform password and resetpassword completed if any
error send it*/

export const resetpassword = async (req, res) => {
  try {
    const passToken = req.body.pass_token;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const isuserpasstokenexist = await Users.findOne({ where: passToken });

    let currentDate = new Date();
    let lastUpdate = isuserpasstokenexist.updatedAt;
    let diff = timer(lastUpdate, currentDate);

    if (!isuserpasstokenexist) {
      res.status(401).send({ error: "invalid credentials" });
    } else {
      if (diff >= 300) {
        res.status(401).send({ error: "Time out" });
      } else {
        if (password === confirmpassword) {
          const hashpass = bcrypt.hashSync(password, 10);

          const ispasstoken = await isuserpasstokenexist.update({
            password: hashpass,
          });

          res.status(200).send({ msg: "password set successfully" });
        } else {
          res.status(401).send({ error: "confirmed password not match" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ error: "interval error" });
  }
};
