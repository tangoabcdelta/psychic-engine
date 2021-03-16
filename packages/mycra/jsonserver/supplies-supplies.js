var faker = require("faker");
var _ = require("lodash");

module.exports = () => ( _.times(5, (n) => {
  let name = faker.name.findName();
  let fname = name.split(" ")[0];
  let lname = name.split(" ")[0];
  return {
    "id": n + 1,
    "supply_name": name,
    "star_rating": 1 + Math.floor(Math.random() * 2),
    "insights": {
      "silver_medalist": faker.random.boolean(),
      "top_university": faker.random.boolean(),
      "highest_qualification": "MBA"
    },
    "job_requirements": {
      "current_profile": faker.name.jobType(),
      "organization": faker.company.companyName(),
      "location": `${faker.address.county()}, ${faker.address.state()}`,
      "experience": `${Math.floor(Math.random() * 30)} year`,
      "salary": `${Math.floor(Math.random() * 1900000)} GBP`
    },
    "skills": _.sampleSize(SKILLS_ARRAY, 5),
    "views": Math.floor(Math.random() * 30),
    "comments": _.times(Math.floor(Math.random() * 3), (n) => {
      return {
        "name": faker.name.findName(),
        "comment": faker.lorem.sentence(),
        "commented_on": faker.date.past()
      }
    }),
    "stages": _.times(Math.floor(Math.random() * 4), (n) => {
      return {
        "stage_name": _.sample(ROLES_ARRAY), 
        "status": _.sample(STATUS_ARRAY),
        "timestamp": faker.date.recent()
      }
    }),
    "is_soft_lock": faker.random.boolean(),
    "soft_lock": `${Math.floor(Math.random() * 5)}D: ${Math.floor(Math.random() * 5)}H`,
    "ecr": Math.floor(Math.random() * 10),
    "phone": faker.phone.phoneNumber(),
    "email": faker.internet.email,
    "college": `${faker.address.state()} State University`,
    "current_location": faker.address.city(),
    "preferred_location": faker.address.city(),
    "educational_qualification": "MBA",
    "mail_status": _.sample(MAIL_STATUS),
    "notice_period": Math.floor(Math.random * 60),
    "social_links": {
      "linkedin": `https://www.linkedin.com/en/${fname}-${lname}-${faker.git.shortSha()}/`,
      "github": `https://github.com/${fname}${faker.git.shortSha()}`,
      "stackoverflow": `https://stackoverflow.com/users/${Math.floor(Math.random() * 9000000)}/${fname}-${lname}-${faker.git.shortSha()}`,
      "twitter": `https://twitter.com/${faker.hacker.adjective()}${fname}`
    }
  }
}));
 