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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import IconCamera from '../../../assets/icon/camera3.png';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useTheme} from 'react-native-paper';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const EditProfile = () => {
  useEffect(() => {
    // const granted = PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   {
    //     title: 'ReactNativeCode Location Permission',
    //     message: 'ReactNativeCode App needs access to your location ',
    //   },
    // );
    // if (granted) {
    //   Geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log(position);
    //       console.log('latitude: ', position.coords.latitude);
    //       console.log('longitude: ', position.coords.longitude);
    //       setLatitude(position.coords.latitude);
    //       setLongitude(position.coords.longitude);
    //     },
    //     (error) => {
    //       // See error code charts below.
    //       console.log(error.code, error.message);
    //     },
    //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //   );
    // }
    getUser();

    return () => {
      null;
    };
  }, []);

  // Date Time Picker
  // const [date, setDate] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDob(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [photo, setPhoto] = useState(
    'https://ui-avatars.com/api/?size=512&name=user',
  );
  const [username, setUsername] = useState('Username');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [specificData, setSpecificData] = useState({});

  const getUser = () => {
    const auth = firebase.auth().currentUser;
    const uid = auth.uid;

    const user = firebase.database().ref(`users/${uid}`);
    user.on('value', (snapshot) => {
      console.log('user snapshot:', snapshot.val());
      setSpecificData(snapshot.val());
      setUsername(snapshot.val() !== null ? snapshot.val().username : '');
      setPhoneNumber(snapshot.val() !== null ? snapshot.val().phone : '');
      setDob(snapshot.val() !== null ? snapshot.val().dateOfBirth : '');
      // setUsername(specificData.username);
      // setPhoneNumber(specificData.phone);
      // setDob(specificData.dateOfBirth);
    });
  };

  const options = {
    mediaType: 'photo',
    maxWidth: 70,
    maxHeight: 70,
    quality: 1,
    saveToPhotos: true,
  };

  const takeImage = () => {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'ReactNativeCode Camera Permission',
        message: 'ReactNativeCode App needs access to your Camera ',
      },
    );
    if (granted) {
      launchCamera(options, (response) => {
        console.log(response);
        if (response.didCancel) {
          console.log('User Cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          let source = {uri: response.uri};
          console.log(source);
          // setPhoto(source);
        }
      });
    }
  };

  const chooseFromLibrary = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        // setPhoto(source);
        bs.current.snapTo(1);
        console.log(response);
        console.log(source);
      }
    });
  };

  const insertData = () => {
    const uid = firebase.auth().currentUser.uid;
    const eMail = firebase.auth().currentUser.email;
    const ref = firebase.database().ref(`users/${uid}`);
    const dOB = dob.toDateString();
    ref
      .set({
        email: eMail,
        uid: uid,
        username: username,
        status: 'Online',
        phone: phoneNumber,
        photo: photo,
        gender: gender,
        dateOfBirth: dOB,
      })
      .then(() => console.log('Success'))
      .catch((error) => console.log(error));
  };

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
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}>
            <ImageBackground
              source={{
                uri: photo,
              }}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 15}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </ImageBackground>
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
        {/* Picker */}
        <View style={styles.action}>
          <View style={{marginRight: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Gender</Text>
          </View>
          <Picker
            selectedValue={gender}
            // style={{height: 50, width: 150}}
            style={styles.textInput}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <View style={styles.action}>
          <View style={{marginRight: 10}}>
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
          <View style={{marginRight: 10}}>
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
          <View style={{marginRight: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              Date of Birth
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={showDatepicker}>
              <Text>{date.toDateString()}</Text>
              {/* <Text>{dob}</Text> */}
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
        <TouchableOpacity
          style={styles.commandButton}
          onPress={insertData}
          // onPress={() => console.log(username)}
        >
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
