const { getTableData } = require('../models/table');
const getTable = async (ctx) => {
  const result = await getTableData();
  ctx.body = {
    data: result,
    success: true,
    errorCode: 0,
  };
};
module.exports = getTable;
