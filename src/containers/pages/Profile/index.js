import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import picture from '../../../assets/image/hachiman.jpg';
import firebase from 'firebase';

const Profile = () => {
  const addUser = async (name, email, uid, profileImg) => {
    try {
      return await firebase
        .database()
        .ref('users/' + uid)
        .set({
          name: name,
          email: email,
          uuid: uid,
          profileImg: profileImg,
        });
    } catch (error) {
      return error;
    }
  };

  return (
    <View>
      <View style={{flexDirection: 'row', paddingLeft: 15}}>
        <Image
          source={picture}
          style={{
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            borderWidth: 1,
            borderColor: 'black',
          }}
        />
        <View
          style={{
            backgroundColor: '#12b3cc',
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Hachiman Hikigaya
          </Text>
          <Text>hachiman@gmail.com</Text>
        </View>
      </View>
      <View style={{paddingLeft: 15, paddingTop: 34, backgroundColor: 'pink'}}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>Account</Text>
        <Text>Location</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
