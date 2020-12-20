import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist/hooks';
import { ScrollView } from 'react-native-gesture-handler';

// EXPO modules
import { Constants as ExpoConstants } from 'react-native-unimodules';
import * as Network from 'expo-network';

import Constants from '../utils/constants';
import { useStores } from '../stores';
import { useServices } from '../services';
import Reanimated2 from '../components/Reanimated2';
import { ButtonTitle } from '../components/Button';
import useStyles from '../utils/useStyles';
import NView from '../components/NView';

type ExpoScreenProps = { }

const ExpoScreen: NavigationFunctionComponent<ExpoScreenProps> = observer(({
  componentId,
}) => {
  const { ui } = useStores();
  const { navigation, t } = useServices();
  const { styles } = useStyles(_styles);

  useNavigationComponentDidAppear(() => {
    getNetworkType();
  }, componentId);

  const getNetworkType = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();

      ui.setNetworkType(networkState.type);
    } catch (e) { }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.header}>
            { t.do('from_expo') }
          </Text>

          <Text style={styles.text}>Device ID: {ExpoConstants.deviceId}</Text>
          <Text style={styles.text}>Network type: {ui.networkType}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>
            { t.do('reanimated2') }
          </Text>

          <Reanimated2 />
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>
            { t.do('navigation') }
          </Text>

          <ButtonTitle
            title={t.do('push_screen')}
            onPress={() => navigation.pushExpo(componentId)}
          />
          <ButtonTitle
            title={t.do('show_modal')}
            onPress={() => navigation.showExpo()}
          />
          <ButtonTitle
            title={t.do('close_modal')}
            onPress={() => navigation.dismissModal(componentId)}
          />
        </View>
      </ScrollView>
    </>
  )
});

const _styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  section: {
    padding: theme.sizes.m,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  text: {
    fontSize: 16,
    margin: theme.sizes.s,
    color: theme.colors.text,
  }
});

ExpoScreen.options = props => ({
  topBar: {
    title: {
      text: Constants.ScreenTitles.ExpoScreen,
    },
    largeTitle: {
      visible: true,
    }
  },
});

export default ExpoScreen;
