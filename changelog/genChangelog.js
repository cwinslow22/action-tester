const fs = require("fs");
const conventionalChangelog = require("conventional-changelog");

module.exports = (tagPrefix, preset, jsonPackage, fileName, releaseCount) =>
  new Promise(resolve => {
    const changelogStream = conventionalChangelog(
      {
        preset,
        releaseCount
      },
      {
        version: jsonPackage.version,
        currentTag: `${tagPrefix}${jsonPackage.version}`,
        tagPrefix
      }
    );

    console.log("change log fired");
    changelogStream.pipe(fs.createWriteStream(fileName)).on("finish", resolve);
  });
