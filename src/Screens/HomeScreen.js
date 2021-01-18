import React, { Component } from 'react';
import { Container, H3, Content, H1, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, ImageBackground } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
 
  //<ImageBackground  source={require('../../assets/background.jpg')} style={styles.background} > </ImageBackground> 
  render() {
    return (  

    <Container>
      <ImageBackground  source={require('../../assets/background2.jpg')} style={styles.background} >
      <Content>    
      <Grid>
          <Row style={styles.FirstRow}>
            <Text style={styles.Text}> NotesApp </Text>
          </Row>
          <Row style={styles.SecondRow} >
            <Button style={styles.Button}  onPress={() => this.props.navigation.push('Categories')} large rounded success>
              <Text>Start Writing!</Text>
            </Button>    
          </Row> 
          <Row style={styles.ThirdRow}>
            <Text style={styles.MiniText}> React Native Notes App </Text>
          </Row>   
      </Grid>
      </Content>
      </ImageBackground>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  content:{

  },
  FirstRow:{
    height:180,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,

  },
  SecondRow:{
     height:380,
     flex:1,
     alignItems: 'center',
     justifyContent: 'center',
  },
  ThirdRow:{
    height:150,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
 },
  Text:{
    fontSize:50,
    fontWeight:'bold',
    color:'black',

  },
  MiniText:{
    fontSize:14,
    fontWeight:'bold',
    color:'white'

  },
  Button:{
    alignSelf:'center'
    
  }
});

export default HomeScreen;
