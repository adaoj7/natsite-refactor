import { User } from "../../dbscripts/model.js";
import bcrypt from "bcryptjs";

export default {
  // Do I want to use oauth so that users can reset passwords if needed?
  register: async (req, res) => {
    try {
      const { fname, lname, email, phone, church, password } = req.body;
      const foundUser = await User.findOne({ where: { email } });

      if (foundUser) {
        return res
          .status(400)
          .send("This email has already been used for an account");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        fname,
        lname,
        email,
        phone,
        church,
        password: hash,
        isAdmin: false,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
