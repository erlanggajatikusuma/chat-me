import React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ChatThumb from '../../../components/molecules/ChatThumb';
import SearchBar from '../../../components/molecules/SearchBar';
import Navbar from '../../organisms/Navbar';

const Home = () => {
  const navigation = useNavigation();

  const [users, setUser] = useState([]);

  useEffect(() => {
    getData();
  });

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setUser(json);
      });
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <SearchBar />
        <Navbar />
        {users.length > 0 ? (
          <>
            {users.map((user) => {
              return (
                <ChatThumb
                  key={user.id}
                  name={user.name}
                  toProfile={() => navigation.navigate('Profil')}
                  // toProfile={() => navigation.navigate('Edit')}
                  toChat={() => navigation.navigate('Chats')}
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
