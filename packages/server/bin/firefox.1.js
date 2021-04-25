const firefox1 = async () => {
  // BLOCK ::: FIREFOX (on Windows OS)
  const queries = [
    `reg query "HKEY_CURRENT_USER\\Software\\Mozilla\\Mozilla Firefox" /v CurrentVersion`,
    'reg query "HKEY_CURRENT_USER\\Software\\Mozilla\\Mozilla Firefox" /v CurrentVersion',
    'reg query "HKEY_LOCAL_MACHINE\\Software\\Mozilla\\Mozilla Firefox" /v CurrentVersion',
    'reg query "HKEY_CURRENT_USER\\Software\\Mozilla\\Mozilla Firefox\\" /s /v PathToExe',
    'reg query "HKEY_LOCAL_MACHINE\\Software\\Mozilla\\Mozilla Firefox\\%VERSION%\\Main\\" /s /v PathToExe',
  ];

  const execq = (query) => {
    new Promise((resolve, reject) => {
      exec(query, function(err, stdout) {
        if (err) {
          reject(err, stdout);
        }

        let data = null;
        let version = null;
        let ffPath = null;
        data = stdout.split("  ");

        version = data[data.length - 1].replace(/\r\n/g, "").trim();
        if (!version) {
          version = data[data.length - 1]
            .replace("CurrentVersion", "")
            .replace("REG_SZ", "")
            .replace(/\r\n/g, "")
            .trim();
        }

        data.forEach(function(line) {
          if (/PathToExe/.test(line)) {
            let cmd = line
              .replace("PathToExe", "")
              .replace("REG_SZ", "")
              .replace(/"/g, "")
              .trim();
            if (cmd) {
              ffPath = cmd;
            }
          }
        });
        resolve(
          {
            data,
            version,
            ffPath,
          },
          stdout
        );
      });
    });
  };
  let results = await Promise.all(queries.map(execq));
  results = results.filter(Boolean);
  return results;
};
firefox1();
module.exports = firefox1;
