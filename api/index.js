﻿import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import Stripe from "stripe";
import siteCtrl from "./controllers/siteCtrl.js";
import authCtrl from "./controllers/authCtrl.js";
import adminCtrl from "./controllers/adaminCtrl.js";
import dummyCtrl from "./controllers/dummyCtrl.js";
import process from "process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4242;
export const stripe = new Stripe(process.env.STRIPE_PRiVATE_TEST_KEY);

const isProduction = process.argv.includes("--serve-dist");

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
      maxAge: 1000 * 60 * 60 * 12,
    },
  })
);

const {
  setupShifts,
  hostShifts,
  selectedShifts,
  volunteer,
  userShifts,
  deleteShift,
  churches,
  links,
  updateFormLinks,
} = siteCtrl;
const { login, user, updateUser, logout } = authCtrl;
const {
  allShifts,
  getShiftsForAdmin,
  shiftAvailabilities,
  getAllChurchVolunteers,
} = adminCtrl;
const {
  dummyVolunteer,
  dummyUserShifts,
  dummyDeleteShift,
  dummyGetShiftsForAdmin,
} = dummyCtrl;
// Endpoints created here. At the moment I don't have any so I don't need to set this up. I think I will build out the site pagination and then come back to this.

// Volunteer Form Endpoints
app.get("/api/setup", setupShifts);
app.get("/api/host", hostShifts);
app.get("/api/selectedShifts", selectedShifts);
app.get("/api/churches", churches);
app.get("/api/links", links);
app.post("/api/updateFormLinks", updateFormLinks);
// Admin Endpoints
app.get("/api/adminQuery", allShifts);
app.get("/api/shiftAvailabilities", shiftAvailabilities);
app.get("/api/getAllChurchVolunteers", getAllChurchVolunteers);
// Auth0 Endpoints
app.post("/api/login", login);
app.get("/api/user", user);
app.post("/api/updateUser", updateUser);
app.delete("/api/logout", logout);

app.post("/api/volunteer", volunteer);
app.get("/api/userShifts", userShifts);
app.delete("/api/deleteShift", deleteShift);
app.post("/api/adminQuery", getShiftsForAdmin);

if (isProduction) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.post("/api/volunteer", volunteer);
  app.get("/api/userShifts", userShifts);
  app.delete("/api/deleteShift", deleteShift);
  app.post("/api/adminQuery", getShiftsForAdmin);

  app.listen(PORT, () =>
    console.log(
      `Production server running and the answer is http://localhost:${PORT}`
    )
  );
} else {
  app.use(express.static("public"));

  app.post("/api/volunteer", dummyVolunteer);
  app.get("/api/userShifts", dummyUserShifts);
  app.delete("/api/deleteShift", dummyDeleteShift);
  app.post("/api/adminQuery", dummyGetShiftsForAdmin);

  ViteExpress.listen(app, PORT, () =>
    console.log(
      `Development server running and the answer is http://localhost:${PORT}`
    )
  );
}
