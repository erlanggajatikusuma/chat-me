import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  Button,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GiftedChat} from 'react-native-gifted-chat';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const route = useRoute();

  const {id, name, photo, status, userId, username, userPhoto} = route.params;

  const imgName = route.params.name;

  const [friendUID, setFriendUID] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendUrl, setFriendUrl] = useState('');
  const [friendStatus, setFriendStatus] = useState('');

  const [loading, setLoading] = useState(false);

  const getFriendData = () => {
    const friendUid = route.params.id;
    const ref = firebase.database().ref(`/users/${friendUid}`);
    ref.on('value', (snapshot) => {
      setFriendName(snapshot.val().username);
      setFriendUrl(snapshot.val().photo);
      setFriendStatus(snapshot.val().status);
      // console.log('Friend: ', snapshot.val());
    });
  };

  const getCurrentUser = () => {
    const uuid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`users/${uuid}`);
    ref.on('value', (snapshot) => {
      setUserUid(snapshot.val().uid);
      setUserName(snapshot.val().username);
      setUserPhoto(snapshot.val().photo);
      // console.log('User: ', snapshot.val());
    });
  };

  const getChat = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${uid}/${friendUID}`);
    const ref2 = firebase.database().ref(`/chat/${friendUID}/${uid}`);

    // const uid = firebase.auth().currentUser.uid;
    // const ref = firebase.database().ref(`/chat/${uid}/${friendUID}`);
    // const ref2 = firebase.database().ref(`/chat/${friendUID}/${uid}`);
    // let data = [];
    // ref.on('child_added', async (snapshot) => {
    //   data.push(snapshot.val().messages);
    // });

    // ref2.on('child_added', async (snapshot) => {
    //   data.push(snapshot.val().messages);
    // });

    // data.sort((a, b) => {
    //   if (a.createdAt < b.createdAt) {
    //     return 1;
    //   } else if (a.createdAt > b.createdAt) {
    //     return -1;
    //   }
    //   return 0;
    // });
    // console.log('data message: ', data);
    // setMessages(data);
  };

  const allChat = async () => {
    try {
      let msgs = [];
      firebase
        .database()
        .ref('chat')
        .child(userId)
        .child(id)
        .on('child_added', async (dataSnapshot) => {
          msgs.push(dataSnapshot.val().messages);
        });

      firebase
        .database()
        .ref('chat')
        .child(id)
        .child(userId)
        .on('child_added', async (dataSnapshot) => {
          msgs.push(dataSnapshot.val().messages);
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
  // GiftedChat

  const user = {
    _id: userId,
    name: username,
    avatar: userPhoto,
  };

  const otherUser = {
    _id: id,
    name: name,
    avatar: photo,
  };

  const [messages, setMessages] = useState([]);
  const [state, setState] = useState({
    step: 0,
    isTyping: false,
  });

  const setIsTyping = () => {
    setState({
      ...state,
      isTyping: !state.isTyping,
    });
  };

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);

  // const onSend = useCallback((messages = []) => {
  //   const uid = firebase.auth().currentUser.uid;
  //   const ref = firebase.database().ref(`/chat/${userId}/${id}`);
  //   ref.push({
  //     messages: {
  //       _id: Math.floor(Math.random() * 10000000000000) + 1,
  //       text: messages[0].text,
  //       createdAt: firebase.database.ServerValue.TIMESTAMP,
  //       user: user,
  //     },
  //   });
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);

  const onSend = (messages) => {
    const ref = firebase.database().ref(`/chat/${userId}/${id}`);
    ref.push({
      messages: {
        _id: Math.floor(Math.random() * 10000000000000) + 1,
        text: messages[0].text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: user,
      },
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  };

  const fetchMsgs = async () => {
    try {
      let msgs = [];
      const uid = await AsyncStorage.getItem('uid');
      const ref = firebase.database().ref('chat').child(id).child(uid);
      const ref2 = firebase.database().ref('chat').child(uid).child(id);
      ref.on('child_added', async (dataSnapshot) => {
        msgs.push(dataSnapshot.val().messages);
      });
      ref2.on('child_added', async (dataSnapshot) => {
        msgs.push(dataSnapshot.val().messages);
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
    console.log('friend id param: ', route.params.id);
    console.log('user id params: ', route.params.userId);

    fetchMsgs();
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
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={user}
          scrollToBottom
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
      </View>
       */}
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
