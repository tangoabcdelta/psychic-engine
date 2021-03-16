var faker = require("faker");
var _ = require("lodash");

module.exports = () => (_.times(100, (n) => {
  return {
    "id": n,
    name: faker.name.findName(),
    email: faker.internet.email,
    avatar: faker.internet.avatar()
  }
}));
 