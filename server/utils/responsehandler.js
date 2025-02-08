exports.success_function = function (api_data) {
    return {
      message: api_data.message || null,
      data: api_data.data || null,
      statuscode: 200,
      status: true,
    };
  };
  
  exports.error_function = function (api_data) {
    return {
      message: api_data.message || null,
      data: api_data.data || null,
      statuscode: 400,
      status: false,
    };
  };