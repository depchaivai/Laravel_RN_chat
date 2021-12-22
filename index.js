/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { RNPushNotification } from "./libs/api/notifycation";

RNPushNotification.config();

AppRegistry.registerComponent(appName, () => App);
