const express = require("express");
const path = require("path");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user/user.mongo");
const session = require("express-session");
const passportSetup = require("./passport");

// const corsOptions = {
//   origin: "http://localhost:3000",

//   // credentials: true, //access-control-allow-credentials:true
//   // optionSuccessStatus: 200,
// };
// cors({
//   origin: "http://localhost:3000",
// })
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type,Accept,Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET",
//     "POST",
//     "PATCH",
//     "DELETE"
//   );
//   next();
// });
//security related middlewares
// app.use(helmet());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "build")));

app.use(session({ secret: "notagoodsecret" }));

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate())); //authenticate method comes from plugin passport local mongoose

//how to  store and unstore user data in this session
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//routes
const userRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");

app.use("/api/auth", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

app.get("/fakeUser", async (req, res) => {
  const user = new User({
    email: "priyankcrjr7@gmail.com",
    username: "priyank003",
  });
  const newUser = await User.register(user, "chicken");
  res.send(newUser);
});

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

module.exports = app;
