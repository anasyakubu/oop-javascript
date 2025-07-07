import User from "../models/User";
import { hashPassword } from "../utils/helpers/auth";
import { generateCode } from "./codeGenerator";
import capitalize from "../utils/helpers/capitalize";

const DEFAULT_USER_IMAGE = "https://res.cloudinary.com/do52dpekr/image/upload/v1739627719/user-1_ml1nrp.jpg"

class RegisterUser {
  private user: any;
  private photoURL: string;

  constructor(
    public name: string, public username: string, public email: string, public phone: string,
    public password: string, public address: string,
  ) {
    this.photoURL = DEFAULT_USER_IMAGE; // Default user image URL
    // Initialize user without password first
    this.user = new User({
      uid: generateCode(9), name: capitalize(name), username, email, phone,
      password: '', address, photoURL: this.photoURL
    });
  }

  async initialize(): Promise<void> {
    const hPassword = await hashPassword(this.password);
    this.user.password = hPassword;
  }

  async save(): Promise<any> {
    try {
      await this.initialize(); // Ensure password is hashed before saving
      const savedUser = await this.user.save();
      return savedUser; // Return the saved user object
    } catch (error) {
      console.error("Error saving user:", error); // Log the error for debugging
      throw error;
    }
  }
}

export default RegisterUser;