import React, { useState }  from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView, RefreshControlBase} from 'react-native';
import { Content} from 'native-base';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {registration} from '../../API/firebaseMethods';
import {CheckIfUserExists, UserPostRequest} from '../../UserMethods/NodeJsService'

function SignUpScreen ({ navigation })  {

  const [firstName, setFirstName] = useState('Ron');
  const [lastName, setLastName] = useState('sdsd');
  const [userName, setUserName] = useState('sdasd');
  const [email, setEmail] = useState('RonRamal@outlook.com');
  const [password, setPassword] = useState('qwerty123');
  const [confirmPassword, setConfirmPassword] = useState('qwerty123');

  const emptyState = () => {
    setFirstName('Ron');
    setLastName('sdsd');
    setUserName('sdasd');
    setEmail('RonRamal@outlook.com');
    setPassword('qwerty123');
    setConfirmPassword('qwerty123');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required'); 
    } else if (!lastName) {
      Alert.alert('LastName field is required.');
    } else if (!userName) {
      Alert.alert('userName field is required.');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
     //registration(email,password,lastName,firstName);
      
      CheckIfUserExists(email).then((result) => {
        if (!result){
          UserPostRequest(firstName,lastName,userName,email,password);
        }else{
          alert('EMAIL ALREADY IN USE!');
        }
      });
      //navigation.navigate('Loading');
      emptyState();
    }
  };

  

 return (

  <View style={styles.container}>
   <Content style={{width:'100%',paddingLeft:10}}>

    <Text style={styles.logo}>Create an account</Text>

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
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SignIn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account?</Text>
        </TouchableOpacity>
        </Content>  
  </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    justifyContent: 'center',
    alignItems:'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:36,
    color:"#fb5b5a",
    marginBottom:40,
    paddingBottom: 40,
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
  inputText:{
    height:50,
    color:"white",
    fontSize:18
  },
  SignUpBtn:{
    width:200,
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:'center',
    justifyContent:"center",
    marginTop:40,
  },
  SignIn:{
    marginTop: 30,
  },
  loginText:{
    color:"white",
    fontSize:18
  },
});
export default SignUpScreen
