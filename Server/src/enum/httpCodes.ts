export const httpCodes = {
  OK: { code: 200, message: "Successfully Completed Request" },
  CREATED: { code: 201, message: "Successfully Created Resource" },
  BAD_REQUEST: { code: 400, message: "Please Check Request" },
  UNAUTHORIZED: { code: 401, message: "You are not authorized" },
  FORBIDDEN: { code: 403, message: "Access is forbidden" },
  NOT_FOUND: { code: 404, message: "Resource Not Found" },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Something went wrong on the server",
  },
};
