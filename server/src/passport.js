const User = require("./models/user/user.mongo");
const passport = require("passport");
const OutlookStrategy = require("passport-outlook").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const axios = require("axios").default;
// const { Client } = require("@microsoft/microsoft-graph-client");
// const {
//   TokenCredentialAuthenticationProvider,
// } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
// const { DeviceCodeCredential } = require("@azure/identity");

var OUTLOOK_CLIENT_ID = "8e27b95a-8a07-474c-ad82-a4440d2fafbe";
var OUTLOOK_CLIENT_SECRET = "9jb8Q~Cq6CTjiIcNbmnEJf4.epqixr91rR2Tka93";
var scope = "https%3A%2F%2Fgraph.microsoft.com%2F.default";
var tenant_id = "6d28e4fb-9074-4a0b-a5b8-9a89f632cc60";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new OutlookStrategy(
    {
      clientID: OUTLOOK_CLIENT_ID,
      clientSecret: OUTLOOK_CLIENT_SECRET,
      callbackURL:
        "https://ait-hiring-k4n3ywgp7-priyank003.vercel.app/auth/outlook/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...

      // To keep the example simple, the user's Outlook profile is returned
      // to represent the logged-in user.  In a typical application, you would
      // want to associate the Outlook account with a user record in your
      // database, and return that user instead.

      let role;
      if (
        String(profile.displayName).split(" ")[0] === "Alumni" ||
        profile.emails[0].value === "priyankpatil_20195@aitpune.edu.in" ||
        profile.emails[0].value === "manvainder_20164@aitpune.edu.in"
      ) {
        role = "admin";
      } else {
        role = "student";
      }

      const token = jwt.sign(
        {
          id: profile.id,
          name: profile.displayName,
          outlookId: profile.id,
          email: profile.emails[0].value,
          role: role,
        },
        process.env.JWTSecretKey,
        { expiresIn: "14d" }
      );

      var user = {
        outlookId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        token,
        role,
      };

      if (profile.Alias) user.alias = profile.Alias;

      let error;
      try {
        await User.findOneAndUpdate(
          {
            outlookId: user.outlookId,
          },
          user,
          {
            upsert: true,
          }
        );
      } catch (err) {
        error = err;
      }

      return done(error, user);
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: "secretKey",
    },
    async (jwtPayload, done) => {
      try {
        // Extract userem>
        const user = jwtPayload.user;
        console.log("passport user", user);
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

var graphAccessUrl =
  "https://login.microsoftonline.com/" + tenant_id + "/oauth2/v2.0/token";
var graphTokenBody =
  "client_id=" +
  OUTLOOK_CLIENT_ID +
  "&scope=" +
  scope +
  "&client_secret=" +
  OUTLOOK_CLIENT_SECRET +
  "&grant_type=client_credentials";

var contentType = "application/x-www-form-urlencoded; charset=utf-8";
var graphTokenError = "Failed to get graph token";
var graphToken = "";

//Call the get token method
getToken(graphAccessUrl, contentType, graphTokenBody, graphTokenError);
//This method is using to get the token from the graph token url and body
async function getToken(url, type, content, errorMessage, callback) {
  var options = {
    headers: {
      "Content-Type": type,
    },
    body: content,
  };

  //Posting access parameters to the server
  var tokenResponse = await axios.get(url, options);

  if (tokenResponse.statusCode === 200) {
    error = errorMessage;
    if (errorMessage === graphTokenError) {
      var token = JSON.parse(tokenResponse.body.toString("utf-8"));
      graphToken = token.access_token;
    }
    if (callback) {
      return callback();
    }
  } else {
    console.log(errorMessage);
  }
}
