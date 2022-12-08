/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import WebView from 'react-native-webview';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const html = /*html*/ `
 <html>
   <h1>hello world</h1>
   <div id="container" style="height: 100%; width: 100%; border: none"></div>
   <script type="module">
     import Hyperbeam from "https://unpkg.com/@hyperbeam/web@latest/dist/index.js"
     const container = document.getElementById("container")
     async function getDemoURL() {
      const demoResponse = await fetch("https://demo-api.tutturu.workers.dev/");
      if(!demoResponse.ok) {
        alert("Failed to get demo computer, please try again later");
        return "";
      }
      const data = await demoResponse.json();
      return data.url;
     }

     async function initializeHB(embedURL) {
       try {
         const hb = await Hyperbeam(container, embedURL)
       } catch (e) {
         alert(e)
       }
     }

      getDemoURL().then(url => {
        if(url) {
          initializeHB(url);
        }
      })
   </script>
 </html>
 `;

const viewStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    width: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={viewStyle.container}>
        <WebView originWhitelist={['*']} source={{ html }} />
      </View>
    </SafeAreaView>
  );
};

export default App;
