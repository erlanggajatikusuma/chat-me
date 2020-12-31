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
import firebase from '../../../config/firebase/config';
import Loader from '../../../components/atom/Loader';

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setTimeout(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => navigation.navigate('Profil'))
        .catch((error) => {
          setErrorMessage(error.message);
          setLoading(false);
        });
      console.log('handleSignUp');
    });
    setLoading(true);
  };

  return (
    <View style={{paddingHorizontal: 15, backgroundColor: ' #E5E5E5'}}>
      {loading ? (
        <Loader animating={loading} />
      ) : (
        <ScrollView>
          <View style={{paddingTop: 75, paddingBottom: 35}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                textAlign: 'center',
                color: '#7E98DF',
              }}>
              Register
            </Text>
          </View>
          <Text>Let's create your account!</Text>
          {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
          <View style={{paddingTop: 30}}>
            <Text style={{color: '#848484'}}>Email Address</Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              autoCapitalize="none"
              // onChangeText={(text) => handleOnChange('email', text)}
              style={{
                borderRadius: 3,
                borderBottomWidth: 1,
                borderBottomColor: '#232323',
              }}
            />
          </View>
          <View style={{paddingTop: 30, paddingBottom: 30}}>
            <Text style={{color: '#848484'}}>Password</Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              // onChangeText={(text) => handleOnChange('password', text)}
              style={{
                borderRadius: 3,
                borderBottomWidth: 1,
                borderBottomColor: '#232323',
              }}
            />
          </View>

          <TouchableOpacity
            //   onPress={() => navigation.navigate('Login')}
            onPress={() => handleSignUp()}
            style={{
              backgroundColor: '#7E98DF',
              paddingHorizontal: 12,
              paddingVertical: 15,
              borderRadius: 70,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#FFF',
              }}>
              REGISTER
            </Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 35,
              paddingBottom: 35,
            }}>
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

const styles = StyleSheet.create({});
