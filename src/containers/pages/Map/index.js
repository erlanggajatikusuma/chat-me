import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Map = ({navigation}) => {
  const [state, setState] = useState({
    modalVisible: false,
    image: '',
    longitude: '',
    latitude: '',
    allUser: [],
  });

  const getUser = async () => {
    const uid = await AsyncStorage.getItem('uid');
    database()
      .ref(`users/${uid}/`)
      .on('value', (snapshot) => {
        setState({
          ...state,
          latitude: snapshot.val().latitude,
          longitude: snapshot.val().longitude,
          image: snapshot.val().photo,
        });
      });
  };

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
    getUser();
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
          {
            console.log('All data: ', data.latitude);
          }
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
                <Image
                  source={{uri: data.photo}}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50 / 2,
                    borderColor: 'white',
                    borderWidth: 1,
                    backgroundColor: 'black',
                  }}
                />
              </View>
              {/* <Callout tooltip>
            <>
              <View style={styles.bubble}>
                <Text style={styles.name}>My Location</Text>
              </View>
              <View style={state.arrowBorder} />
              <View style={state.arrow} />
            </>
          </Callout> */}
            </Marker>
          );
        })}
      </MapView>
      <Button title="Try" onPress={() => console.log(state)} />
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
  marker: {
    padding: 5,
    borderRadius: 20,
    elevation: 10,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    borderWidth: 16,
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    borderWidth: 16,
    marginTop: -0.5,
  },
});
