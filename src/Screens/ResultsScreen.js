import React from 'react';
import {StyleSheet,View ,ActivityIndicator} from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon,Switch, Left } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import InfluencerCard from '../Components/InfluencerCard';
import {SaveUserDataRequest} from '../../UserMethods/NodeJsService';
import {getToken} from '../../UserMethods/AsyncStorageService';


class ResultsScreen extends React.Component {

    constructor(props){
      super(props)
      this.state={      
        Influencers:[],
        FirstName:'',
        LastName:'',
        Email:'',
        UserID:0,
        SavedUserScreenName:false,
        UserLoading:false,
        userEmailData:'',
      };
      userEmaildataMember=''
  }

  
  componentDidMount(){

    let {InfResult} = this.props.route.params;
    this.setState({
      Influencers:InfResult,
    })

    async function updateUserData(){    
     let aUserData = await getToken();
     console.log("RESULTS SCREEN ->" +JSON.stringify(aUserData));
     let userEmail = aUserData.Email;
     console.log("userEmail SCREEN ->" +userEmail);
     userEmaildataMember = userEmail
  
    }

    updateUserData();
   
    this._unsubscribeFocus = this.props.navigation.addListener('focus',(payload)=>{

      });
  }  


  AddInfluencerToFavorites=(ProfileData)=>{
    
    console.log('AddInfluencerToFavorites=',userEmaildataMember);
    this.setState({UserLoading:true,SavedUserScreenName:ProfileData.ScreenName}); 


    let aOwnerEmail = userEmaildataMember;
    let aSavedInf = {
      Engagment:ProfileData.Engagment,
      Followers:ProfileData.Followers,
      Image:ProfileData.Image,
      IsVerified:ProfileData.IsVerified,
      Profetional:ProfileData.Profetional,
      TweetsEngagmentRate:ProfileData.TweetsEngagmentRate,
      Name:ProfileData.Name,
      ScreenName:ProfileData.ScreenName,
      Rank:ProfileData.Rank
    }

  SaveUserDataRequest(aSavedInf,aOwnerEmail)
    .then((res) => {
        console.log('SaveUserDataRequest_Client=', JSON.stringify(res));
        return res;
      })
      .then(
      (result) => {
        this.setState({UserLoading:true,SavedUserScreenName:''}); 
        alert("Influencer "+aSavedInf.ScreenName+" has been added");
      },
      (error) => {
        alert("There has been a problem saving "+aSavedInf.ScreenName);
        console.log("err post=", error);
      }); 
}

render(){
  
   const {Influencers,UserLoading,SavedUserScreenName} = this.state;
   return(
    <Container>

     <View style={{alignContent:'center',justifyContent:'center',marginTop:40,marginBottom:15}} >
        <FontAwesomeIcon style={{color:'#1DA1F2',alignSelf:'center'}} size={30} icon={faUsers} />
        <Text style={styles.StillHeader}>Choose an influencer</Text>
     </View>
       
      <Content style={{width:'100%',paddingLeft:2,paddingRight:2}}>
          
        {
         Influencers?.length>0&&
         Influencers.map((item,key)=><InfluencerCard InfluencerItem={item} SaveInfluencerEvent={this.AddInfluencerToFavorites} key={key} navigation={this.props.navigation} UserLoading ={UserLoading} SavedUserScreenName={SavedUserScreenName} />)
        }
      </Content>  
           
    </Container>

   );
 }
}
export default ResultsScreen



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
    alignSelf:'center',
   },
   HeaderIcon:{
    marginLeft: 0, 
    marginRight: 0,
    color:'#1DA1F2',
   },
  
});
