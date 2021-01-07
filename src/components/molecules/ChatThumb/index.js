import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import photo from '../../../assets/image/hachiman.jpg';

const ChatThumb = ({name, toProfile, toChat, img, status}) => {
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
          {img ? (
            <Image
              source={{uri: img}}
              style={{width: 60, height: 60, borderRadius: 60 / 2}}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 60 / 2,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>{name.split(' ', 1)}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingLeft: 5}}>
        <TouchableOpacity onPress={toChat}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              paddingVertical: 5,
              color: '#9aedeb',
            }}>
            {name}
          </Text>
          <Text style={{flex: 1, alignItems: 'center', color: '#9aedeb'}}>
            {status}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatThumb;

const styles = StyleSheet.create({});
