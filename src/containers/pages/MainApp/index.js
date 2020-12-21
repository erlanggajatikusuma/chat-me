import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchBar from '../../../components/molecules/SearchBar';

const MainApp = () => {
  return (
    <View style={{backgroundColor: 'pink', flex: 1}}>
      <SearchBar />
      <Text>Main App</Text>
    </View>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
