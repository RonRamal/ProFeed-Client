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
 

  render() {
    return (  
    <Container style={styles.container}>
      <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      >
      <Content padder contentContainerStyle={styles.content} >    
      <Grid>
          <Row>
             <H1>MyNotes</H1>
          </Row>
          <Row>
            <Button onPress={() => this.props.navigation.navigate('Categories')} full rounded success>
              <Text>Start Writing!</Text>
            </Button>
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
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  container:{
  }
});

export default HomeScreen;
