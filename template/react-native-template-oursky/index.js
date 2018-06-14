import { AppRegistry } from 'react-native';
import Raven from 'raven-js';
import Config from 'react-native-config';
import skygear from 'skygear/react-native';
import App from './js/App';

AppRegistry.registerComponent('HelloWorld', () => App);
Raven.config(Config.SENTRY_DSN).install();

skygear
  .config({
    endPoint: Config.SKYGEAR_ENDPOINT,
    apiKey: Config.SKYGEAR_API_KEY,
  })
  .then(
    () => {
      console.log('skygear container is now ready for making API calls.');
    },
    error => {
      console.error(error);
    }
  );
