import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  const route = useRoute();

  //   const [msgValue, setMsgValue] = useState('');
  //   const [messages, setMessages] = useState('');
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <MaterialCommunityIcon
          name="arrow-left"
          style={{color: '#d5f7f6', marginRight: 10}}
          size={30}
        />
        <Image style={styles.imgHeader} source={{uri: route.params.photo}} />
        <View>
          <Text style={{color: '#d5f7f6', fontSize: 20, fontWeight: 'bold'}}>
            {route.params.name}
          </Text>
          <Text style={{color: '#d5f7f6'}}>{route.params.status}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        {/* <Text>Messages</Text> */}
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          placeholder="Type here..."
          //   onChangeText={(text) => handleOnChange(text)}
        />
        <View style={styles.btnWrapper}>
          <MaterialCommunityIcon
            name="send-circle"
            style={{color: '#7E98DF'}}
            size={45}
            onPress={() => console.log('Sending')}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#7E98DF',
    paddingHorizontal: 10,
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgHeader: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginRight: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
    height: 70,
  },
  inputText: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: '80%',
    backgroundColor: '#9aedeb',
    fontSize: 17,
  },
  btnWrapper: {
    // height: appStyle.fieldHeight,
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 48,
    justifyContent: 'flex-end',
    width: '20%',
    backgroundColor: '#9aedeb',
  },
});
