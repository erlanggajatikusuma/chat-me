import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Map = ({navigation}) => {
  const [state, setState] = useState({
    modalVisibleL: false,
    longitude: '',
    latitude: '',
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -7.7584874,
          longitude: 110.3781121,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: 400,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
