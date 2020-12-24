import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';

// const Main = () => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(async () => {
//     await const user =  firebase.auth();
//     setCurrentUser(user);
//   });
//   return (
//     <View style={styles.container}>
//       <Text>Hi {currentUser && currentUser.email}!</Text>
//     </View>
//   );
// };

// export default Main;

export default class Main extends React.Component {
  state = {currentUser: null};
  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }
  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
