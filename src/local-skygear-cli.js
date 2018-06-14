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
  const templatePath = path.resolve(
    __dirname,
    '..',
    'template',
    'local-skygear-template-oursky'
  );
  const descPath = path.resolve(projectName);
  copyProjectTemplateAndReplace(templatePath, descPath, projectName);
};

module.exports = {
  initServerWithProjectName,
};
