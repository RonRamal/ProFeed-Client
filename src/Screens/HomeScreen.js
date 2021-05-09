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


function HomeScreen({ navigation })  {
  
  /*let currentUserUID = firebase.auth().currentUser.uid;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileUrl,setProfileUrl] = useState('');  
  const [userID, setUserID] = useState('');


  //Replace ComponentDidMount and ComponentDidUpdate
  useEffect(() => {

      async function getUserInfo(){
      
        let user = await firebase.auth().currentUser;
         if(user != null)
         {      
            let UserProviderName = '';

              user.providerData.forEach((userInfo) => {
                console.log('User info for provider: ', userInfo);
              UserProviderName=userInfo.providerId;

            });
            if(UserProviderName==='facebook.com'){             
                setFirstName(user.displayName);
                setEmail(user.email);
                setProfileUrl(user.photoURL);
                UpdateID();
            }else
            {
                let doc = await firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .get();

                if (!doc.exists){
                  alert("UserNotSigned");
                } else {
                  let dataObj = doc.data();                
                  setLastName(dataObj.lastName);
                  setFirstName(dataObj.firstName);
                  setEmail(dataObj.email);
                  UpdateID();
                }    
            }                      
         }         
      }
    getUserInfo();
  })


  const UpdateID=()=>{

    fetch(`http://10.0.0.1:53382/api/ListUser?email=`+email, {
      method: 'GET',
    // body: JSON.stringify(UserDetails),
      headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
      Accept: 'application/json; charset=UTF-8',
      })
    })
      .then((res) => {
        console.log('res=', JSON.stringify(res));
        return res.json();
      })
      .then(
      (result) => {
        console.log("fetch GetUserIDByEmail= ", result);
        setUserID(result);
      },
      (error) => {
        console.log("err post=", error);
      });   
      
  }
*/

  const handlePress = () => {
    loggingOut();
    navigation.replace('Login');
  };
  return ( 
    <Container>
      <ImageBackground  source={require('../../assets/HomeScreenPro.png')} style={styles.background} >
  
          <View style={styles.headerButtons_View}>
              <Button style={styles.LogOutButton} onPress={handlePress} rounded danger >
                <Icon name="md-exit-outline" />
                <Text style={{paddingLeft:1}}>LogOut</Text>
              </Button>    
          </View>   
          <View styles={styles.header_View}> 
              <Text style={styles.UserText}>Welcome to ProFeed V1,We are excited to share with you our amazing app.</Text>
              <Text style={styles.UserText}>Which could redefine the marketing industry.</Text>
          </View> 
          <View style={styles.searchButtons_View} >
              <Button style={styles.searchBtnQuery_Button} onPress={() => navigation.navigate('Search')} large rounded success>
                <Text uppercase={false} style={{color:'black',fontWeight:'bold'}}>Query Search <FontAwesomeIcon style={{color:'black'}} size={25} icon={faBuilding} /></Text>
              </Button>          
              <Button style={styles.searchBtnCustom_Button} onPress={() => navigation.navigate('CustomSearch')} large rounded warning>
                <Text uppercase={false} style={{color:'black',fontWeight:'bold'}}>Advanced Search <FontAwesomeIcon style={{color:'black'}} size={25} icon={faCogs} /> </Text>
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
   paddingTop:80,

  },
  header_View:{
    marginBottom:50,
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
    width:120,
  },
});

export default HomeScreen;
