import { User, Church } from "../dbscripts/model.js";
import bcrypt from "bcryptjs";

export default {
  // Do I want to use Auth0 so that users can reset passwords if needed?
  // I need a way for users to reset their passwords if they forget them and also authentication is handled really well by Auth0 already so I think that it would be a good idea to use it.
  login: async (req, res) => {
    try {
      const { name, email } = req.body;
      let user = await User.findOne({ where: { email: email } });
      console.log("user", user);
      if (!user) {
        user = await User.create({
          email: email,
          name: name,
        });
      }
      if (!user.phone) {
        user.phone = "";
      }
      let church = {
        churchName: null,
      };
      if (!user.churchId) {
        user.churchId = null;
      } else if (user.churchId) {
        church = await Church.findOne({
          where: { churchId: user.churchId },
        });
      }

      req.session.user = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        churchId: user.churchId,
        churchName: church.churchName,
      };
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  user: async (req, res) => {
    try {
      if (req.session.user) {
        return res.status(200).json(req.session.user);
      } else {
        return res.status(401).json("No user found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { userId } = req.session.user;
      console.log(req.body);
      const { name, phone, churchId } = req.body;
      console.log("body", req.body);
      const user = await User.findOne({ where: { userId: userId } });
      console.log("user", user);
      user.set({
        name: name || "",
        phone: phone || "",
        churchId: churchId ? Number(churchId) : null,
      });
      user.changed(true);
      console.log(user.changed());
      const savedUser = await user.save();
      console.log("savedUser", savedUser);
      let church = {
        churchName: null,
      };
      if (churchId) {
        church = await Church.findOne({ where: { churchId: churchId } });
      }

      req.session.user = {
        userId: user.userId,
        email: user.email,
        name: user.name,
        phone: user.phone,
        churchId: user.churchId,
        churchName: church.churchName,
      };
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.status(200).json("Logged out");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
