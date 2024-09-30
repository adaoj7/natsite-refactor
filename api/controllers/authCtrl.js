import { User, Church } from "../dbscripts/model.js";
import bcrypt from "bcryptjs";

export default {
  // Do I want to use Auth0 so that users can reset passwords if needed?
  // I need a way for users to reset their passwords if they forget them and also authentication is handled really well by Auth0 already so I think that it would be a good idea to use it.
  // I think I need to add admin linking to the db from auth0
  // I need to see if there is a less round about way of doing what I am doing for auth right now
  login: async (req, res) => {
    try {
      const { name, email } = req.body;
      let user = await User.findOrCreate({ where: { email: email } });
      console.log("one user", user);
      if (!user[0].phone) {
        user[0].phone = "";
      }
      let church = {
        churchName: null,
      };
      if (!user[0].churchId) {
        user[0].churchId = null;
      } else if (user[0].churchId) {
        church = await Church.findOne({
          where: { churchId: user[0].churchId },
        });
      }

      req.session.user = {
        userId: user[0].userId,
        name: user[0].name,
        email: user[0].email,
        phone: user[0].phone,
        churchId: user[0].churchId,
        churchName: church.churchName,
      };
      res.status(200).json(req.session.user);
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
      const { name, phone, churchId } = req.body;
      const user = await User.findOne({ where: { userId: userId } });
      user.set({
        name: name || "",
        phone: phone || "",
        churchId: churchId ? Number(churchId) : null,
      });
      user.changed(true);
      const savedUser = await user.save();
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
      res.status(200).json(req.session.user);
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
