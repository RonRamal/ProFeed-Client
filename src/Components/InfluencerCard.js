import React, { Component } from 'react';
import {  Body, Text ,Card ,CardItem,Left,Right, Button, Icon} from 'native-base';
import { ActivityIndicator} from 'react-native';

import { StyleSheet,Image,View } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsersSlash,faUserCheck,faUserCircle,faBookmark} from '@fortawesome/free-solid-svg-icons'

const influencerCard = (props) =>{
   
    const {InfluencerItem,SaveInfluencerEvent,navigation,UserLoading,SavedUserScreenName} = props;
    return (
        <Card style={styles.CardStyle}>
            <CardItem  style={styles.CardUpperItem} button onPress={() => navigation.navigate('Influencer',{SelectedInf:InfluencerItem})}>
                   {InfluencerItem.Name ? (<Image source={{uri: InfluencerItem.Image}}  style={{width: 90, height: 90,marginRight:15,borderRadius:25}} />) : (<View/>)}
                <View style={{width:'73%'}}>
                   <Text style={styles.Text}><FontAwesomeIcon style={{color:'white'}} size={15} icon={faUserCircle} /> {InfluencerItem.Name}</Text>
                   <Text style={styles.Text}>{InfluencerItem.ScreenName}</Text> 
                   {InfluencerItem.Profetional ? (<Text style={styles.Text}><FontAwesomeIcon style={{color:'white'}} size={21} icon={faUserCheck} /> Recomended!</Text>) : (<FontAwesomeIcon style={{color:'white'}} size={21} icon={faUsersSlash} />)}
                </View>         
            </CardItem>

            <CardItem style={styles.CardBottomItem}>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',}}>
                 {InfluencerItem.IsVerified ? (<Text>IsVerified! <FontAwesomeIcon style={{color:'black'}} size={15} icon={faCheckCircle} /></Text>) : (<Text>Not Verified!</Text>)}
                 <Text>Followers:{InfluencerItem.Followers}</Text>
                 { (UserLoading && SavedUserScreenName==InfluencerItem.ScreenName)  ? (<ActivityIndicator size={15} color="#1DA1F2" />)
                 :
                 (<Button style={styles.SaveButton} onPress={() =>SaveInfluencerEvent(InfluencerItem)}><FontAwesomeIcon style={{color:'white'}} size={15} icon={faBookmark} /></Button>)
                 }
               </View>     
            </CardItem>
        </Card>     
  );
}
export default influencerCard;

const styles = StyleSheet.create({
  CardStyle: {
    borderRadius:20,
    marginLeft:10,
    marginRight:10,
    marginTop:15,
    backgroundColor:'white',
  },
  CardUpperItem:{
    borderRadius:20,
    backgroundColor:'#1DA1F2',
  },
  CardBottomItem:{
    borderRadius:20,
    borderColor:'#1DA1F2',
    borderBottomWidth:3,
  },
  CardFavorites:{
    borderRadius:20,
    borderColor:'#1DA1F2',
    borderBottomWidth:3,
  },
  Text:{
    color:'white',
    marginBottom:5,
    fontSize:18,
  },
  SaveButton:{
   width:27,
   height:27,
   alignContent:'center',
   justifyContent: 'center',
   backgroundColor:'#1DA1F2'
  },
});