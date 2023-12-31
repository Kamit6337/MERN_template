import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import { cookieSessionOptions } from "../utils/cookieSessionOptions.js";
import { corsOptions } from "../utils/corsOptions.js";

const globalMiddlewares = () => {
  const app = express();

  app.use(cors(corsOptions));

  // Serve static files from the public folder
  //   app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static("public"));

  // Middleware to create a time session of cookie (login, jwt)
  // app.use(session(expressSessionOptions));
  app.use(cookieSession(cookieSessionOptions));

  // Middleware to parse cookies
  app.use(cookieParser());

  // Middleware to parse incoming body
  app.use(bodyParser.json());

  app.use(passport.initialize());
  app.use(passport.session());

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Middleware to parse URL-encoded request bodies (optional)
  app.use(express.urlencoded({ extended: true }));

  return (req, res, next) => {
    // This function will be used as middleware when you call app.use(globalMiddlewares)
    // You can perform additional actions if needed
    next();
  };
};

export default globalMiddlewares;
