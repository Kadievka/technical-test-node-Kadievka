const CODE_OK = 200;
const CODE_EMPTY_OK = 202;
const CODE_BAD_REQUEST = 400;
const CODE_UNAUTHORIZED = 401;
const VALIDATION_FAILED = 422;
const CODE_SERVER_ERROR = 500;
const SUCCESS_MESSAGE = "Request successful";

export default class Responses {

  static nullResponseHandler(res, data) {
    if(data === null){
      this.successEmpty(res, data)
    }else{
      this.success(res, data);
    }
  }

  static badRequest(res, errorCode, message) {
    res.status(CODE_BAD_REQUEST).json({
      success: false,
      code: errorCode,
      message: message,
    });
  }

  static validationFailed(res, errorCode, message) {
    res.status(VALIDATION_FAILED).json({
      success: false,
      code: errorCode,
      message: message,
    });
  }

  static serverError(res, errorCode, message) {
    res.status(CODE_SERVER_ERROR).json({
      success: false,
      code: errorCode,
      message: message,
    });
  }

  static success(res, data) {
    res.status(CODE_OK).json({
      success: true,
      data: data,
      message: SUCCESS_MESSAGE,
    });
  }

  static successEmpty(res, data) {
    res.status(CODE_EMPTY_OK).json({
      success: true,
      data: data,
      message: SUCCESS_MESSAGE,
    });
  }

  static unauthorized(res, errorCode, message, data) {
    res.status(CODE_UNAUTHORIZED).json({
      success: false,
      code: errorCode,
      message: message,
      data: data,
    });
  }
}
