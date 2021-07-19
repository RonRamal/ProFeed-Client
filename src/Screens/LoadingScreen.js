import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import {getToken, storeToken} from '../../UserMethods/AsyncStorageService';

export default function LoadingScreen({ navigation }) {

  useEffect( () => { 
    getToken().then((aUser) => {
      console.log("Loading Screen Current User - GetTokenCalled - " + JSON.stringify(aUser));
      if (aUser) {
        console.log("User is logged in");
        navigation.replace('Home');
      } else {
        console.log("User is not logged in");
        navigation.replace('Login');
      }
    })
  });


  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color="#0000ff" />
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
 
  
});