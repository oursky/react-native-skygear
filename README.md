# React Native Skygear CLI

A CLI for generate react native project with skygear and other common libraries setup.

## Getting Started


### Prerequisites


```
//install react native cli
$ brew install node
$ brew install watchman
$ npm install -g react-native-cli

//install yarn
$ brew install yarn

//install cocoapods for generate .xcworkplace
$ [sudo] gem install cocoapods
```

### Installing

Install react-native-skygear package

```
$ npm install -g <repo url>

### Example
You can start init your app from our template:

```
$ react-native-skygear init <projectname>
? Enter Skygear End Point (Development) ... 
...
```

If you also init local skygear server, please ensure shutdown other docker container before run following script.
```
$ cd server
server $ make setup-development
server $ docker-compose up
```

### REMARKS

```
For iOS, please select a schema with config suffix before run at Xcode
```
