import  { validationResult,check } from 'express-validator'


export const validateUser = () => {
  return [
    check("email")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please input your email.")
      .isEmail()
      .withMessage("Please input a valid email"),
    check("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please input your password.")
      .isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 0,
        minSymbols: 0,
      })
      .withMessage(
        "Please ensure your password is at least 6 characters long, has at least one uppercase and lowercase letters."
      ),
      (req,res,next)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next()
      }
  ];
};
