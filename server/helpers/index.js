import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken";


export const hashUserPassword = async(password)=>{
    const saltRound = 5
    return bcrypt.hash(password,saltRound)
}



const generateToken = async (payload) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
      }
  return jsonwebtoken.sign(
    {
      userId: payload?._id,
      email: payload?.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

export { generateToken };
