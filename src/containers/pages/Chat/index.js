import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Chat = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    receiver,
    name,
    photo,
    status,
    senderID,
    senderName,
    senderPhoto,
  } = route.params;

  const [state, setState] = useState({
    messages: [],
    receiver: receiver,
    receiverDetail: [],
  });

  const user = {
    _id: senderID,
    name: senderName,
    avatar: senderPhoto,
  };

  const getChat = async () => {
    const uid = await AsyncStorage.getItem('uid');
    database()
      .ref(`chat/${uid}/${receiver}`)
      .on('child_added', async (snapshot) => {
        setState((previousMessages) => ({
          ...state,
          messages: GiftedChat.append(
            previousMessages.messages,
            snapshot.val(),
          ),
        }));
      });
  };

  const onSend = async (messages = []) => {
    const message = {
      _id: Math.random().toString(36).substring(2),
      text: messages[0].text,
      user: messages[0].user,
      createdAt: database.ServerValue.TIMESTAMP,
    };

    await database().ref(`chat/${senderID}/${receiver}`).push(message);
    await database().ref(`chat/${receiver}/${senderID}`).push(message);
  };

  useEffect(() => {
    let isMounted = true;
    getChat();
    return () => (isMounted = false);
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <MaterialCommunityIcon
            name="chevron-left"
            style={{color: '#d5f7f6'}}
            size={60}
          />
        </TouchableOpacity>
        {photo ? (
          <Image style={styles.imgHeader} source={{uri: photo}} />
        ) : null}

        <View>
          <Text style={{color: '#d5f7f6', fontSize: 20, fontWeight: 'bold'}}>
            {name}
          </Text>
          {status !== 'Online' ? (
            <View style={styles.body}>
              <View style={styles.dotOffline} />
              <Text style={{color: '#d5f7f6'}}>{status}</Text>
            </View>
          ) : (
            <View style={styles.body}>
              <View style={styles.dotOnline} />
              <Text style={{color: '#d5f7f6'}}>{status}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={state.messages}
          onSend={(messages) => onSend(messages)}
          user={user}
          scrollToBottom
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    backgroundColor: '#7E98DF',
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgHeader: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginRight: 20,
    marginLeft: -5,
  },
  textImg: {
    borderWidth: 1,
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginRight: 20,
    marginLeft: -5,
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
    height: 48,
    backgroundColor: '#9aedeb',
    fontSize: 17,
  },
  btnWrapper: {
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 48,
    justifyContent: 'flex-end',
    width: '20%',
    backgroundColor: '#9aedeb',
  },
  // status: {
  //   color: '#faf8f0',
  //   fontSize: 14,
  //   marginLeft: 5,
  // },
  dotOnline: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 5,
    alignSelf: 'center',
  },
  dotOffline: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
    alignSelf: 'center',
  },
  body: {
    flexDirection: 'row',
  },
});
