import { format } from 'date-fns';
import { uk } from 'date-fns/locale/uk';

const formatDateTime = (timestamp, dateFormat) =>
  format(new Date(timestamp * 1000), dateFormat, {
    locale: uk,
  });

export { formatDateTime };
