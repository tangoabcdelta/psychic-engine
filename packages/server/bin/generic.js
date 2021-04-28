let count = 0;
const generic = (error, stdout, stderr) => {
  console.log(++count);
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
  console.log(`----------`);
};

module.exports = generic;
