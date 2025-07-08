import User from "../models/User";
import { IUser } from "../types/User";
import { comparePassword } from "../utils/helpers/auth";
import jwt from 'jsonwebtoken';

class LoginUser {
  private email: string;
  private password: string;

  constructor(
    public username: string, email: string, public phone: string, password: string,
  ) {
    this.email = email; this.password = password; this.phone = phone;
  }

  async login() {

    try {
      // Check if user exists by email, username or phone
      const user: IUser | null = await User.findOne({
        $or: [{ email: this.email }, { username: this.username }, { phone: this.phone }]
      });

      if (!user) { return { status: false, msg: "No User Found" }; }

      // Compare passwords
      const match = await comparePassword(this.password, user.password);

      if (!match) { return { status: false, msg: "Invalid Password" }; }

      // Generate JWT token
      const token = jwt.sign(
        { email: user.email, _id: user._id, userID: user.userID, },
        process.env.JWT_SECRET as string,

        { expiresIn: "5h" } // Fixed "5hr" to standard "5h"
      );

      return {
        status: true, msg: "User logged in successfully!", token: token, userID: user._id,
        // user // Optional: you might want to return some user data
      };

    } catch (error) {
      console.error("Error logging user:", error);
      throw error;
    }
  }
}

export default LoginUser;