import React from 'react';
import {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import ChatThumb from '../../../components/molecules/ChatThumb';
import SearchBar from '../../../components/molecules/SearchBar';

const Home = ({navigation}) => {
  const userId = firebase.auth().currentUser.uid;

  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    photo: '',
  });

  const [allUser, setAllUser] = useState([]);

  const getData = async () => {
    // const uuid = firebase.auth().currentUser.uid;
    const uuid = await AsyncStorage.getItem('uid');
    firebase
      .database()
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
      id,
      name,
      photo,
      status,
      userId: userId,
      username: currentUser.name,
      userPhoto: currentUser.photo,
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
                  // toChat={() => navigation.navigate('Chats')}
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

const styles = StyleSheet.create({});
