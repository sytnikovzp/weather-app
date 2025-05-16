const { format } = require('date-fns');
const { uk } = require('date-fns/locale');

const formatDateTime = function (date) {
  if (!date) {
    return null;
  }
  return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: uk });
};

module.exports = {
  formatDateTime,
};
