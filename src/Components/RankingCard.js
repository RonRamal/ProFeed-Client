import React, { Component } from 'react';
import { Text,Left,Right,Card,Item,CardItem,Icon,Button,Col} from 'native-base';
import { StyleSheet,View ,Image} from 'react-native';

const RankingButton = (props) =>{
    const {ButtonName,ClickEvent} = props;

    return (
       <Button style={styles.ButtonStyle} rounded onPress={()=>ClickEvent(ButtonName)}>
        <Text  uppercase={false} style={styles.TextStyle}>{ButtonName}</Text>
       </Button>
  
    );
}
export default RankingButton;

const styles = StyleSheet.create({
 
  ButtonStyle:{
    alignItems:'center',
    justifyContent:'center',
    width:'30%',
    marginRight: 5,
    marginBottom:10,
    backgroundColor:'#1DA1F2'
  },
  TextStyle:{
    fontSize:15,
    color:'white',
  },
});