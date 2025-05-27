import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken';
import nodemailer from 'nodemailer'

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



const sendPasswordResetMail = async(email,resetToken)=>{
   
    if(!process.env.NODEMAILER_AUTH_EMAIL || !process.env.NODEMAILER_AUTH_PASS){
        throw new Error("Email Service Credentials are not defined in environment variable");
    }
    
        const resetURL = `${process.env.HOST_URL}/api/user/reset-password/${resetToken}`
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.NODEMAILER_AUTH_EMAIL,
                pass : process.env.NODEMAILER_AUTH_PASS
            }
        })

        const mailOptions = {
            from : process.env.NODEMAILER_AUTH_EMAIL,
            to : email,
            subject : `Reset Password`,
            html : `<h1>Hey..</h1><p>Your Password Reset Link is <a href="${resetURL}"> Here</a > </p> <br/> This link expires in 10 minutes`
        }
        
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ', info.response);
            return true;
          } catch (error) {
            console.error("Failed to send email:", error);
            throw new Error("Mail Not Sent");
          }
    
}


const decodeResetToken = (token)=>{
    const decodedToken = jsonwebtoken.verify(token,process.env.JWT_SECRET)
    return decodedToken
}

export { generateToken , sendPasswordResetMail, decodeResetToken };
