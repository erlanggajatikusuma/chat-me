import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, CardItem} from 'native-base';

const ChatBox = ({userId, msg, img}) => {
  const [uid, setUid] = useState('');

  let isCurrentUser = userId === uid ? true : false;
  const getAsyncStorage = async () => {
    try {
      const response = await AsyncStorage.getItem('uid');
      return setUid(response);
    } catch (e) {
      console.log(e);
    }
    console.log('Get Uid Done.');
  };

  useEffect(() => {
    getAsyncStorage();
  }, []);

  return (
    <Card
      transparent
      style={{alignSelf: isCurrentUser ? 'flex-end' : 'flex-start'}}>
      <View
        style={[
          styles.cardWrapper,
          isCurrentUser && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
            backgroundColor: 'grey',
          },
        ]}>
        {img ? (
          <CardItem cardBody>
            <TouchableOpacity onPress={() => console.log(Press)}>
              <Image
                source={{uri: img}}
                resizeMode="cover"
                style={{height: 200}}
              />
            </TouchableOpacity>
          </CardItem>
        ) : (
          <Text style={[styles.chatTxt, isCurrentUser && {color: '#FFF'}]}>
            {msg}
          </Text>
        )}
      </View>
    </Card>
  );
};

export default ChatBox;

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
  },
  chatTxt: {
    color: 'black',
    fontSize: 18,
    marginVertical: 5,
    fontWeight: '500',
    padding: 8,
  },
});
