var faker = require("faker");
var _ = require("lodash");

module.exports = () => (_.times(5, (n) => {
  return {
    "id": n+1,
    "candidate_name": faker.name.findName(),
    "candidate_email": faker.internet.email(),
    "candidate_phone": "+919876543210",
    "experience": Math.floor(Math.random() * 10),
    "salary": Math.floor(Math.random() * 1900000)
  }
}));
 