import React, { Component } from 'react';
import { Text,Left,Right,Card,Item,CardItem,Icon,Button,Col} from 'native-base';
import { StyleSheet,View ,Image} from 'react-native';

const CategoryBtnV2 = (props) =>{
    const {ButtonName,ClickEvent} = props;

    return (
       <Button style={styles.ButtonStyle} rounded onPress={()=>ClickEvent(ButtonName)}>
        <Text  uppercase={false} style={styles.TextStyle}>{ButtonName}</Text>
       </Button>
  
    );
}
export default CategoryBtnV2;

const styles = StyleSheet.create({
 
  ButtonStyle:{
    alignItems:'center',
    justifyContent:'center',
    width:'30%',
    marginRight: 5,
    marginBottom:10,
    backgroundColor:'white',    
    borderWidth:1,
    borderColor:'#1DA1F2'
  },
  TextStyle:{
    fontSize:13,
    color:'#1DA1F2',
    fontWeight:'bold'
  },
});