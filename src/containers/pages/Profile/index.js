import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
  ToastAndroid,
} from 'react-native';
import picture from '../../../assets/image/hachiman.jpg';
import SettingImg from '../../../assets/icon/Settings.svg';
import firebase from '../../../config/firebase/config';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../components/atom/Loader';

const Profile = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');
  const [specificData, setSpecificData] = useState({});

  // const updateStatus = () => {
  //   const uid = firebase.auth().currentUser.uid;
  //   const ref = firebase.database().ref(`/users/${uid}`);
  //   ref.update({
  //     uid,
  //     status: 'Online',
  //     date: new Date().getTime(),
  //   });
  // };

  const updateStatus = () => {
    setLoading(true);
    const uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`users/${uid}`)
      .update({
        uid,
        status: 'Online',
        date: new Date().getTime(),
      })
      .then(() => setLoading(false));
  };

  const getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    await firebase.database().ref(`users/${uid}`).on()(
      'value',
      (dataSnapshot) => {
        if (dataSnapshot.val() === null) {
          navigation.navigate('Edit');
        } else {
          setName(
            dataSnapshot.val() !== null ? dataSnapshot.val().username : '',
          );
          setEmail(dataSnapshot.val() !== null ? dataSnapshot.val().email : '');
          setStatus(
            dataSnapshot.val() !== null ? dataSnapshot.val().status : '',
          );
          setDob(
            dataSnapshot.val() !== null ? dataSnapshot.val().dateOfBirth : '',
          );
        }
      },
    );
  };

  const signOut = async () => {
    const uid = firebase.auth().currentUser.uid;

    await firebase.database().ref(`users/${uid}`).update({status: 'Offline'});
    await firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate('Login'));
  };

  const getData = async () => {
    setLoading(true);
    const uid = firebase.auth().currentUser.uid;
    const user = firebase.database().ref(`users/${uid}`);
    user.on('value', (snapshot) => {
      if (snapshot.val() === null) {
        navigation.navigate('Edit');
      }
      setSpecificData(snapshot.val());
      setName(snapshot.val() !== null ? snapshot.val().username : '');
      setEmail(snapshot.val() !== null ? snapshot.val().email : '');
      setStatus(snapshot.val() !== null ? snapshot.val().status : '');
      setDob(snapshot.val() !== null ? snapshot.val().dateOfBirth : '');
      setLoading(false);
    });
  };

  const handleSignOut = async () => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${uid}`).update({status: 'Offline'});
    firebase.auth().signOut();
    navigation.navigate('Login');
  };

  useEffect(() => {
    getData();
    // getUser();
    updateStatus();
  }, []);

  return (
    <>
      {loading ? (
        <Loader animating={loading} />
      ) : (
        <>
          <View style={{flexDirection: 'row', paddingLeft: 15}}>
            <Image source={picture} style={styles.imgStyle} />
            <View style={styles.profileWrapper}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{name}</Text>
              <Text>{email}</Text>
              <Text>{dob}</Text>
              <Text>{status}</Text>
            </View>
          </View>
          <View
            style={{paddingLeft: 15, paddingTop: 34, backgroundColor: 'pink'}}>
            <Text style={{fontSize: 19, fontWeight: 'bold'}}>Account</Text>
            <Text>Location</Text>
          </View>
          <View>
            <SettingImg width={25} height={25} />
          </View>
          <Button title="Try" onPress={() => console.log(name)} />
          <View />
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
                borderWidth: 1,
                borderColor: 'lightblue',
                backgroundColor: 'blue',
                borderRadius: 9,
                marginHorizontal: 70,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 10,
                  color: 'white',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imgStyle: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderWidth: 1,
    borderColor: 'black',
  },
  profileWrapper: {
    backgroundColor: '#12b3cc',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
