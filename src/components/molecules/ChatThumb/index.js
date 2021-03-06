import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatThumb = ({name, toProfile, toChat, img, status}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        // backgroundColor: '#3685d9',
        paddingTop: 10,
        paddingBottom: 3,
      }}>
      <View style={{paddingHorizontal: 10}}>
        <TouchableOpacity onPress={toProfile}>
          {img ? (
            <Image
              source={{uri: img}}
              style={{width: 60, height: 60, borderRadius: 60 / 2}}
              resizeMode="cover"
            />
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingLeft: 5}}>
        <TouchableOpacity onPress={toChat}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              paddingVertical: 5,
              color: 'black',
              // color: '#9aedeb',
            }}>
            {name}
          </Text>
          <Text style={{flex: 1, alignItems: 'center', color: 'black'}}>
            {status}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatThumb;

const styles = StyleSheet.create({});
