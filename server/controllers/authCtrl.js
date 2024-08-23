import { User } from "../../dbscripts/model.js";
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
        res.status(200).json(user);
      }
      res.status(200).json(user);
      console.log(name);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
