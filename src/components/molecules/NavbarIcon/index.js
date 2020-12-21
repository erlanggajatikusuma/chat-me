import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const NavbarIcon = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#607699',
      }}>
      <ScrollView horizontal>
        <Text>Profile</Text>
        <Text>Chats</Text>
      </ScrollView>
    </View>
  );
};

export default NavbarIcon;

const styles = StyleSheet.create({});
