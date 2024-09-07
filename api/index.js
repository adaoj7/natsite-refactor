﻿import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import siteCtrl from "./controllers/siteCtrl.js";
import authCtrl from "./controllers/authCtrl.js";

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

const { setupShifts, hostShifts, volunteer, userShifts, deleteShift } =
  siteCtrl;
const { login, user, updateUser, logout } = authCtrl;

// Endpoints created here. At the moment I don't have any so I don't need to set this up. I think I will build out the site pagination and then come back to this.

// Volunteer Form Endpoints
app.get("/api/setup", setupShifts);
app.get("/api/host", hostShifts);
app.get("/api/userShifts", userShifts);
app.post("/api/volunteer", volunteer);
app.delete("/api/deleteShift", deleteShift);

// Auth0 Endpoints
app.post("/api/login", login);
app.get("/api/user", user);
app.post("/api/updateUser", updateUser);
app.delete("/api/logout", logout);

ViteExpress.listen(app, PORT, () =>
  console.log(`what is the answer? http://localhost:${PORT}`)
);
