import React, { useEffect, useState  } from 'react';
import { Container,Content, Button,Text,Icon} from 'native-base';
import { StyleSheet, ImageBackground,Alert,View,Image } from 'react-native';
import { Col,Row, Grid } from 'react-native-easy-grid';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {loggingOut} from '../../API/firebaseMethods';
import {GetUserIDByEmail} from '../../UserMethods/UserAPI';
import {faCogs} from '@fortawesome/free-solid-svg-icons'
import {faBuilding} from '@fortawesome/free-solid-svg-icons'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

import {getToken,storeToken, loggingOutDeleteToken} from '../../UserMethods/AsyncStorageService';




function HomeScreen({ navigation })  {
  
 //let currentUserUID = firebase.auth().currentUser.uid;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [UserID, setUserID] = useState('');


  // useEffect(() => {
  //     async function getUserInfo(){
  //        let user = await firebase.auth().currentUser;
  //        if(user != null)
  //        {      
  //           let UserProviderName = '';
  //             user.providerData.forEach((userInfo) => {
  //             console.log('User info for provider: ', userInfo);
  //             UserProviderName=userInfo.providerId;
  //           });
  //           if(UserProviderName==='facebook.com'){             
  //               setFirstName(user.displayName);
  //               setEmail(user.email);
  //               setProfileUrl(user.photoURL);
  //               UpdateID();
  //           }else
  //           {
  //               let doc = await firebase
  //               .firestore()
  //               .collection('users')
  //               .doc(user.uid)
  //               .get();
  //               if (!doc.exists){
  //                 alert("UserNotSigned");
  //               } else {
  //                 let dataObj = doc.data();                
  //                 setLastName(dataObj.lastName);
  //                 setFirstName(dataObj.firstName);
  //                 setEmail(dataObj.email);
  //                 UpdateID();
  //               }    
  //           }                      
  //        }         
  //     }
  //   getUserInfo();
  // })

    useEffect(()=>{
      async function updateUserData(){    
        let aUserData = await getToken();
        setFirstName(aUserData.FirstName);
        setLastName(aUserData.LastName);
      }
      updateUserData();
    });
      

  async function LogoutBTN_eventHandler(){
    await loggingOutDeleteToken();
    navigation.replace('Loading');
  };


  return ( 
    <Container>
      <ImageBackground  source={require('../../assets/HomeScreenPro.png')} style={styles.background} >
  
          <View style={styles.headerButtons_View}>
              <Button style={styles.LogOutButton} onPress={LogoutBTN_eventHandler} rounded >
              <FontAwesomeIcon style={{color:'#1DA1F2',marginLeft:10}} size={25} icon={faSignOutAlt} />
                <Text style={{paddingLeft:10,marginLeft:5,fontWeight:'bold',color:'#1DA1F2'}}>LogOut</Text>
              </Button>    
              <Button style={styles.ProfileButton} onPress={() => navigation.navigate('Profile')} rounded >
                <FontAwesomeIcon style={{color:'#1DA1F2',marginLeft:10}} size={25} icon={faUser} />
                <Text style={{paddingLeft:10,marginLeft:5,fontWeight:'bold',color:'#1DA1F2'}}>Profile</Text>
              </Button>   
          </View>   
          <View styles={styles.header_View}> 
              <Text style={styles.FirstSentence}>Welcome to ProFeed!</Text>
              <Text style={styles.SecondSentence}>You can choose between two options to search for influencers.</Text>
              <Text style={styles.UserText}>Remember you could add each influencer you like to your favorites.</Text>

          </View> 
          <View style={styles.searchButtons_View} >
              <Button style={styles.searchBtnQuery_Button} onPress={() => navigation.navigate('Search')} large rounded success>
                <Text uppercase={false} style={{color:'black',fontWeight:'bold'}}>Query Search <FontAwesomeIcon style={{color:'black'}} size={25} icon={faBuilding} /></Text>
              </Button>          
              <Button style={styles.searchBtnCustom_Button} onPress={() => navigation.navigate('CustomSearch')} large rounded warning>
                <Text uppercase={false} style={{color:'black',fontWeight:'bold'}}>Advanced Search <FontAwesomeIcon style={{color:'black'}} size={25} icon={faCogs} /> </Text>
              </Button>     
              <Button style={styles.searchBtnCustom_Button} onPress={() => navigation.navigate('Favorites')} large rounded warning>
                <Text uppercase={false} style={{color:'black',fontWeight:'bold'}}>Favorites <FontAwesomeIcon style={{color:'black'}} size={25} icon={faHeart} /> </Text>
              </Button>      
          </View>      
          <View style={{marginTop:80}}>         
              <Text uppercase={false} style={{color:'black',alignSelf:'center',fontWeight:'bold'}}>ProFeed Inc, Ron | Gai | Orean</Text>
          </View>  
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  searchButtons_View:{
   justifyContent:'center',
   alignItems:'center',
   flexDirection:'column',
   marginTop:20,
   paddingTop:30,

  },
  header_View:{
    justifyContent:'center',
    alignItems:'center',
   },
   headerButtons_View:{
     marginTop:120,
     marginBottom:20,
     paddingLeft:10,
     flexDirection:'row',
   },
  searchBtnQuery_Button:{
    marginBottom:20,
    marginTop:20,
    alignSelf:'center',
    backgroundColor:'#FFFFFF'
  },
  searchBtnCustom_Button:{
    marginBottom:20,
    marginTop:20,
    alignSelf:'center',
    backgroundColor:'#FFFFFF'
  },
  UserText:{
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:10,
    alignSelf:'center',  
    color:'white',
    marginTop:20
  },
  FirstSentence:{
    fontSize:20,
    paddingLeft:10,
    color:'white',
    marginTop:5
  },
  SecondSentence:{
    fontSize:20,
    paddingLeft:10,
    color:'white',
    marginTop:10
  },
  Text:{
    fontWeight:"bold",
    fontSize:48,
    color:"#fb5b5a",
    marginBottom:20,
    alignSelf:'center',
    marginTop:40,
  },
  LogOutButton:{
    marginTop:20,
    marginLeft:10,
    width:120,
    backgroundColor:'#FFFFFF'
  },
  ProfileButton:{
    marginTop:20,
    marginLeft:80,
    width:120,
    backgroundColor:'#FFFFFF'
  }
});

export default HomeScreen;
