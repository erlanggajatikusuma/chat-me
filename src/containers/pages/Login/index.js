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
import firebase from 'firebase';
import Loader from '../../../components/atom/Loader';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoading = async () => {
    setTimeout(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setLoading(false);
        });
      console.log('handleLogin');
    }, 2000);
    setLoading(true);
  };

  const handleLogin = () => {
    handleLoading();
  };

  return (
    <View style={{paddingHorizontal: 15, backgroundColor: ' #E5E5E5'}}>
      {loading ? (
        <Loader animating={loading} />
      ) : (
        <ScrollView>
          <View style={{paddingTop: 75, paddingBottom: 35}}>
            <Text style={styles.textLogin}>Login</Text>
          </View>
          <Text>Hi, Welcome back!</Text>
          {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
          <View style={{paddingTop: 30}}>
            <Text style={{color: '#848484'}}>Email</Text>
            <TextInput
              onChangeText={(email) => setEmail(email)}
              value={email}
              autoCompleteType="email"
              autoCapitalize="none"
              style={styles.inputText}
            />
          </View>
          <View style={{paddingTop: 30, paddingBottom: 30}}>
            <Text style={{color: '#848484'}}>Password</Text>
            <TextInput
              onChangeText={(password) => setPassword(password)}
              value={password}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.inputText}
            />
          </View>
          <View style={{paddingBottom: 20, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={{color: '#7E98DF', fontSize: 16}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.noAccount}>
            <Text style={{color: '#313131', paddingRight: 5, fontSize: 14}}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: '#7E98DF', fontSize: 14}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textLogin: {
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
  loginBtn: {
    backgroundColor: '#7E98DF',
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderRadius: 70,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  noAccount: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 35,
    paddingBottom: 35,
  },
});
