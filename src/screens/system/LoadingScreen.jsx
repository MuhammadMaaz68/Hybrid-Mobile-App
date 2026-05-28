import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loader from '../../components/ui/Loader';
import colors from '../../theme/colors';

export default function LoadingScreen() {
  return (
    <View style={styles.screen}>
      <Loader compact />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
});
