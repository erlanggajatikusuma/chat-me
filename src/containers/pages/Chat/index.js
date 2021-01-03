import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = () => {
  const route = useRoute();

  return (
    <View>
      <Text>Chat</Text>
      <Text>{route.params.name}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          numberOfLines={10}
          placeholder="Type here..."
        />
        <MaterialCommunityIcon name="send-circle" size={25} />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  inputText: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: '70%',
  },
});
