import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
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

  useEffect(() => {
    getChat();
    // handleReceiver();
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
