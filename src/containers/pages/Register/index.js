import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../config/firebase/config';
import Loader from '../../../components/atom/Loader';

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setTimeout(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => navigation.navigate('Profile'))
        .catch((error) => setErrorMessage(error));
    }, 2000);
    setLoading(true);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('uid', value);
      console.log('Set storage succes');
    } catch (e) {
      console.log(e);
    }
  };

  const insertUser = async (uuid, Name, Email) => {
    try {
      return await firebase
        .database()
        .ref('users/' + uuid)
        .set({
          name: Name,
          email: Email,
          uid: uuid,
          gender: '',
          phone: '',
          photo: '',
          status: '',
          dateOfBirth: '',
          date: '',
        });
    } catch (error) {
      return error;
    }
  };

  const signUp = async () => {
    setLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        storeData(uid);
        insertUser(uid, name, email);
        setLoading(false);
        navigation.navigate('Profile');
      })
      .catch((error) => setErrorMessage(error));
  };

  return (
    <View style={{paddingHorizontal: 15, backgroundColor: ' #E5E5E5'}}>
      {loading ? (
        <Loader animating={loading} />
      ) : (
        <ScrollView>
          <View style={{paddingTop: 75, paddingBottom: 35}}>
            <Text style={styles.registerText}>Register</Text>
          </View>
          <Text>Let's create your account!</Text>
          {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
          <View style={{paddingTop: 30}}>
            <Text style={{color: '#848484'}}>Name</Text>
            <TextInput
              onChangeText={(text) => setName(text)}
              value={name}
              autoCapitalize="none"
              style={styles.inputText}
            />
          </View>
          <View style={{paddingTop: 30}}>
            <Text style={{color: '#848484'}}>Email Address</Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              autoCapitalize="none"
              style={styles.inputText}
            />
          </View>
          <View style={{paddingTop: 30, paddingBottom: 30}}>
            <Text style={{color: '#848484'}}>Password</Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              style={styles.inputText}
            />
          </View>

          <TouchableOpacity onPress={signUp} style={styles.registerBtn}>
            <Text style={styles.registerTextBtn}>REGISTER</Text>
          </TouchableOpacity>
          <View style={styles.haveAccount}>
            <Text style={{color: '#313131', paddingRight: 5, fontSize: 14}}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#7E98DF', fontSize: 14}}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  registerText: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: '#7E98DF',
  },
  inputText: {
    borderRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#232323',
  },
  registerBtn: {
    backgroundColor: '#7E98DF',
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderRadius: 70,
  },
  registerTextBtn: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  haveAccount: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 35,
    paddingBottom: 35,
  },
});
