import React, { useState,useEffect } from 'react';
import { StyleSheet, View,ActivityIndicator, TextInput,Text,TouchableOpacity, NativeModules} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {LoginRequestUserName} from '../../UserMethods/NodeJsService';
import {LoginRequestEmail} from '../../UserMethods/NodeJsService';
import { storeToken } from '../../UserMethods/AsyncStorageService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope,faLock,faSignInAlt } from '@fortawesome/free-solid-svg-icons'

function LoginScreen ({navigation}) {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setUserBusy(false);
  }

  useEffect(() => {
 
    if(userBusy){
      setLoginLoading(true);
    }else{
      setLoginLoading(false);
    }
  });

  async function LoginBtnPressed_eventHandler(){
    setUserBusy(true);
    if (!email ) {
      alert('Email field is required.');
      setUserBusy(false);
      return;
    }else if(!password){
      alert('Password field is required.');
      setUserBusy(false);
      return;
    }
    if(email){
        let aLoginResult = await LoginRequestEmail(email,password);
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
      let aLoginResult = await LoginRequestUserName(userName,password);
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
        <Text style={styles.SecondaryLogo}>Login <FontAwesomeIcon style={{color:'white',marginTop: 20,}} size={35} icon={faSignInAlt} /></Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="white"
            value={email}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"/>
             <FontAwesomeIcon style={{color:'white' ,marginTop: 10,marginLeft: 220,position:'absolute'}} size={30} icon={faEnvelope} />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="white"
            value={password}
            onChangeText={(password) => setPassword(password)}/>
            <FontAwesomeIcon style={{color:'white' ,marginTop: 10,marginLeft: 220,position:'absolute'}} size={30} icon={faLock} />

        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={LoginBtnPressed_eventHandler}>
        {LoginLoading ? (<ActivityIndicator size='large' color="#1DA1F2" />):(<Text style={styles.LoginText}>LOGIN</Text>)}
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.facebookBtn} onPress={btnFBLogin}>     
         <Text style={styles.FaceBookLoginText}> 
          <Ionicons name="md-logo-twitter" size={20}/> Login with Twitter
         </Text>
        </TouchableOpacity> */}
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
    alignSelf:'center',
  },
  SecondaryLogo:{
    fontWeight:"bold",
    fontSize:40,
    color:"white",
    marginBottom:30,
    marginTop: 120,
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    flexDirection:'row',
    paddingLeft: 30,
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
    marginTop:30,
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
