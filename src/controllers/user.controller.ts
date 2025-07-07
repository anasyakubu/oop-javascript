import { Request, Response } from "express"
import RegisterUser from "../services/registerUser";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const { name, username, email, phone, password, address } = req.body;

    //*********** check for missing fields ***********//
    const checkMissingFields = (fields: any) => {
      for (const [key, value] of Object.entries(fields)) {
        if (!value) { return key; }
      }
      return null; // All fields are valid
    };

    const fieldsToCheck = { name, username, email, phone, password, address };
    const missingField = checkMissingFields(fieldsToCheck);

    if (missingField) { res.status(404).json({ status: 400, error: `${missingField} is required` }) }

    const user = new RegisterUser(name, username, email, phone, password, address)

    const result = await user.save();

    res.status(201).json({
      success: true, msg: "new user created", data: result
    })

  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, msg: "Error registering user", error });

  }
}

export { registerUser }