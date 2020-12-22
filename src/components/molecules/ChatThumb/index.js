import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import photo from '../../../assets/image/hachiman.jpg';

const ChatThumb = ({name, toProfile, toChat}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#3685d9',
        borderWidth: 1,
        borderColor: 'white',
        paddingTop: 10,
        paddingBottom: 3,
      }}>
      <View style={{paddingHorizontal: 10}}>
        <TouchableOpacity onPress={toProfile}>
          <Image
            source={photo}
            style={{width: 60, height: 60, borderRadius: 60 / 2}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingLeft: 5}}>
        <TouchableOpacity onPress={toChat}>
          <Text style={{fontWeight: 'bold', fontSize: 15, paddingVertical: 5}}>
            {name}
          </Text>
          <Text style={{flex: 1, alignItems: 'center'}}>Preview Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatThumb;

const styles = StyleSheet.create({});
