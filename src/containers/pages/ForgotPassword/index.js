import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../components/atom/Loader';

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleForgot = () => {
    setTimeout(() => {
      const auth = firebase.auth();
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          navigation.navigate('Login');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }, 2000);
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
              Forgot Password
            </Text>
          </View>
          <Text>You'll get messages soon on your e-mail</Text>
          {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
          <View style={{paddingTop: 30}}>
            <Text style={{color: '#848484'}}>Email</Text>
            <TextInput
              onChangeText={(email) => setEmail(email)}
              value={email}
              // onChangeText={(text) => handleOnChange('email', text)}
              style={{
                borderRadius: 3,
                borderBottomWidth: 1,
                borderBottomColor: '#232323',
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => handleForgot()}
            style={{
              backgroundColor: '#7E98DF',
              paddingHorizontal: 12,
              paddingVertical: 15,
              borderRadius: 70,
              marginTop: 35,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#FFF',
              }}>
              SEND
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
