const codeInternalErrors = {

  PROCESS_NOT_FINISHED: 55,
  PROCESS_NOT_FINISHED_MESSAGE: "Process not finished",

  UNAUTHORIZED: 401,
  UNAUTHORIZED_MESSAGE: "Unauthorized access",

  USER_ALREADY_EXISTS: 40,
  USER_ALREADY_EXISTS_MESSAGE: "User already exists",

  USER_NOT_FOUND: 41,
  USER_NOT_FOUND_MESSAGE: "User not found",

  RESOURCE_NOT_FOUND: 42,
  RESOURCE_NOT_FOUND_MESSAGE: "Resource not found",

  RESOURCE_ALREADY_EXISTS: 43,
  RESOURCE_ALREADY_EXISTS_MESSAGE: "Resource already exists",

  REQUIRED_SALE_UNIT_MESSAGE: "\"salesUnit\" field is required",

  REQUIRED_RETURNED_UNIT_MESSAGE: "\"returnsUnit\" field is required",

  VALIDATION_FAILED: 422,
  VALIDATION_FAILED_MESSAGE: "Invalid request data",
};

export default codeInternalErrors;
