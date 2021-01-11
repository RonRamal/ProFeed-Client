import React, { Component } from 'react';
import { Container, Content, Input, Body, Text ,Card ,CardItem,Icon} from 'native-base';
import { Image } from 'react-native';

const NoteCard = (props) =>{
    const {Note} = props;

    return (
      <Container>
        <Content>
        <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{Note.NoteTitle}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri:Note.NoteImage}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  {Note.NoteText}
                </Text>
              </Body>
            </CardItem>           
          </Card>     
        </Content>
      </Container>
    );
}
export default NoteCard;
