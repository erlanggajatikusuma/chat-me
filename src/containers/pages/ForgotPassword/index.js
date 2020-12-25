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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleForgot = () => {
    firebase.auth().ForgotPassword();
  };

  return (
    <View style={{paddingHorizontal: 15, backgroundColor: ' #E5E5E5'}}>
      <ScrollView>
        <Text>You'll get messages soon on your e-mail</Text>
        {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
        <View style={{paddingTop: 30}}>
          <Text style={{color: '#848484'}}>Email</Text>
          <TextInput
            onChangeText={(email) => setEmail(email)}
            value={email}
            // onChangeText={(text) => handleOnChange('email', text)}
            placeholder="Email"
            style={{
              borderRadius: 3,
              borderBottomWidth: 1,
              borderBottomColor: '#232323',
            }}
          />
        </View>

        <TouchableOpacity
          //   onPress={() => handleLogin()}
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
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
