export const formatResponse = (data, message = "OK") => {
  return {
    success: true,
    message,
    data,
  };
};
