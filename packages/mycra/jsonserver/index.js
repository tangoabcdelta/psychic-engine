function fakeDataGenerator() {
  var faker = require("faker");
  var _ = require("lodash");

  const MAIL_STATUS = ["success", "acknowledged", "unresponsive", "failure"];
  const ROLES_ARRAY = [
    "Devops",
    "SDE 2",
    "SDE 1",
    "Senior Software Engineer",
    "Technical Member Staff",
    "SE L3",
  ];
  const STATUS_ARRAY = ["rejected", "shortlisted", "in_process"];
  const SKILLS_ARRAY = [
    "Python.",
    "infrastructure management and",
    "Data Scientist",
    "Analytics",
    "React (web)",
    "Angular",
    "Machine Learning",
    "Docker",
    "Django",
    "CompTIA",
    "Amazon AWS",
    "JavaScript",
    "HTML/CSS",
    "SQL",
    "Python",
    "Java",
    "Bash/Shell/PowerShell",
    "C#",
    "PHP",
    "C++",
    "TypeScript",
    "C",
    "Ruby",
    "Go",
    "Assembly",
    "Swift",
    "R",
    "VBA",
    "Objective-C",
    "Scala",
    "Rust",
    "Dart",
    "Elixir",
    "Clojure",
    "WebAssembly",
    ".NET",
    ".NET Core",
    "Pandas",
    "Unity 3D",
    "React Native",
    "TensorFlow",
    "Ansible",
    "Cordova",
    "Xamarin",
    "Apache Spark",
    "Hadoop",
    "Unreal Engine",
    "Flutter",
    "Torch/PyTorch",
    "Puppet",
    "Chef",
    "CryEngine",
  ];
  // quotes added using services from http://commaquote.azurewebsites.net/

  const people = require("./people")();
  const demands = require("./demands")();
  const supplies = require("./supplies")();
  const suppliesSupplies = require("./supplies")();
  const filter = require("./filter")();
  const employees = require("./hire/employees")();

  return {
    people,
    demands,
    supplies,
    filter,
    employees,
    "supplies-supplies": suppliesSupplies,
    "supplies-config": [],
  };
}

module.exports = fakeDataGenerator;
