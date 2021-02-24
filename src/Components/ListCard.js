import React, { Component } from 'react';
import { Text,Left,Right,Card,Item,CardItem,Icon,Button,} from 'native-base';
import { StyleSheet,View ,Image} from 'react-native';

const CategoryCard = (props) =>{
    const {navigation,ClickedList,DeleteEvent,RemoveEvent} = props;

    return (
      <Card style={styles.card}>
        <CardItem style={styles.cardItemView} button onPress={() => navigation.navigate('Items',{ListID:ClickedList.ListID,ListTitle:ClickedList.ListName})}>
             <Left>          
               <Text style={styles.CardInfo}>{ClickedList.ListName}</Text>
             </Left>
             <Right>       
                  <Icon name="ios-enter" style={styles.DoneIcon} />
             </Right>
        </CardItem>
        <CardItem style={styles.cardIBottomtemView}>
           <Item style={styles.CardDesriptionView}>       
                 <Text style={styles.CardDesriptionText}>{ClickedList.ListDescription}</Text>    
                             
           </Item>
           <Right style={{flexDirection:'row', justifyContent:'space-evenly',marginLeft:55}}>    
            <Button danger style={styles.DeleteButton}  onPress={()=>DeleteEvent(ClickedList)} >
              <Icon name="trash" style={styles.DoneIcon} />
            </Button>    
            <Button warning style={styles.UserDelete}  onPress={()=>RemoveEvent(ClickedList)} >
              <Icon name="person-remove-sharp" style={styles.DoneIcon} />
            </Button>      
          </Right>             
        </CardItem>
      </Card>
    );
}
export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    borderRadius:15,
    paddingVertical:5, 
    marginTop: 10,
    marginLeft:8,
    marginRight:8,
  },
  cardItemView:{
    borderRadius:15,
    borderBottomWidth:3,
  },
  cardIBottomtemView:{
    borderRadius:15,
  },
  CardInfo:{
    fontSize:24,
    fontWeight:'bold',
  },
  CardDesriptionText:{
    fontSize:14,
    fontWeight:'600',
  },
  CardDesriptionView:{
    paddingLeft:10,
    width:'60%'
  },
  DeleteButton:{
    alignSelf: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0,
    height: 35,
    width: 40,
    justifyContent: "center",
  },
  UserDelete:{
    alignSelf: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0,
    height: 35,
    width: 40,
    justifyContent: "center",
    marginLeft: 25,
  },
  DoneIcon:{
    marginLeft: 0, 
    marginRight: 0,
    fontSize: 30,
    fontWeight:"bold",
  },
  activeImageContainer: {
    flex: 1,
    width: 50,
    height:50 ,
    backgroundColor: "#eee",
    borderBottomWidth: 0.5,
    borderColor: "#fff",
    },
});