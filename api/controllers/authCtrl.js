import { User } from "../dbscripts/model.js";
import bcrypt from "bcryptjs";

export default {
  // Do I want to use Auth0 so that users can reset passwords if needed?
  // I need a way for users to reset their passwords if they forget them and also authentication is handled really well by Auth0 already so I think that it would be a good idea to use it.
  login: async (req, res) => {
    try {
      const { name, email } = req.body;
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        user = await User.create({
          email: email,
          name: name,
        });
      }
      if (!user.phone) {
        user.phone = "";
      }
      if (!user.church) {
        user.church = null;
      }
      req.session.user = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        church: user.churchId,
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
      const { name, email, phone, churchId } = req.body;
      let user = await User.findOne({ where: { userId: userId } });
      user.name = name;
      user.phone = phone;
      user.churchId = churchId;
      await user.save();
      console.log(user);

      req.session.user = {
        userId: user.userId,
        email: user.email,
        name: user.name,
        phone: user.phone,
        churchId: user.churchId,
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
