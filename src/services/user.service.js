import User from "../models/User";
import errors from "../utils/codeInternalErrors";
import throwError from "../utils/throwError";
import log4js from "log4js";
import jwt from "jsonwebtoken";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

export default class UserService {
  static async createUser(user) {
    return User.create(user);
  }

  static async createUserService(userToRegister) {

    logger.info(`[createUserService@UserService] INIT`);

    userToRegister.email.toLowerCase();
    let user = await this.getUserByEmail(userToRegister.email);

    if (user) {
      throwError(
        errors.USER_ALREADY_EXISTS,
        errors.USER_ALREADY_EXISTS_MESSAGE
      );
    }

    user = await this.createUser(userToRegister);

    logger.info(`[createUserService@UserService] FINISH`);

    return {
      _id: user._id,
      email: user.email,
    };
  }

  static async getUserByEmail(email) {
    return User.findOne({email});
  }

  static async getUserById(_id, throwErrorIfNoExists = false) {
    logger.info(`[getUserById@UserService] INIT`);
    let user = null;
    user = await User.findById(_id);
    if (!user && throwErrorIfNoExists) {
      throwError(errors.USER_NOT_FOUND, errors.USER_NOT_FOUND_MESSAGE);
    }
    logger.info(`[getUserById@UserService] FINISH`);
    return user;
  }

  static async loginService(userToLogin) {
    logger.info(`[loginService@UserService] INIT`);
    userToLogin.email.toLowerCase();
    let user = await this.getUserByEmail(userToLogin.email);
    if (user) {
      const validPassword = await user.verifyPassword(userToLogin.password);
      if (validPassword) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        logger.info(`[loginService@UserService] FINISH`);
        return {
          _id: user._id,
          email: user.email,
          jwt: token,
        };
      }
    }
    logger.info(`[loginService@UserService] ERROR`);
    throwError(errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
  }

}
