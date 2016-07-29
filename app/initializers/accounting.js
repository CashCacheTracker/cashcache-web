import { currency } from "accounting/settings";

export default {
  name: 'accounting.js',
  initialize: function() {
    currency.symbol = "$";
    currency.thousand = ",";
    currency.precision = 0;
    currency.format = {
      pos:  "%s%v",
      neg: "-%s%v",
      zero: "%s%v",
    };
  }
};
