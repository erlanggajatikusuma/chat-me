// import React, {useEffect, useState} from 'react';
import {useState} from 'react';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import firebase from 'firebase';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const EditProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState('');

  const options = {
    mediaType: 'photo',
    maxWidth: 70,
    maxHeight: 70,
    quality: 1,
    saveToPhotos: true,
  };

  const takeImage = () => {
    launchCamera(options, (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        // console.log(source);
        // setPhoto(source);
      }
    });
  };

  const chooseFromLibrary = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
        const source = {uri: response.uri};
        console.log(source);
      }
    });
  };

  const insertData = async () => {
    const uid = firebase.auth().currentUser.uid;
    const eMail = firebase.auth().currentUser.email;
    const ref = firebase.database().ref(`users/${uid}`);
    await ref
      .set({
        email: eMail,
        uid: uid,
        displayName,
        status: 'Online',
        phone: phoneNumber,
      })
      .then(() => console.log('Success'))
      .catch((error) => console.log(error));
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'grey',
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
      {/* <Text>Edit Profile page</Text>
      <View>
        <Text>Username</Text>
        <TextInput onChangeText={(name) => setDisplayName(name)} />
      </View> */}
      {/* <View>
        <TouchableOpacity
          onPress={takeImage}
          style={{
            backgroundColor: '#7E98DF',
            paddingVertical: 15,
            marginHorizontal: 50,
            borderRadius: 70,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={chooseFromLibrary}
          style={{
            backgroundColor: '#7E98DF',
            paddingVertical: 15,
            marginHorizontal: 50,
            borderRadius: 70,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Choose Photo
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#7E98DF',
            paddingHorizontal: 12,
            paddingVertical: 15,
            borderRadius: 70,
          }}
          onPress={() => insertData()}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 'bold',
              color: '#FFF',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
