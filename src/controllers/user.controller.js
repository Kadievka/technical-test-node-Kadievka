require("dotenv").config();
import UserService from "../services/user.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

async function createUser(req, res) {
  logger.info("[createUser@userController] INIT");
  try {
    const userToRegister = req.body;
    const user = await UserService.createUserService(userToRegister);
    ResponseUtil.success(res, user);
  } catch (error) {
    logger.error("[createUser@userController] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[createUser@userController] FINISHED");
}

async function login(req, res) {
  logger.info("[login@userController] INIT");
  try {
    const userToLogin = req.body;
    const user = await UserService.loginService(userToLogin);
    ResponseUtil.success(res, user);
  } catch (error) {
    logger.error("[login@userController] ERROR", error);
    ResponseUtil.badRequest(res, error.code || errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[login@userController] FINISHED");
}

export { createUser, login };
