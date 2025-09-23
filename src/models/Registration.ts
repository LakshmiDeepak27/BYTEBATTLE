import mongoose, { Schema, models } from "mongoose";

const RegistrationSchema = new Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  language: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const Registration = models.Registration || mongoose.model("Registration", RegistrationSchema);

export default Registration;
