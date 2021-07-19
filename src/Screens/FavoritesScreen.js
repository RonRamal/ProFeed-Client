import React, { useEffect, useState  } from 'react';
import {StyleSheet,View ,TouchableHighlight} from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon,Switch, Left } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers,faSearch,faHeart } from '@fortawesome/free-solid-svg-icons'
import InfluencerCard from '../Components/InfluencerCard';

function FavoritesScreen({ navigation })  {

  
    const [FavoriteInfluencers, setFavoriteInfluencers] = useState('');
    const [ResultLoading, setResultLoading] = useState(false);

  useEffect(()=>{
  });
  
   return(
    <Container style={styles.container}>    
            <Text style={styles.MainLogo}>
              Favorites <FontAwesomeIcon style={{color:'white',marginLeft:10}} size={35} icon={faHeart} />
            </Text>  
      <Content style={{width:'100%',paddingLeft:2,paddingRight:2}}>  
        <View style={styles.headerButtons_View}>
            <Button style={styles.SavedInfluencers} rounded >
            <FontAwesomeIcon style={{color:'black',marginLeft:35,fontWeight:'bold'}} size={25} icon={faSearch} />
                <Text style={{paddingLeft:10,marginLeft:10,fontWeight:'bold',color:'black'}}>Recent Searches</Text>
            </Button>    
            <Button style={styles.SavedSearches} rounded >
                <FontAwesomeIcon style={{color:'black',marginLeft:10,fontWeight:'bold'}} size={25} icon={faUsers} />
                <Text style={{paddingLeft:1,marginLeft:5,fontWeight:'bold',color:'black'}}>Favorites</Text>
            </Button>   
        </View>   
       {   
        FavoriteInfluencers?.length>0&&
        FavoriteInfluencers.map((item,key)=><InfluencerCard InfluencerItem={item} ClickEvent={this.InfluencerClick} key={key} navigation={this.props.navigation} />)
       }   

      </Content>      
    </Container>

   );
}
export default FavoritesScreen



const styles = StyleSheet.create({
   container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
   },
   headerButtons_View:{
    marginTop:20,
    marginBottom:20,
    paddingLeft:10,
    flexDirection:'row',
  },
   StillHeader:{
    fontWeight:"bold",
    fontSize:30,
    color:"#1DA1F2",
    alignSelf:'center',
   },
   HeaderIcon:{
    marginLeft: 0, 
    marginRight: 0,
    color:'#1DA1F2',
   },
   SavedInfluencers:{
    marginTop:20,
    width:140,
    backgroundColor:'#FFFFFF'
  },
  SavedSearches:{
    marginTop:20,
    marginLeft:60,
    marginRight:10,
    width:140,
    backgroundColor:'#FFFFFF'

  },
  MainLogo:{
    fontWeight:"bold",
    fontSize:50,
    color:"white",
    marginTop:30,
    alignSelf:'center',
  },
  
});
