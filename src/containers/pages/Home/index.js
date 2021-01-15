import React from 'react';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ChatThumb from '../../../components/molecules/ChatThumb';

const Home = ({navigation}) => {
  const userId = auth().currentUser.uid;

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    photo: '',
  });

  const [allUser, setAllUser] = useState([]);

  const getData = async () => {
    const uuid = await AsyncStorage.getItem('uid');
    setLoading(true);
    database()
      .ref('users')
      .on('value', (dataSnapshot) => {
        let users = [];
        let current = {
          id: '',
          name: '',
          photo: '',
        };
        dataSnapshot.forEach((data) => {
          if (uuid === data.val().uid) {
            current.id = uuid;
            current.name = data.val().name;
            current.photo = data.val().photo;
          } else {
            users.push({
              id: data.val().uid,
              name: data.val().name,
              photo: data.val().photo,
              status: data.val().status,
            });
          }
        });
        setCurrentUser(current);
        setAllUser(users);
        setLoading(false);
      });
  };

  const toChat = async (allUs) => {
    const id = allUs.id;
    const name = allUs.name;
    const photo = allUs.photo;
    const status = allUs.status;
    navigation.navigate('Chatting', {
      receiver: id,
      // id,
      name,
      photo,
      status,
      senderID: userId,
      senderName: currentUser.name,
      senderPhoto: currentUser.photo,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={styles.wrapper}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#9aedeb'}}>
          ChatMe
        </Text>
      </View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size={50} color="blue" />
        ) : (
          <>
            {allUser.length > 0 ? (
              <>
                {allUser.map((allUs) => {
                  return (
                    <ChatThumb
                      key={allUs.id}
                      name={allUs.name}
                      img={allUs.photo}
                      status={allUs.status}
                      toChat={() => toChat(allUs)}
                    />
                  );
                })}
              </>
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0066ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
