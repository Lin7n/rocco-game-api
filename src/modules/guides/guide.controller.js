/**
 * 攻略 Controller
 */
const { list, getById, getCategories } = require('../../data/guides');
const { sendSuccess, sendPaginated, sendError } = require('../../utils/response');

exports.list = (req, res) => {
  const { page, pageSize, category } = req.query;
  const result = list({
    page: Math.max(1, parseInt(page) || 1),
    pageSize: Math.min(100, Math.max(1, parseInt(pageSize) || 20)),
    category,
  });
  sendPaginated(res, result);
};

exports.detail = (req, res) => {
  const guide = getById(req.params.id);
  if (!guide) return sendError(res, 404, 'Guide not found');
  sendSuccess(res, guide);
};

exports.categories = (req, res) => {
  sendSuccess(res, getCategories());
};
