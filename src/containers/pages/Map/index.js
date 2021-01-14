import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import database from '@react-native-firebase/database';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Map = ({navigation}) => {
  const [state, setState] = useState({
    allUser: [],
  });

  const getAllUser = () => {
    database()
      .ref('users')
      .on('value', (snapshot) => {
        const initData = [];
        Object.keys(snapshot.val()).forEach((index) =>
          initData.push(snapshot.val()[index]),
        );
        setState({
          ...state,
          allUser: initData,
        });
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const MapMarker = <Icon name="map-marker-alt" size={20} color="red" />;

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
        }}>
        {state.allUser.map((data) => {
          return (
            <Marker
              coordinate={{
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
              }}
              title={data.name}
              description={data.status}
              key={data.uid}
              icon={MapMarker}>
              <View style={styles.marker}>
                <Image source={{uri: data.photo}} style={styles.imgMarker} />
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  marker: {
    padding: 5,
    borderRadius: 20,
    elevation: 10,
  },
  imgMarker: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  modal: {
    top: '70%',
    width: '99%',
    height: '20%',
    backgroundColor: '#faf8f0',
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  modalView: {
    backgroundColor: 'blue',
    borderWidth: 1,
  },
});
