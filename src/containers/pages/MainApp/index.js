import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ChatThumb from '../../../components/molecules/ChatThumb';
import SearchBar from '../../../components/molecules/SearchBar';
import Navbar from '../../organisms/Navbar';

const MainApp = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getData();
  });

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUser(json);
      });
  };
  return (
    <View style={{backgroundColor: 'pink', flex: 1}}>
      <SearchBar />
      <Navbar />
      {users.map((user) => {
        return <ChatThumb key={user.id} name={user.name} />;
      })}
    </View>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
