import React from 'react';
import { StyleSheet } from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon } from 'native-base';


function AboutScreen() {
    return (
    <Container>
        <Text style={styles.StillHeader}>About</Text>
        
        <Text style={styles.AboutText}>Welcome to the SharedList App, it was developed just today!!</Text>
        <Text style={styles.AboutText}>Sorry about our lack of visual effects we promise we will improve ourselves</Text>
    </Container>
    );
  }
  export default AboutScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

     StillHeader:{
      fontWeight:"bold",
      fontSize:48,
      color:"#fb5b5a",
      marginBottom:20,
      alignSelf:'center',
      marginTop:40,
     },
     
     AboutText:{
        fontWeight:"bold",
        fontSize:26,
        marginTop:40,
        marginLeft:15,
       },
  });
  
