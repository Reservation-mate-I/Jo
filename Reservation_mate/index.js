import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App.js'; // 수정
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
