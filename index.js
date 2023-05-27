/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
    return (
        <>
      <PaperProvider>
        <App />
      </PaperProvider>
      <Toast />
      </>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
