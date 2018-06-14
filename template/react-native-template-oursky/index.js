import { AppRegistry } from 'react-native';
import Raven from 'raven-js';
import Config from 'react-native-config'
import App from './js/App';

AppRegistry.registerComponent('HelloWorld', () => App);
Raven.config(Config.SENTRY_DSN).install();