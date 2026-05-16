// Format response sukses
const successResponse = (data, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

// Format response error
const errorResponse = (message = "Internal server error") => {
  return {
    success: false,
    error: message,
  };
};

module.exports = { successResponse, errorResponse };
