/**
 * 统一响应格式
 */
function sendSuccess(res, data = null, message = 'ok', statusCode = 200) {
  const body = { success: true, message };
  if (data !== null) body.data = data;
  return res.status(statusCode).json(body);
}

function sendPaginated(res, { items, total, page, pageSize }) {
  return res.status(200).json({
    success: true,
    data: items,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

function sendError(res, statusCode, message, code = null) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: code || `E${statusCode}`,
      message,
    },
  });
}

function sendCreated(res, data, message = '创建成功') {
  return sendSuccess(res, data, message, 201);
}

function sendNoContent(res) {
  return res.status(204).send();
}

module.exports = {
  sendSuccess,
  sendPaginated,
  sendError,
  sendCreated,
  sendNoContent,
};
