import User from "../models/User";
import { hashPassword } from "../utils/helpers/auth";
import { generateCode } from "./codeGenerator";


const DEFAULT_USER_IMAGE = "https://res.cloudinary.com/do52dpekr/image/upload/v1739627719/user-1_ml1nrp.jpg"

class RegisterUser {
  private user: any;
  private photoURL: string;

  constructor(
    public name: string, public username: string, public email: string, public phone: string,
    public password: string, public address: string,
  ) {
    this.photoURL = DEFAULT_USER_IMAGE // Default user image URL
    this.user = new User({
      uid: generateCode(9), name, username, email, phone,
      password: hashPassword(password), address, photoURL: this.photoURL
    });
  }

  async save(): Promise<any> {
    try {
      const savedUser = await this.user.save();
      return savedUser; // Return the saved user object
    } catch (error) {
      console.error("Error saving user:", error); // Log the error for debugging
      throw error;
    }
  }
}

export default RegisterUser;