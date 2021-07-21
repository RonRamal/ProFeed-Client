import React, {useState,useEffect} from 'react';
import { StyleSheet, View,ActivityIndicator, TextInput,Text,TouchableOpacity} from 'react-native';
import { getToken,storeToken } from '../../UserMethods/AsyncStorageService';
import { UserPutRequest } from '../../UserMethods/NodeJsService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

function MyProfile ({navigation}) {
 
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [UserName, setUserName] = useState('');
  const [Id, setId] = useState('');
  const [UpdateLoading, setUpdateLoading] = useState(false);
  const [UserBusy, setUserBusy] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  const emptyStates = () =>{
    setEmail('');
    setFirstName('');
    setLastName('');
    setUserName('');
    setId('');
    setUserBusy(false);
  }

  
  const fillStatesWithNewData = (iUpdatedData) =>{
    setEmail(iUpdatedData.Email);
    setFirstName(iUpdatedData.FirstName);
    setLastName(iUpdatedData.LastName);
    setUserName(iUpdatedData.UserName);
  }

  useEffect(() => {
    async function updateUserData(){    
      let aUserData = await getToken();
      if(aUserData){
        console.log("MyProfile Data " + JSON.stringify(aUserData));
        setFirstName(aUserData.FirstName);
        setLastName(aUserData.LastName);
        setEmail(aUserData.Email);
        setUserName(aUserData.UserName);
        setId(aUserData.Id);
      }else{
        emptyStates();
      }
    }
    if(!userDataLoaded){
      updateUserData();
      setUserDataLoaded(true);
    }
    if(UserBusy){
      setUpdateLoading(true);
    }else{
      setUpdateLoading(false);
    }
  });

   


  async function PostUserData_eventHandler(){    
    console.log("PostUserData_eventHandler Pressed");
    setUserBusy(true);
    if (!FirstName) {
      alert('First name is required');  
      setUserBusy(false);
      return;    
    } else if (!LastName) {
      alert('LastName field is required.');
      setUserBusy(false);
      return;
    } else if (!UserName) {
      alert('userName field is required.');
      setUserBusy(false);
      return;
    } else if (!Email) {
      alert('Email field is required.');
      setUserBusy(false);
      return;
    }else{
      
      let UserUpdatedData = {
        FirstName:FirstName,
        LastName:LastName,
        UserName:UserName,
        Email:Email,
        Id:Id
      }
      let putRes = await UserPutRequest(FirstName,LastName,UserName,Email);
      console.log("UserPutRequest putRest: " +  JSON.stringify(putRes));
      if(putRes){
        alert("User Updated Successfully");
        setUserBusy(false);
        storeToken(UserUpdatedData);
        setUserDataLoaded(false);
      }
    
      fillStatesWithNewData(UserUpdatedData);
  }
  }
  return (
  <View style={styles.container}>
        <Text style={styles.MainLogo}>
        <FontAwesomeIcon style={{color:'white',marginLeft:10}} size={45} icon={faUser} />
             My Profile
        </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="white"
            value={Email}
            onChangeText={(Email) => setEmail(Email)}
            autoCapitalize="none"/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="UserName..." 
            placeholderTextColor="white"
            value={UserName}
            onChangeText={(UserName) => setUserName(UserName)}
            autoCapitalize="none"/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="FirstName..." 
            placeholderTextColor="white"
            value={FirstName}
            onChangeText={(FirstName) => setFirstName(FirstName)}
            autoCapitalize="none"/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="LastName..." 
            placeholderTextColor="white"
            value={LastName}
            onChangeText={(LastName) => setLastName(LastName)}
            autoCapitalize="none"/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={PostUserData_eventHandler}>
        {UpdateLoading ? (<ActivityIndicator size='large' color="#1DA1F2" />):(<Text style={styles.LoginText}>Update Details</Text>)}
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
    marginBottom:70,
    alignSelf:'center',
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
    marginBottom:30,
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
    backgroundColor:"#3b5998",
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
    color:"white",
    fontSize:18
  },
  LoginText:{
    color:"#1DA1F2",
    fontSize:18,
    fontWeight:'bold'
  }
});
export default MyProfile;
