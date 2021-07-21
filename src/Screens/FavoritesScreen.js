import React, { useEffect, useState  } from 'react';
import {StyleSheet,View ,ActivityIndicator} from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon,Switch, Left } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers,faSearch,faHeart } from '@fortawesome/free-solid-svg-icons'
import FavoriteInfluencerCard from '../Components/FavoriteInfluencerCard';
import {GetUserFavoritesByEmail,GetUserRecentSearchesByEmail} from '../../UserMethods/NodeJsService';
import {getToken } from '../../UserMethods/AsyncStorageService';
import SearchCard from '../Components/SearchCard';

function FavoritesScreen({ navigation })  {

  
    const [FavoriteInfluencers, setFavoriteInfluencers] = useState('');
    const [RecentSearches, setRecentSearches] = useState('');
    const [Email, setEmail] = useState('');
    const [FavoritesLoading, setFavoritesLoading] = useState(false);
    const [RecentLoading, setRecentLoading] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [UserID, setUserID] = useState('');


  useEffect(()=>{
    async function updateUserData(){    
      let aUserData = await getToken();
      setFirstName(aUserData.FirstName);
      setLastName(aUserData.LastName);
      setEmail(aUserData.Email);
      setUserID(aUserData.Id)
    }
    updateUserData();
  });


  GetRecentSearches=()=>{
    
    setFavoriteInfluencers('');
    setRecentLoading(true);
    let aOwnerEmail = Email;
    GetUserRecentSearchesByEmail(aOwnerEmail)
    .then((res) => {
        console.log('GetRecentSearches=', JSON.stringify(res));
        return res;
      })
      .then(
      (result) => {
        setRecentLoading(false);
        setRecentSearches(result);
      },
      (error) => {
        setFavoritesLoading(false);
        setRecentLoading(false);
        alert("You dont have any recent Searches yet");
        console.log("err post=", error);
      }); 
}

  GetAllFavorites=()=>{
    
    setFavoritesLoading(true);
    setRecentSearches('');

    let aOwnerEmail = Email;
 
    GetUserFavoritesByEmail(aOwnerEmail)
    .then((res) => {
        console.log('getAllFavorites=', JSON.stringify(res));
        return res;
      })
      .then(
      (result) => {
        setFavoritesLoading(false);
        setFavoriteInfluencers(result);
      },
      (error) => {
        setFavoritesLoading(false);
        setRecentLoading(false);
        alert("You dont seem to have any Influencers Saved");
        console.log("err post=", error);
      }); 
}
  
   return(
    <Container style={styles.container}>    
            <Text style={styles.MainLogo}>
              Favorites <FontAwesomeIcon style={{color:'white',marginLeft:10}} size={35} icon={faHeart} />
            </Text>  

      <Content style={{width:'100%',paddingLeft:2,paddingRight:2}}>  
        <View style={styles.headerButtons_View}>
            <Button style={styles.SavedInfluencers} rounded onPress={()=>GetRecentSearches()}>
            <FontAwesomeIcon style={{color:'#1DA1F2',marginLeft:40,fontWeight:'bold'}} size={25} icon={faSearch} />
            {RecentLoading ? (<ActivityIndicator style={{marginLeft:1}} size='large' color="#1DA1F2" />) : (<Text style={{paddingLeft:10,marginLeft:10,fontWeight:'bold',color:'#1DA1F2'}}>Recent Searches</Text>)}
            </Button>    
            <Button style={styles.SavedSearches} rounded onPress={()=>GetAllFavorites()} >
                <FontAwesomeIcon style={{color:'#1DA1F2',marginLeft:10,fontWeight:'bold'}} size={25} icon={faUsers} />
                {FavoritesLoading ? (<ActivityIndicator style={{marginLeft:20}} size='large' color="#1DA1F2" />) : (<Text style={{paddingLeft:1,marginLeft:5,fontWeight:'bold',color:'#1DA1F2'}}>Favorites</Text>)}
            </Button>   
        </View>   
       {   
        FavoriteInfluencers?.length>0&&
        FavoriteInfluencers.map((item,key)=><FavoriteInfluencerCard InfluencerItem={item} key={key}/>)
       }   
      {   
        RecentSearches?.length>0&&
        RecentSearches.map((item,key)=><SearchCard SearchItem={item}  key={key} />)
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
    paddingLeft:17,
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
