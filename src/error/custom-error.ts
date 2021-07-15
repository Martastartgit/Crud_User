export const customErrors = {
  // 400
  BAD_REQUEST_USER_REGISTERED: {
    message: 'User is already registered',
    code: 4001
  },
  BAD_REQUEST_ALREADY_ACTIVATED: {
    message: 'Already activated',
    code: 4002
  },

  BAD_REQUEST_EMAIL_EXIST : {
    message: 'Email exist',
    code: 4003
  },

  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present'
  },

  BAD_REQUEST_NOT_VALID_FILE: {
    message: 'Not valid file'
  },

  BAD_REQUEST_NOT_VALID_ID: {
    message: 'Not valid id'
  },

  BAD_REQUEST_FILE_MAX_SIZE: {
    message: 'Max size of file',
    code: 4006
  },

  WRONG_ACTION: {
    message: 'Wrong action type',
    code: 4007
  },

  //401
  UNAUTHORIZED_BAD_TOKEN: {
    message: 'Something wrong with token',
    code: 4011
  },

  //403
  FORBIDDEN_NOT_CONFIRMED: {
    message: 'Is not confirmed',
    code: 4031
  },

  // 404
  NOT_FOUND: {
    message: 'Record not found'

  },

  // 500
  TEMPLATE_NOT_FOUND: {
    message: 'Template not found',
    code: 4044
  }

};
