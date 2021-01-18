import React, { Component } from 'react';
import {  Body, Text ,Card ,CardItem,Left,Right, Button, Icon} from 'native-base';
import { StyleSheet,Image } from 'react-native';


const NoteCard = (props) =>{
    const {Note,ClickEvent} = props;

    return (
        <Card style={styles.card}>
            <CardItem bordered >
              <Left>
                  <Text style={styles.HeaderText}>
                    {Note.NoteTitle}
                  </Text>                
              </Left>
              <Right>
                    <Button danger onPress={()=>ClickEvent(Note)}>
                      <Icon name="trash" />
                    </Button>
              </Right>
            </CardItem>
            <CardItem> 
              <Body>
                {
                  Note.NoteImage ? 
                  <Image source={{uri:Note.NoteImage}} style={{height: 200, width: 250, alignSelf: 'center'}}/>
                  : null
                }
              </Body>
            </CardItem>      
            <CardItem bordered> 
              <Body>
                <Text style={styles.InfoText}>
                  {Note.NoteText}
                </Text>
              </Body>
            </CardItem>   
        </Card>     
  );
}
export default NoteCard;

const styles = StyleSheet.create({
  card: {
    flex: 2,
    paddingVertical:10, 
    borderColor:'red',
    borderRadius:10,
    
  },
  HeaderText:{
    alignSelf:'center',
    fontSize:28,
    fontWeight:'bold',
  },
  InfoText:{
    fontSize:18,
    
  }
});