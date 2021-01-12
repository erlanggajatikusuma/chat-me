import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  ActivityIndicator,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import IconCamera from '../../../assets/icon/camera3.png';

import {useTheme} from 'react-native-paper';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const EditProfile = () => {
  const navigation = useNavigation();

  // Date Time Picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDob(currentDate.toDateString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  // const [photoDB, setPhotoDb] = useState('');
  const [username, setUsername] = useState('Username');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  // const [dobDB, setDobDB] = useState('');
  const [state, setState] = useState({
    latitude: '',
    longitude: '',
    lastPosition: '',
  });

  const getUser = async () => {
    const uid = firebase().currentUser.uid;

    const user = database().ref(`users/${uid}`);
    user.on('value', (snapshot) => {
      setUsername(snapshot.val() !== null ? snapshot.val().name : '');
      setPhoneNumber(snapshot.val() !== null ? snapshot.val().phone : '');
      setGender(snapshot.val().gender);
      setPhoto(snapshot.val() !== null ? snapshot.val().photo : '');
      setDob(snapshot.val().dateOfBirth);
      setState({
        ...state,
        latitude: snapshot.val().latitude,
        longitude: snapshot.val().longitude,
      });
    });
  };

  const options = {
    mediaType: 'photo',
    maxWidth: 700,
    maxHeight: 700,
    quality: 1,
    includeBase64: true,
    saveToPhotos: true,
  };

  const takeImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 700,
        maxWidth: 700,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User Cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          alert(response.error);
        } else {
          bs.current.snapTo(1);
          let source = response.uri;
          const base64Photo = `data:${response.type};base64,${response.base64}`;
          // setPhoto(source);
          setPhoto(base64Photo);
        }
      },
    );
  };

  const chooseFromLibrary = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        bs.current.snapTo(1);
        let source = response.uri;
        const base64Photo = `data:${response.type};base64,${response.base64}`;
        setPhoto(base64Photo);
      }
    });
  };

  const updateUser = async () => {
    setLoading(true);
    const uid = await AsyncStorage.getItem('uid');
    if (dob === '') {
      alert('Date of Birth empty');
      setLoading(false);
    } else if (photo === '') {
      console.log('photo  kosong woy');
      alert('Photo empty');
      setLoading(false);
    } else {
      await database()
        .ref(`users/${uid}`)
        .update({
          name: username,
          phone: phoneNumber,
          photo: photo,
          gender: gender,
          dateOfBirth: dob,
          latitude: state.latitude,
          longitude: state.longitude,
        })
        .then(() => {
          ToastAndroid.showWithGravity(
            'Data Updated',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.replace('Profile');
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ReactNativeCode Location Permission',
        message: 'ReactNativeCode App needs access to your location ',
        buttonPositive: 'OK',
      },
    );
    if (granted) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('Postition: ', position);
          setState({
            ...state,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    getUser();

    return () => {
      null;
    };
  }, []);

  const {colors} = useTheme();
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>
          Choose Your EditProfilee Picture
        </Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takeImage}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={chooseFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <>
      <View style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}>
          <View style={{alignItems: 'center', paddingBottom: 25}}>
            <View style={styles.photoBgWrapper}>
              {photo ? (
                <ImageBackground
                  source={{uri: photo}}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  {/* <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    /> */}
                </ImageBackground>
              ) : (
                <View style={styles.textImgWrapper}>
                  <Text style={styles.textImg}>{username.split(' ', 1)}</Text>
                </View>
              )}

              <TouchableOpacity
                onPress={() => bs.current.snapTo(0)}
                style={{
                  position: 'absolute',
                  bottom: -5,
                  left: 80,
                }}>
                <Image source={IconCamera} width={5} height={5} />
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
              {username}
            </Text>
          </View>

          <View style={styles.action}>
            <View style={{width: 90}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Name</Text>
            </View>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#666666"
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <View style={{width: 90}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Gender</Text>
            </View>
            <Picker
              selectedValue={gender}
              // style={{height: 50, width: 150}}
              style={styles.textInput}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          <View style={styles.action}>
            <View style={{width: 90}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Phone</Text>
            </View>
            <TextInput
              onChangeText={(num) => setPhoneNumber(num)}
              value={phoneNumber}
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <View style={{width: 90}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Birth Date</Text>
            </View>
            <View>
              <TouchableOpacity onPress={showDatepicker}>
                {dob ? (
                  <Text>{dob}</Text>
                ) : (
                  <Text style={{paddingLeft: 9}}>Choose</Text>
                )}
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          {loading ? (
            <Text>Loading ....</Text>
          ) : (
            <TouchableOpacity style={styles.commandButton} onPress={updateUser}>
              <Text style={styles.panelButtonTitle}>Submit</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoBgWrapper: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textImgWrapper: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c7c9c9',
  },
  textImg: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#364447',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#7E98DF',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#7E98DF',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
