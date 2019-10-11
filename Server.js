const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//login route
app.post("/login", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  if (user.username === "root" && user.password === "toor") {
    console.log("valid creds");

    const SESSION_ID = uuidv1(); //generate session id
    const CSRF_TOKEN = uuidv4(); //generate csrf token

    console.log("Session id and Token : ", SESSION_ID, CSRF_TOKEN);

    //set cookies
    res.cookie("sessionCookie", SESSION_ID, {
      maxAge: 172800000, // 2 days
      httpOnly: false,
      path: "/",
      secure: false,
      sameSite: true
    });
    res.cookie("csrfTokenCookie", CSRF_TOKEN, {
      maxAge: 172800000,
      httpOnly: false,
      path: "/",
      secure: false,
      sameSite: true
    });

    console.log("cookie : ", req.cookies);
    res.sendStatus(200);
  } else {
    console.log("invalid creds");
    res.send("Invalid Credentials");
    res.status(403);
  }
});

//check if token is valid
function validToken(req, res, next) {
  const inputToken = req.body.csrfToken;
  const cookieToken = req.cookies["csrfTokenCookie"];
  if (inputToken === cookieToken) {
    console.log("CSRF Token matched");
    return next();
  } else {
    res.send("Invalid CSRF Token");
    res.status(403);
  }
}

//message route
app.post("/message", validToken, (req, res) => {
  user = {
    message: req.body.message
  };
  if (user.message) {
    res.status(200);
    res.send("Message Recieved with Valid CSRF Token");
  }
});

//logout route
app.post("/logout", (req, res) => {
  res.send("logout");
  res.status(200);
});

app.listen(4000, () => {
  console.log("Sever is listning");
});
