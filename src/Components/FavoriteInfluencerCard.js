import React, { Component } from 'react';
import {  Body, Text ,Card ,CardItem,Left,Right, Button, Icon} from 'native-base';
import { ActivityIndicator} from 'react-native';

import { StyleSheet,Image,View } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsersSlash,faUserCheck,faUserCircle,faBookmark} from '@fortawesome/free-solid-svg-icons'

const FavoriteInfluencerCard = (props) =>{
   
    const {InfluencerItem} = props;
    return (
        <Card style={styles.CardStyle}>
            <CardItem  style={styles.CardUpperItem}>
                   {InfluencerItem.Name ? (<Image source={{uri: InfluencerItem.Image}}  style={{width: 90, height: 90,marginRight:15,borderRadius:25}} />) : (<View/>)}
                <View style={{width:'73%'}}>
                   <Text style={styles.TwitterText}><FontAwesomeIcon style={{color:'#1DA1F2'}} size={15} icon={faUserCircle} /> {InfluencerItem.Name}</Text>
                   <Text style={styles.TwitterText}>{InfluencerItem.ScreenName}</Text> 
                   {InfluencerItem.Profetional ? (<Text style={styles.TwitterText}><FontAwesomeIcon style={{color:'white'}} size={21} icon={faUserCheck} /> Recomended!</Text>) : (<FontAwesomeIcon style={{color:'#1DA1F2'}} size={21} icon={faUsersSlash} />)}
                </View>         
            </CardItem>

            <CardItem style={styles.CardBottomItem}>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',}}>
                 {InfluencerItem.IsVerified ? (<Text>IsVerified! <FontAwesomeIcon style={{color:'black'}} size={15} icon={faCheckCircle} /></Text>) : (<Text style={styles.TwitterText}>Not Verified!</Text>)}
                 <Text style={styles.TwitterText}>Followers:{InfluencerItem.Followers}</Text>
               </View>     
            </CardItem>
        </Card>     
  );
}
export default FavoriteInfluencerCard;

const styles = StyleSheet.create({
  CardStyle: {
    borderRadius:20,
    marginLeft:20,
    marginRight:20,
    marginTop:15,
    backgroundColor:'white',
  },
  CardUpperItem:{
    borderRadius:20,
    backgroundColor:'white',
    borderBottomWidth:3,
    borderColor:'#1DA1F2',

  },
  CardBottomItem:{
    borderRadius:20,
    borderColor:'#1DA1F2',
    borderBottomWidth:3,
  },
  Text:{
    color:'#1DA1F2',
    marginBottom:5,
    fontSize:18,
  },
  TwitterText:{
    color:'#1DA1F2',
    fontSize:18,
    fontWeight:'bold',

  }

});