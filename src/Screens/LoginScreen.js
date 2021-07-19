import React, { useState,useEffect } from 'react';
import * as Facebook from 'expo-facebook';
import { StyleSheet, View,ActivityIndicator, TextInput,Text,TouchableOpacity, NativeModules} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {LoginRequestUserName} from '../../UserMethods/NodeJsService';
import {LoginRequestEmail} from '../../UserMethods/NodeJsService';

import "firebase/firestore";
import firebase from "firebase";
import {PostUserToServerFacebook} from '../../UserMethods/UserAPI';
import {CheckIfUserExists} from '../../UserMethods/UserAPI';
import { storeToken } from '../../UserMethods/AsyncStorageService';


function LoginScreen ({navigation}) {
 
  const [email, setEmail] = useState('RonRamal@outlook.com');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('qwerty123');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [lblErr, setlblErr] = useState('');
  const [check ,setCheck] = useState(0);
  const [LoginLoading, setLoginLoading] = useState(false);
  const [userBusy, setUserBusy] = useState(false);
  const {RNTwitterSignin} = NativeModules;

  const API_KEYS={
     TWITTER_API_KEY:'8gJiTw1ohwk6EyfrKduvLJdII',
     TWITTER_API_SECRET:'UovMbaBiR2CFS30wn9MHCgJdh9sebdVEUab35koi1V8r7NqnNw'
  }


  const btnFBLogin = async() => {
    RNTwitterSignin.init(API_KEYS.TWITTER_API_KEY,API_KEYS.TWITTER_API_SECRET)
    RNTwitterSignin.logIn()
    .then(data =>{
      console.log(data);
    }).catch(error =>{
      console.log(error);
    });
  };

  const emptyStates = () =>{
    setEmail('');
    setUserName('');
    setPassword('');
    setUserBusy(false);
  }


  useEffect(() => {
    console.log("Login Screen - UseEffect Activated UserBusy " + userBusy);
    if(userBusy){
      setLoginLoading(true);
    }else{
      setLoginLoading(false);
    }
  });

  async function LoginBtnPressed_eventHandler(){

    setUserBusy(true);

    if (!email && !userName ) {
      alert('Email/UserName field is required.');
      setUserBusy(false);
      return;
    }else if(!password){
      alert('Password field is required.');
      setUserBusy(false);
      return;
    }
    if(email){
        console.log("LoginBtnPressed_eventHandler - email:" + email +",password:"+password);
        let aLoginResult = await LoginRequestEmail(email,password);
        //console.log("Login Screen -> LoginRequestEmail result : " + JSON.stringify(aLoginResult));

        if(!aLoginResult){
           alert("Email / Password Details are wrong");
           setUserBusy(false);
           return;
        }else{
          setUserBusy(false);
          let aLoggedInUserData = {
            Id:aLoginResult._id,
            FirstName:aLoginResult.mFirstName,
            LastName:aLoginResult.mLastName,
            UserName:aLoginResult.mUserName,
            Email:aLoginResult.mEmail,
            PhoneNumber:aLoginResult.mPhone
          }
          storeToken(aLoggedInUserData);
          navigation.navigate('Loading');
        }
    }else{
      console.log("LoginBtnPressed_eventHandler - userName:" + userName +",password:"+password);
      let aLoginResult = await LoginRequestUserName(userName,password);
      console.log("Login Screen -> LoginRequestUserName result : " + JSON.stringify(aLoginResult));

      if(!aLoginResult){
         alert("UserName / Password Details are wrong");
         setUserBusy(false);
         return;
      }else{
        setUserBusy(false);
        let aLoggedInUserData = {
          Id:aLoginResult._id,
          FirstName:aLoginResult.mFirstName,
          LastName:aLoginResult.mLastName,
          UserName:aLoginResult.mUserName,
          Email:aLoginResult.mEmail,
        }
        storeToken(aLoggedInUserData);
        navigation.navigate('Loading');
      }
    }
    emptyStates();
  };

 

    
  return (

  <View style={styles.container}>

        <Text style={styles.MainLogo}>
        <Ionicons name="md-logo-twitter" size={40}/> ProFeed
          </Text>
        <Text style={styles.SecondaryLogo}>Login</Text>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="white"
            value={email}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="UserName..." 
            placeholderTextColor="white"
            value={userName}
            onChangeText={(userName) => setUserName(userName)}
            autoCapitalize="none"/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="white"
            value={password}
            onChangeText={(password) => setPassword(password)}/>
        </View>

        {/* <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.loginBtn} onPress={LoginBtnPressed_eventHandler}>
        {LoginLoading ? (<ActivityIndicator size='large' color="#1DA1F2" />):(<Text style={styles.LoginText}>LOGIN</Text>)}
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookBtn} onPress={btnFBLogin}>     
         <Text style={styles.FaceBookLoginText}> 
          <Ionicons name="md-logo-twitter" size={20}/> Login with Twitter
         </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SignUpBtn} onPress={() =>navigation.navigate('Register')}  >
          <Text style={styles.SignUpText}>SignUp</Text>
        </TouchableOpacity>
        
  </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
  },
  MainLogo:{
    fontWeight:"bold",
    fontSize:50,
    color:"white",
    marginBottom:30,
    alignSelf:'center',
    marginTop: 40,
  },
  SecondaryLogo:{
    fontWeight:"bold",
    fontSize:35,
    color:"white",
    marginBottom:30,
    marginTop: 40,
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  Pic:{
    width:"60%",
    height:100,
    backgroundColor:"#465881",

  },
  inputText:{
    height:50,
    color:"white",
    fontSize:18
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"white",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
  },
  facebookBtn:{
    width:"80%",
    backgroundColor:"white",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
  },
  SignUpBtn:{
    width:"25%",
    backgroundColor:"white",
    borderRadius:10,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },
  SignUpText:{
    color:"#1DA1F2",
    fontSize:18,
    fontWeight:'bold'
  },
  FaceBookLoginText:{
    color:"#1DA1F2",
    fontSize:18,
    fontWeight:'bold',
  },
  LoginText:{
    color:"#1DA1F2",
    fontSize:18,
    fontWeight:'bold'
  }
});
export default LoginScreen;
