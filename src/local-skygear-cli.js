const path = require('path');
const reactNativeFilePath = require.resolve('react-native');
const copyProjectTemplateAndReplace = require(path.resolve(
  reactNativeFilePath,
  '..',
  '..',
  '..',
  'local-cli',
  'generator',
  'copyProjectTemplateAndReplace'
));

const initServerWithProjectName = projectName => {
  console.log("Preparing local skygear server generation")
  const templatePath = path.resolve(
    __dirname,
    '..',
    'template',
    'local-skygear-template-oursky'
  );
  const descPath = path.resolve(projectName);
  console.log("Coping server template")
  copyProjectTemplateAndReplace(templatePath, descPath, projectName);
  console.log("Server generation done.")
};

module.exports = {
  initServerWithProjectName,
};
