import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, TextInput, View, Image, Button} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const route = useRoute();

  const {
    receiver,
    name,
    photo,
    status,
    senderID,
    senderName,
    senderPhoto,
  } = route.params;

  const imgName = route.params.name;

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    messages: [],
    receiver: receiver,
    receiverDetail: [],
  });

  // GiftedChat

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

  const handleReceiver = () => {
    database()
      .ref('users')
      .orderByChild('uid')
      .equalTo(state.receiver)
      .on('value', (snapshot) => {
        setState({
          ...state,
          receiverDetail: snapshot.val(),
        });
        const initData = [];
        Object.keys(snapshot.val()).map((key) => {
          initData.push({
            data: snapshot.val()[key],
          });
        });
        setState({
          ...state,
          receiverDetail: initData[0].data,
        });
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
  // const [messages, setMessages] = useState([]);

  // const onSend = (messages) => {
  //   const ref = database().ref(`/chat/${userId}/${id}`);
  //   ref.push({
  //     messages: {
  //       _id: Math.floor(Math.random() * 10000000000000) + 1,
  //       text: messages[0].text,
  //       createdAt: database.ServerValue.TIMESTAMP,
  //       user: user,
  //     },
  //   });
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // };

  const fetchMsgs = async () => {
    try {
      let msgs = [];
      const uid = await AsyncStorage.getItem('uid');
      const ref = database().ref('chat').child(id).child(uid);
      const ref2 = database().ref('chat').child(uid).child(id);
      ref.on('child_added', async (dataSnapshot) => {
        msgs.push(dataSnapshot.val().messages);
      });
      ref2.on('child_added', async (dataSnapshot) => {
        msgs.push(dataSnapshot.val().messages);
        console.log('bagong', dataSnapshot.val().messages);
      });
      msgs.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return 1;
        } else if (a.createdAt > b.createdAt) {
          return -1;
        }
        return 0;
      });
      setMessages(msgs);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getChat();
    handleReceiver();

    // fetchMsgs();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <MaterialCommunityIcon
          name="chevron-left"
          style={{color: '#d5f7f6'}}
          size={60}
        />
        {photo ? (
          <Image style={styles.imgHeader} source={{uri: photo}} />
        ) : (
          <View style={styles.textImg}>
            <Text style={{color: 'white'}}>{imgName.split(' ', 1)}</Text>
          </View>
        )}

        <View>
          <Text style={{color: '#d5f7f6', fontSize: 20, fontWeight: 'bold'}}>
            {name}
          </Text>
          <Text style={{color: '#d5f7f6'}}>{status}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={state.messages}
          onSend={(messages) => onSend(messages)}
          user={user}
          scrollToBottom
        />
        <Button
          title="Try"
          onPress={() => console.log('messages: ', state.messages)}
        />
      </View>
      {/* <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          placeholder="Type here..."
          onChangeText={(text) => handleOnChange(text)}
        />
        <View style={styles.btnWrapper}>
          <MaterialCommunityIcon
            name="send-circle"
            style={{color: '#7E98DF'}}
            size={45}
            onPress={() => console.log('Sending')}
          />
        </View>
      </View> */}
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
    // paddingHorizontal: 5,
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
