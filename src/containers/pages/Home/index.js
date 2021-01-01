import React from 'react';
import {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';
import ChatThumb from '../../../components/molecules/ChatThumb';
import SearchBar from '../../../components/molecules/SearchBar';
import Navbar from '../../organisms/Navbar';

const Home = () => {
  const navigation = useNavigation();

  const [currentUser, setCurrentUser] = useState({
    id: '',
    username: '',
    photo: '',
  });
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    getData();
  }, []);

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
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <SearchBar />
        <Navbar />
        {allUser.length > 0 ? (
          <>
            {allUser.map((allUs) => {
              return (
                <>
                  <ChatThumb
                    key={allUs.uid}
                    name={allUs.username}
                    img={allUs.photo}
                    status={allUs.status}
                    // toProfile={() => navigation.navigate('Display')}
                    toChat={() => navigation.navigate('Chats')}
                  />
                  {/* <Button
                    title="Try"
                    onPress={() => console.log(currentUser)}
                  /> */}
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
