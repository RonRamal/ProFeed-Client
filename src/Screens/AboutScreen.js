import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faPeopleCarry} from '@fortawesome/free-solid-svg-icons'
import { Container,Content,Text} from 'native-base';


function AboutScreen() {
    return (
    <Container>
      <Content style={{width:'100%',paddingLeft:10}}>
        <Text style={styles.StillHeader}>Help Center <FontAwesomeIcon style={{color:'#1DA1F2'}} size={35} icon={faPeopleCarry} /></Text>
        <Text style={styles.AboutText}>People Trust Influencers, Not Ads.</Text>
        <Text style={styles.OtherText}>ProFeed was created to help you make meaningful interactions with desired influencers. Our mission is to promote authentic marketing effectively. Modern marketers need data-driven solutions to have a competitive edge and make the best decisions. ProFeed sophisticated technology supports some of the world’s largest organizations and empowers influencers around the world. </Text>
        <Text style={styles.GuideHeader}>User Guide-</Text>

        <Text style={styles.AboutText}>Search-</Text>
        <Text style={styles.OtherText}>You can use 2 ways to start your search, you can use our query builder and use our recommended search keys to find  your most suitable influencer to promote your business. We highly recommend you to use it.Second way is our advanced search , you can insert 3 search keys of your own.</Text>

        <Text style={styles.AboutText}>Favorites -</Text>
        <Text style={styles.OtherText}>In Favorites you can watch your saved influencers from previous searches.In addition, you can view your search keys from previous searches.</Text>

        <Text style={styles.AboutText}>Profile-</Text>
        <Text style={styles.FooterText}>You can update your profile information any time you want.! be aware Email address cant be changed!</Text>
         


      </Content>  
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
      fontSize:30,
      color:"#1DA1F2",
      marginBottom:20,
      alignSelf:'center',
      marginTop:40,
     },
     AboutText:{
        fontWeight:"bold",
        color:'#1DA1F2',
        fontSize:20,
        marginTop:25,
        marginLeft:15,
        marginRight:15,
      },
      OtherText:{
        fontWeight:"bold",
        fontSize:16,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
      },
      FooterText:{
       fontWeight:"bold",
       fontSize:16,
       marginTop:20,
       marginBottom:50,
       marginLeft:15,
       marginRight:15,
      },
      GuideHeader:{
        fontWeight:"bold",
        color:'#1DA1F2',
        fontSize:25,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
      },
  });
  
