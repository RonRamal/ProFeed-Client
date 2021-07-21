import React, { Component } from 'react';
import {  Body, Text ,Card ,CardItem,Left,Right, Button, Icon} from 'native-base';
import { ActivityIndicator} from 'react-native';

import { StyleSheet,Image,View } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsersSlash,faUserCheck,faUserCircle,faBookmark} from '@fortawesome/free-solid-svg-icons'

const SearchCard = (props) =>{
   
    const {SearchItem} = props;
    return (
        <Card style={styles.CardStyle}>
              <CardItem style={styles.CardBottomItem}>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',}}>
                 <Text style={{color:'#1DA1F2',fontWeight:'bold'}}>Main</Text>
                 <Text style={{color:'#1DA1F2',fontWeight:'600'}}>Base</Text>
                 <Text style={{color:'#1DA1F2',fontWeight:'100'}}>Sub</Text>
               </View>     
            </CardItem>
            <CardItem style={styles.CardBottomItem}>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly',}}>
                 <Text style={styles.SearchKeyText}>{SearchItem.firstCat},</Text>
                 <Text style={styles.SearchKeyText}>{SearchItem.secondCat},</Text>
                 <Text style={styles.SearchKeyText}>{SearchItem.thirdCat}</Text>
               </View>     
            </CardItem>
        </Card>  
        
    )}
export default SearchCard;

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
    marginBottom:5,
    fontSize:18,
  },
  SearchKeyText:{
    marginBottom:5,
    fontSize:17,
    fontWeight:'bold'
  },
  SaveButton:{
   width:27,
   height:27,
   alignContent:'center',
   justifyContent: 'center',
   backgroundColor:'#1DA1F2'
  },
});