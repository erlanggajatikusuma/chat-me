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

// import {Store} from '../../../context/store';
// import {LOADING_START, LOADING_STOP} from '../../../context/actions/type';

const Login = () => {
  const navigation = useNavigation();
  // const globalState = useContext(Store);
  // const {dispatchLoaderAction} = globalState;

  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });
  // const {email, password} = formData;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoading = async () => {
    setTimeout(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setLoading(false);
        });
      console.log('handleLogin');
    });
    setLoading(true);
  };

  const handleLogin = () => {
    handleLoading();
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => navigation.navigate('Main'))
    //   .catch((error) => setErrorMessage(error.message));
    // console.log('handleLogin');
  };

  // const onLogin = () => {
  //   if (!email) {
  //     alert('Email is required');
  //   } else if (!password) {
  //     alert('Password is required');
  //   } else {
  //     alert(JSON.stringify(formData));
  //     dispatchLoaderAction({
  //       type: LOADING_START,
  //     });
  //     setTimeout(() => {
  //       dispatchLoaderAction({
  //         type: LOADING_STOP,
  //       });
  //     }, 2000);
  //   }
  // };

  // const handleOnChange = (name, value) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

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
              Login
            </Text>
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
              onChangeText={(password) => setPassword(password)}
              value={password}
              autoCapitalize="none"
              // onChangeText={(text) => handleOnChange('password', text)}
              secureTextEntry={true}
              style={{
                borderRadius: 3,
                borderBottomWidth: 1,
                borderBottomColor: '#232323',
              }}
            />
          </View>
          <View style={{paddingBottom: 20, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={{color: '#7E98DF', fontSize: 16}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            // onPress={() => onLogin()}
            onPress={() => handleLogin()}
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
              LOGIN
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

const styles = StyleSheet.create({});
