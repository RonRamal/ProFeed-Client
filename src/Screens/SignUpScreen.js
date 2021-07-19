import React, { useState,useEffect }  from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator ,StyleSheet} from 'react-native';
import { Content,Container} from 'native-base';
import { RotationGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import {CheckIfUserExists, UserPostRequest} from '../../UserMethods/NodeJsService';
import {getToken, storeToken} from '../../UserMethods/AsyncStorageService';

function SignUpScreen ({ navigation })  {

  const [firstName, setFirstName] = useState('Ron');
  const [lastName, setLastName] = useState('sdsd');
  const [userName, setUserName] = useState('sdasd');
  const [email, setEmail] = useState('RonRamal@outlook.com');
  const [password, setPassword] = useState('qwerty123');
  const [confirmPassword, setConfirmPassword] = useState('qwerty123');
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [UserBusy,setUserBusy] = useState(false);

  const emptyState = () => {
    setFirstName('Ron');
    setLastName('sdsd');
    setUserName('sdasd');
    setEmail('RonRamal@outlook.com');
    setPassword('qwerty123');
    setConfirmPassword('qwerty123');
  };


  useEffect(() => {
   // console.log("SignUpScreen - UseEffect Activated UserBusy " + UserBusy);
    if(UserBusy){
      setSignUpLoading(true);

    }else{
      setSignUpLoading(false);
    }
  });

 async function handlePress(){
    setUserBusy(true);

    if (!firstName) {
      Alert.alert('First name is required');  
      setUserBusy(true);
      return;    
    } else if (!lastName) {
      Alert.alert('LastName field is required.');
      setUserBusy(true);
      return;
    } else if (!userName) {
      Alert.alert('userName field is required.');
      setUserBusy(true);
      return;
    } else if (!email) {
      Alert.alert('Email field is required.');
      setUserBusy(true);
      return;
    } else if (!password) {
      Alert.alert('Password field is required.');
      setUserBusy(true);
      return;
    } else if (!confirmPassword) {
      setPassword('');
      setUserBusy(true);
      Alert.alert('Confirm password field is required.');
      return;
    } else if (password !== confirmPassword) {
      setConfirmPassword('');
      setUserBusy(true);
      Alert.alert('Password does not match!');
      return;
    } else {
     let checkRes = await CheckIfUserExists(email);
     console.log("UserPostRequest checkRes: " + JSON.stringify(checkRes));
        if (!checkRes)
        {
          let postRes = await UserPostRequest(firstName,lastName,userName,email,password);
          console.log("UserPostRequest postRest: " +  JSON.stringify(postRes));
          if(postRes){
            alert("Signed Up Successfully");
            setUserBusy(false);
            storeToken(postRes);
            navigation.navigate("Login");
          }
        }else{
          alert("Email is already in Use");
          setUserBusy(false);
        }
     emptyState();
  }
}
 return (
  <Container style={styles.container}>
    <Text style={styles.MainLogo}>SignUp</Text>
   <Content style={styles.content}>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="First Name..." 
            placeholderTextColor="#003f5c"
            value={firstName}
            onChangeText={(name) => setFirstName(name)}/>   
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Last Name..." 
            placeholderTextColor="#003f5c"
            value={lastName}
            onChangeText={(name) => setLastName(name)}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="UserName..." 
            placeholderTextColor="#003f5c"
            value={userName}
            onChangeText={(userName) => setUserName(userName)}
            autoCapitalize="none"/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={(email) => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry={true}
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            value={password}
            onChangeText={(password) => setPassword(password)}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry={true}
            style={styles.inputText}
            placeholder="Confirm Password..." 
            placeholderTextColor="#003f5c"
            value={confirmPassword}
            onChangeText={(password2) => setConfirmPassword(password2)}/>
        </View>
        
        <TouchableOpacity style={styles.SignUpBtn} onPress={handlePress}>
          {signUpLoading ? (<ActivityIndicator size='large' color="#1DA1F2" />) : (<Text style={styles.ButtonText}>Sign Up</Text>)}

        </TouchableOpacity>

        <TouchableOpacity style={styles.HaveAccount_btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.ButtonText}>Already have an account?</Text>
        </TouchableOpacity>
        </Content> 
 </Container>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1DA1F2',
    width:'100%'
  },
  content:{
    width:'100%',
    alignContent:'center',
  },
  MainLogo:{
    fontWeight:"bold",
    fontSize:36,
    color:"white",
    marginBottom:30,
    alignSelf:'center',
    marginTop:30
  },
  inputView:{
    width:'80%',
    backgroundColor:"white",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    alignItems:'center',
    alignSelf:'center',
    padding:20
  },
  inputText:{
    width:'100%',
    height:50,
    color:"black",
    fontWeight:'bold',
    fontSize:18
  },
  SignUpBtn:{
    width:'80%',
    backgroundColor:"white",
    borderRadius:25,
    height:50,
    alignItems:'center',
    justifyContent:"center",
    alignSelf:'center',
    marginTop:40,
    marginBottom:40
  },
  HaveAccount_btn:{
    width:'100%',
    alignItems:'center',
    justifyContent:"center"
  },
  ButtonText:{
    color:"black",
    fontSize:22,
    fontWeight:'bold',
  },
});

export default SignUpScreen;
