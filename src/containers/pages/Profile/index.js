import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Permission,
  PermissionsAndroid,
  Button,
  Alert,
  ToastAndroid,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingImg from '../../../assets/icon/Settings.svg';
import firebase from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Loader from '../../../components/atom/Loader';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Profile = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [uID, setUID] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState({
    address: '',
    latitude: '',
    longitude: '',
  });

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('uid');
    } catch (e) {
      console.log(e);
    }
    console.log('Remove uid Storage Done.');
  };

  const signOut = async () => {
    const uid = firebase().currentUser.uid;

    await database().ref(`users/${uid}`).update({status: 'Offline'});
    firebase()
      .signOut()
      .then(() => {
        removeValue();
        setName('');
        setEmail('');
        setStatus('');
        setDob('');
        setPhoto('');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      });
    // userUid: '',
  };

  const updateLocation = async () => {
    console.log('Pressed');
    setLoading(true);
    Geolocation.getCurrentPosition(
      async (position) => {
        await fetch(
          `http://us1.locationiq.com/v1/reverse.php?key=68e73a2b14084c&lat=${state.latitude}&lon=${state.longitude}&format=json`,
        )
          .then((response) => response.json())
          .then((json) => {
            setState({
              ...state,
              address: json.display_name,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLoading(false);
          });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        console.log('error loc: ', error);
        alert(error.message);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getUser = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      // setUID(uid);
      // database().ref(`users/${uid}`).update({
      //   status: 'Online',
      // });

      database()
        .ref(`users/${uid}`)
        .on('value', async (dataSnapshot) => {
          const snapshot = await dataSnapshot.val();
          setName(snapshot.name);
          setEmail(snapshot.email);
          setStatus(snapshot.status);
          setDob(snapshot.dateOfBirth);
          setPhoto(snapshot.photo);
          setPhone(snapshot.phone);
          setState({
            ...state,
            latitude: snapshot.latitude,
            longitude: snapshot.longitude,
          });

          if (snapshot.photo === '') {
            navigation.replace('Edit');
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
    // updateLocation();
  }, []);

  return (
    <>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          backgroundColor: '#0066ff',
          paddingHorizontal: '3%',
        }}>
        <View
          style={{
            alignSelf: 'flex-end',
            marginTop: '2%',
            marginBottom: '4%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
            <Icon2 name="dots-horizontal" size={30} color="white" />
          </TouchableOpacity>
        </View>
        {photo ? (
          <Image source={{uri: photo}} style={styles.imgStyle} />
        ) : (
          <View style={styles.textImg}>
            <Text style={{color: 'white'}}>{name.split(' ', 1)}</Text>
          </View>
        )}
        <View style={{marginTop: '1%'}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              letterSpacing: 0.7,
              color: '#e3fffa',
            }}>
            {name}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: '#e3fffa',
              fontSize: 15,
              fontWeight: '600',
            }}>
            {status}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          {loading ? (
            <ActivityIndicator size={20} color="blue" />
          ) : (
            <TouchableHighlight
              onPress={updateLocation}
              style={{
                marginTop: '5%',
                width: 50,
                height: 50,
                // backgroundColor: 'pink',
                borderRadius: 50 / 2,
                justifyContent: 'center',
                elevation: 7,
              }}>
              <Icon
                style={{alignSelf: 'center'}}
                name="map-marker-alt"
                size={25}
                color="#cffff6"
              />
            </TouchableHighlight>
          )}
          <View
            style={{
              width: '70%',
              alignItems: 'center',
              marginTop: '1%',
            }}>
            {state.address ? (
              <Text
                style={{textAlign: 'center', fontSize: 15, color: '#cffff6'}}>
                {state.address}
              </Text>
            ) : (
              <Text
                style={{color: '#cffff6', fontSize: 15, textAlign: 'center'}}>
                Update Your Location
              </Text>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: '3%',
          marginTop: '5%',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: '2%',
              paddingHorizontal: '2%',
              paddingVertical: '4%',
              alignItems: 'center',
              elevation: 2,
              borderRadius: 3,
            }}>
            <Icon2 name="email" size={25} color="#0066ff" />
            <Text style={{marginLeft: '3%'}}>{email}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: '2%',
              paddingHorizontal: '2%',
              paddingVertical: '4%',
              alignItems: 'center',
              elevation: 2,
              borderRadius: 3,
            }}>
            <FontAwesome5Icon name="phone" size={25} color="#0066ff" />
            <Text style={{marginLeft: '3%'}}>{phone}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Logout',
                  'Are you sure ?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => signOut(),
                    },
                    {
                      text: 'No',
                    },
                    ,
                  ],
                  {
                    cancelable: false,
                  },
                )
              }
              style={{
                marginTop: '3%',
                backgroundColor: '#0066ff',
                borderRadius: 9,
                // marginHorizontal: 70,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 10,
                  color: 'white',
                  fontSize: 16,
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imgStyle: {
    borderColor: '#e3fffa',
    borderWidth: 2,
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },
  textImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  profileWrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
