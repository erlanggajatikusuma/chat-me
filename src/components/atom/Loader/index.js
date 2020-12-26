import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('window');

const Loader = ({animating}) => {
  return (
    <View style={styles.loadContainer}>
      <View style={styles.indicator}>
        <ActivityIndicator size="large" animating={animating} color="white" />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loadContainer: {
    zIndex: 1,
    elevation: 2,
    height,
    width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  indicator: {
    backgroundColor: 'rgb(46, 46, 46)',
    height: 44,
    width: 44,
    borderRadius: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
