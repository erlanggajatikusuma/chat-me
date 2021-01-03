import React from 'react';
import {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import ChatThumb from '../../../components/molecules/ChatThumb';
import SearchBar from '../../../components/molecules/SearchBar';

const Home = ({navigation}) => {
  const updateStatus = () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/users/${uid}`);
    ref.update({
      uid,
      status: 'Online',
      date: new Date().getTime(),
    });
  };

  const [currentUser, setCurrentUser] = useState({
    id: '',
    username: '',
    photo: '',
  });
  const [allUser, setAllUser] = useState([]);

  const getData = () => {
    const uuid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref('users')
      .on('value', (dataSnapshot) => {
        let users = [];
        let current = {
          id: '',
          username: '',
          photo: '',
        };
        // console.log('Data user: ', dataSnapshot.val());
        dataSnapshot.forEach((data) => {
          if (uuid === data.val().uid) {
            current.id = uuid;
            current.username = data.val().username;
            current.photo = data.val().photo;
          } else {
            users.push({
              id: data.val().uid,
              username: data.val().username,
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
    const name = allUs.username;
    const photo = allUs.photo;
    const status = allUs.status;
    console.log(allUs);
    navigation.navigate('Chats', {
      name,
      photo,
      status,
    });
  };

  useEffect(() => {
    getData();
    updateStatus();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <SearchBar />
        {allUser.length > 0 ? (
          <>
            {allUser.map((allUs) => {
              return (
                <>
                  <ChatThumb
                    key={allUs.id}
                    name={allUs.username}
                    img={allUs.photo}
                    status={allUs.status}
                    // toProfile={() => navigation.navigate('Display')}
                    // toChat={() => navigation.navigate('Chats')}
                    toChat={() => toChat(allUs)}
                  />
                  {/* <Button title="Try" onPress={() => console.log(allUser)} /> */}
                </>
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
