var faker = require("faker");
var _ = require("lodash");

module.exports = () => ({
  "master-data": _.times(10, (n) => {
    return {
      "display_name": faker.company.companyName(),
      "total": faker.random.number()
    }
  }),

  requisitions: [],

});
 