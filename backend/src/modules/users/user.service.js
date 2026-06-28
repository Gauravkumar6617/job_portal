import userRepository from "./user.repository.js";
import { hashedPassword } from "../../utils/bcrypt.js";

export const registerUser = async (data) => {
  const { name, email, password, role } = data;
  const isUserExist = await userRepository.getUserByEmail(email);
  if (isUserExist) {
    throw new Error("User already exists", 409);
  }
  const passwordHash = await hashedPassword(password, 10);
  const newUser = await userRepository.createUser(
    name,
    email,
    passwordHash,
    role,
  );
  return newUser;
};
