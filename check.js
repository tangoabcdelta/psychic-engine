#!/usr/bin/env node

const { exec } = require("child_process");

let count = 0;
const execq = (command, index, arr) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      console.log(`${++count}: ${command}\n`);
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      console.log(`\n\n\n`);
      // console.log(`----------\n\n`);
      // console.log();
      // console.log();
      resolve(stdout);
    });
  });
};

const PORT = 3000;
const commands = [
  "echo START",
  "echo $(lsb_release -sc)",
  "UBUNTU_VERSION=$(lsb_release -sr)",
  "echo $UBUNTU_VERSION",
  "UBUNTU_VERSION=$(lsb_release -sr) && echo $UBUNTU_VERSION",
  `lsof -i :${PORT}`,
  `lsof -i :${PORT} | grep node`,
  `netstat -ano -p tcp | grep ${PORT}`,
  `netstat -nlp | grep ${PORT}`,
];
(async () => {
  const result = await Promise.all[commands.map(execq)];
})();
