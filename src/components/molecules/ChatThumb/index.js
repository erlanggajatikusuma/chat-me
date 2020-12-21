import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import photo from '../../../assets/image/hachiman.jpg';

const ChatThumb = ({name}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{backgroundColor: 'green', paddingHorizontal: 10}}>
        <Image
          source={photo}
          style={{width: 60, height: 60, borderRadius: 60 / 2}}
        />
      </View>
      <View style={{backgroundColor: 'yellow', flex: 1, paddingLeft: 5}}>
        <Text>{name}</Text>
        <Text style={{backgroundColor: 'blue', flex: 1}}>Preview Chat</Text>
      </View>
    </View>
  );
};

export default ChatThumb;

const styles = StyleSheet.create({});
