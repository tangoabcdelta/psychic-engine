// https://edge--dev--tdp-ce.hirealchemy.com/api/employees/EN1022/
var faker = require("faker");
var _ = require("lodash");

module.exports = () => {
  return {
    id: "EN1022",
    ____id: `EN${Math.floor(Math.random() * 9999)}`,
    candidate_id: `EN${Math.floor(Math.random() * 9999)}`,
    name: faker.name.findName(),
    email: faker.internet.email(),
    title: "Senior Manager",
    role_name: "Manager II - Business Finance",
    date_of_joining: "01-Aug-2017",
    subsidiary_id: null,
    function: null,
    picture_url:
      "https://edge--dev--tdp-ce.hirealchemy.com/platform-dev/40b01108c1d04b518228d0d2afcbec89_pic.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=wiprohirealchemy%2F20201206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201206T195100Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5f079f9d28fd98cf5ffa670fa0020eddcd65d72287a33b7696c23cc4c6636338",
    resume_url: "40b01108-c1d0-4b51-8228-d0d2afcbec89.docx",
    linkedin: "www.linkedin.com/in",
    twitter: null,
    stackoverflow: null,
    github: null,
    new_user: false,
    grade: "B2",
    city: "Mumbai",
    state: "Maharashtra",
    role_id: "a9d77df1-0f26-41ca-a834-a2803aa1a323",
    location_id: "a8c8979c-6bcb-442b-8cfb-eaa0100d8c9e",
    grade_id: "b847cdba-e76f-445e-b48f-1401208695c0",
    resume_size: "33307",
    resume_uploaded_name: "Parvathi_Resume.docx",
    resume_uploaded_date: "2020-11-19 12:04:24",
    response: true,
    status_code: 200,
    ___candidate_name: faker.name.findName(),
    ___candidate_email: faker.internet.email(),
    ___candidate_phone: "+919876543210",
    ___experience: Math.floor(Math.random() * 10),
    ___salary: Math.floor(Math.random() * 1900000),
  };
};

// module.exports = () =>
//   _.times(5, (n) => {
//     return {
//       id: "EN1022",
//       ____id: `EN${Math.floor(Math.random() * 9999)}`,
//       candidate_id: `EN${Math.floor(Math.random() * 9999)}`,
//       name: faker.name.findName(),
//       email: faker.internet.email(),
//       title: "Senior Manager",
//       role_name: "Manager II - Business Finance",
//       date_of_joining: "01-Aug-2017",
//       subsidiary_id: null,
//       function: null,
//       picture_url:
//         "https://edge--dev--tdp-ce.hirealchemy.com/platform-dev/40b01108c1d04b518228d0d2afcbec89_pic.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=wiprohirealchemy%2F20201206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201206T195100Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5f079f9d28fd98cf5ffa670fa0020eddcd65d72287a33b7696c23cc4c6636338",
//       resume_url: "40b01108-c1d0-4b51-8228-d0d2afcbec89.docx",
//       linkedin: "www.linkedin.com/in",
//       twitter: null,
//       stackoverflow: null,
//       github: null,
//       new_user: false,
//       grade: "B2",
//       city: "Mumbai",
//       state: "Maharashtra",
//       role_id: "a9d77df1-0f26-41ca-a834-a2803aa1a323",
//       location_id: "a8c8979c-6bcb-442b-8cfb-eaa0100d8c9e",
//       grade_id: "b847cdba-e76f-445e-b48f-1401208695c0",
//       resume_size: "33307",
//       resume_uploaded_name: "Parvathi_Resume.docx",
//       resume_uploaded_date: "2020-11-19 12:04:24",
//       response: true,
//       status_code: 200,
//       ___candidate_name: faker.name.findName(),
//       ___candidate_email: faker.internet.email(),
//       ___candidate_phone: "+919876543210",
//       ___experience: Math.floor(Math.random() * 10),
//       ___salary: Math.floor(Math.random() * 1900000),
//     };
//   });
