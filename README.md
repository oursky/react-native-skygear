# Create React Native Skygear

[![Build Status](https://travis-ci.com/oursky/create-react-native-skygear.svg?branch=master)](https://travis-ci.com/oursky/create-react-native-skygear)


A CLI for generate react native project with skygear and other common libraries setup.

## Prerequisites
* react-native-cli 2.0.1
* Yarn 1.12.1

## Usage
```sh
$ yarn global add create-react-native-skygear
$ create-react-native-skygear init YourProjectName
```

## Contribution
### Dev dependencies
* Node 8.x.x
* Yarn 1.12.1

### Setup
```sh
$ yarn
$ yarn watch
```

### Update template
You can update the template by modifying `./template/react-native-skygear`.
`HelloWorld` or `helloworld` will be replaced by `YourProjectName` or `yourprojectname` after the project generation. It may be useful to you if you need something depends on project's name

### Add dependencies to template
Modify `./template/react-native-skygear/dependencies.json` or `./template/react-native-skygear/devDependencies.json` to add dependencies to the template
