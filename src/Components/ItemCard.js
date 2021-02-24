import React, { Component } from 'react';
import {  Body, Text ,Card ,CardItem,Left,Right, Button, Icon} from 'native-base';
import { StyleSheet,Image } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';


const ItemCard = (props) =>{
    const {Item,DeleteEvent,EditEvent} = props;

    return (
        <Card style={styles.card}>
            <CardItem bordered style={styles.cardItemView} >
              <Left>
                  <Text style={styles.HeaderText}>{Item.Name} |</Text>                
                  <Text style={styles.HeaderText}>x{Item.Quantity}</Text>                
              </Left>
              <Right style={{flexDirection:'row', justifyContent:'space-evenly',marginLeft:55}}>
                  <Button info style={styles.EditButton}  onPress={()=>EditEvent(Item.ItemID)}>
                    <Icon name="pencil-sharp" style={styles.EditIcon}   />
                  </Button> 
                    
                  <Button success style={styles.DeleteButton}  onPress={()=>DeleteEvent(Item)}>
                    <Icon name="ios-checkmark" style={styles.DoneIcon}  />
                  </Button>                
              </Right>
            </CardItem>
        </Card>     
  );
}
export default ItemCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical:2, 
    borderRadius:15,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#465881',

  },
  cardItemView:{
    borderRadius:15,
    backgroundColor:'#465881',

  },
  DeleteButton:{
    alignSelf: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0,
    height: 35,
    width: 40,
    justifyContent: "center",
  },
  EditButton:{
    alignSelf: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0,
    height: 35,
    width: 40,
    justifyContent: "center",
  },
  DoneIcon:{
    marginLeft: 0, 
    marginRight: 0,
    fontSize: 40,
    fontWeight:"400",
  },
  EditIcon:{
    marginLeft: 0, 
    marginRight: 0,
    fontSize: 30,
  },
  HeaderText:{
    fontSize:22,
    fontWeight:'bold',
    color:'white'
  },
  InfoText:{
    fontSize:18,
  }
});