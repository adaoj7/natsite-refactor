﻿import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";

const app = express();
const PORT = 4242;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "what am I hiding?",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);

// Endpoints created here. At the moment I don't have any so I don't need to set this up. I think I will build out the site pagination and then come back to this.

ViteExpress.listen(app, PORT, () =>
  console.log(`what is the answer? http://localhost:${PORT}`)
);
