import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { observer } from 'mobx-react';
import { NavioScreen } from 'rn-navio';
import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { navio } from '../navio';

SplashScreen.preventAutoHideAsync();

export const Splash: NavioScreen = observer(() => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    async function handleNavigation() {
      if (appIsReady) {
        await SplashScreen.hideAsync();
        setTimeout(() => {
          navio.setRoot('stacks', 'AuthFlow'); // Ganti root ke AppTabs setelah delay 2 detik
        }, 1000);
      }
    }
    handleNavigation();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View flex bg-bgColor>
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Image
          style={styles.image}
          source={require('../../assets/tujuhsembilan.png')}
          contentFit="contain"
        />
      </View>
    </View>
  );
});

Splash.options = props => ({
  headerBackTitleStyle: false,
});

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: '100%',
  },
});
