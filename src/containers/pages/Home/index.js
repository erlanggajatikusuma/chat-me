import React from 'react';
import {useEffect, useState} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ChatThumb from '../../../components/molecules/ChatThumb';
import SearchBar from '../../../components/molecules/SearchBar';

const Home = ({navigation}) => {
  const userId = auth().currentUser.uid;

  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    photo: '',
  });

  const [allUser, setAllUser] = useState([]);

  const getData = async () => {
    const uuid = await AsyncStorage.getItem('uid');

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
      });
  };

  const toChat = async (allUs) => {
    const id = allUs.id;
    // const name = allUs.username;
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
      <ScrollView>
        <SearchBar />
        {allUser.length > 0 ? (
          <>
            {allUser.map((allUs) => {
              return (
                <ChatThumb
                  key={allUs.id}
                  name={allUs.name}
                  img={allUs.photo}
                  status={allUs.status}
                  // toProfile={() => navigation.navigate('Display')}
                  toChat={() => toChat(allUs)}
                />
              );
            })}
          </>
        ) : (
          <View>
            <Text>Empty</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
