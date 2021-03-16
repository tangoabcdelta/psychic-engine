var faker = require("faker");
var _ = require("lodash");

// sauce: https://bit.ly/2neWfJ2
const toSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");

const extendableProperties = {
  categorized: faker.random.boolean(),
  exists: faker.random.boolean(),
  default: null,
};

const subFilterKeys = {
  immediately_available: {
    display_name: "Immediately Available",
  },
  top_university: {
    display_name: "Top University",
    categorized: faker.random.boolean(),
    exists: faker.random.boolean(),
    default: null,
  },
  diversity_candidate: {
    display_name: "Diversity Candidate",
    categorized: faker.random.boolean(),
    exists: faker.random.boolean(),
    default: null,
  },
  silver_medalist_candidate: {
    display_name: "Silver Medalist Candidate",
    categorized: faker.random.boolean(),
    exists: faker.random.boolean(),
    default: null,
  },
  fast_tracker: {
    display_name: "Fast Tracker",
    categorized: faker.random.boolean(),
    exists: faker.random.boolean(),
    default: null,
  },
  high_potential: {
    display_name: "High Potential",
    categorized: faker.random.boolean(),
    exists: faker.random.boolean(),
    default: null,
  },
};

module.exports = () =>
  _.times(5, (n) => {
    return {
      name: "default",
      config: {
        edge_insights: {
          display_name: "Edge Insights",
          categorized: true,
          exists: true,
          sub_filters: {
            immediately_available: {
              display_name: "Immediately Available",
              categorized: false,
              exists: true,
              default: null,
            },
            top_university: {
              display_name: "Top University",
              categorized: faker.random.boolean(),
              exists: faker.random.boolean(),
              default: null,
            },
            diversity_candidate: {
              display_name: "Diversity Candidate",
              categorized: faker.random.boolean(),
              exists: faker.random.boolean(),
              default: null,
            },
            silver_medalist_candidate: {
              display_name: "Silver Medalist Candidate",
              categorized: faker.random.boolean(),
              exists: faker.random.boolean(),
              default: null,
            },
            fast_tracker: {
              display_name: "Fast Tracker",
              categorized: faker.random.boolean(),
              exists: faker.random.boolean(),
              default: null,
            },
            high_potential: {
              display_name: "High Potential",
              categorized: faker.random.boolean(),
              exists: faker.random.boolean(),
              default: null,
            },
          },
        },
        star_ratings: {
          display_name: "Star Ratings",
          categorized: false,
          exists: true,
          default: null,
        },
        blind_recruitment: {
          display_name: "Blind Recruitment",
          categorized: false,
          exists: true,
          default: null,
        },
        time_sensitive: {
          display_name: "Time Sensitive",
          categorized: false,
          exists: true,
          default: null,
        },
        cost_sensitive: {
          display_name: "Cost Sensitive",
          categorized: false,
          exists: true,
          default: null,
        },
        performance_sensitive: {
          display_name: "Performance Sensitive",
          categorized: false,
          exists: true,
          default: null,
        },
        frozen_candidates: {
          display_name: "Frozen Candidates",
          categorized: false,
          exists: true,
          default: null,
        },
        mandatory_skills: {
          display_name: "Mandatory Skills",
          categorized: false,
          exists: true,
          default: null,
        },
        only_my_actions: {
          display_name: "Only My Actions",
          categorized: false,
          exists: true,
          default: null,
        },
        notice_period: {
          display_name: "Notice Period",
          categorized: false,
          exists: true,
          default: null,
        },
        current_location: {
          display_name: "Current Location",
          categorized: false,
          exists: true,
          default: null,
        },
        preferred_location: {
          display_name: "Preferred Location",
          categorized: false,
          exists: true,
          default: null,
        },
        current_organization: {
          display_name: "Current Organization",
          categorized: false,
          exists: true,
          default: null,
        },
        experience: {
          display_name: "Experience",
          categorized: false,
          exists: true,
          default: null,
        },
        education_qualification: {
          display_name: "Education Qualification",
          categorized: false,
          exists: true,
          default: null,
        },
        college: {
          display_name: "College",
          categorized: false,
          exists: true,
          default: null,
        },
        mail_status: {
          display_name: "Mail Status",
          categorized: false,
          exists: true,
          default: null,
        },
        source: {
          display_name: "Source",
          categorized: false,
          exists: true,
          default: null,
        },
      },
    };
  });
