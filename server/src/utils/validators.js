import { validationResult, check } from "express-validator";
import jwt from "jsonwebtoken";

// validators
export const validateUserSignin = () => {
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
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const validateEmail = () => {
  return [
    check("email")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please input your email.")
      .isEmail()
      .withMessage("Please input a valid email"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

export const validatePassword = () => {
  return [
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
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};


export const validateCreateTask = () => {
  return [
    check("title")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please Input Task Title"),
    check("deadLine")
      .trim()
      .isDate()
      .withMessage("Please Enter a Valid Date")
      .notEmpty()
      .withMessage("Please Enter a Date in String Format"),
    check("priority")
      .trim()
      .escape()
      .isString()
      .notEmpty()
      .withMessage("Please Enter Priority Constraints"),
    check("status")
      .trim()
      .escape(),
    check("assignedTo")
      .trim()
      .notEmpty()
      .withMessage("Please Provide the Assigned To field"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

//JWT Authentication
export const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorisation Header Not Provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
