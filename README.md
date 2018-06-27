# React Native Skygear CLI

A CLI for generate react native project with skygear and other common libraries setup.

## Getting Started


### Prerequisites


```
//install react native cli
$ brew install node
$ brew install watchman

//install cocoapods for generate .xcworkplace
$ [sudo] gem install cocoapods
```

### Installing

Install react-native-skygear package

```
$ npm install -g https://github.com/oursky/react-native-skygear.git#master
```

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

To run rn project:

```
$ npm run start
$ npm run android // Need connect real device
$ npm run ios // Default using development scheme
```
