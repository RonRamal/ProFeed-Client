import React from 'react';
import { Image, StyleSheet,View ,ImageBackground,Linking } from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon,Switch, Left, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import email from 'react-native-email'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import { faCalculator} from '@fortawesome/free-solid-svg-icons'


class InfluencerDetails extends React.Component {

    constructor(props){
      super(props)
      this.state={      
         image:'',
         SelectedInfluencer:'',
      };
  }


  componentDidMount(){

    let {SelectedInf} = this.props.route.params;
    this.setState({
      SelectedInfluencer:SelectedInf,
    })

    this._unsubscribeFocus = this.props.navigation.addListener('focus',(payload)=>{
      
    });
  }  

  componentWillUnmount(){

  }


  

PostToServer=()=>{

 
}

ClearStages=()=>{


}

InfluencerClick=()=>{


}


RenderCalculatedTweets=()=> {
  let CalculatedTweets;
  const {SelectedInfluencer} = this.state;
  const CalculatedT = SelectedInfluencer.CalculatedTweets;

  if(CalculatedT === 0) {
    CalculatedTweets =<View/>;
  } else {
    CalculatedTweets =<Text style={styles.InfText}> Finally we calculated {CalculatedT} Tweets for this user.</Text>; 
  } 
  return CalculatedTweets;
}

RenderTimelineTweets=()=> {
  let TimelineCount;
  const {SelectedInfluencer} = this.state;
  const TimelineT = SelectedInfluencer.TimelineCount;

  if(TimelineT === 0) {
    TimelineCount =<View/>;
  } else {
    TimelineCount =<Text style={styles.InfText}>This profile has a total number of {TimelineT} tweets in his Timeline,</Text>; 
  } 
  return TimelineCount;
}

RenderQueryIncludedTweets=()=> {
  let QueryIncludedTweets;
  const {SelectedInfluencer} = this.state;
  const QueryIncludedT = SelectedInfluencer.QueryIncludedTweets;

  if(QueryIncludedT === 0) {
    QueryIncludedTweets =<View/>;
  } else {
    QueryIncludedTweets =<Text style={styles.InfText}> {QueryIncludedT} of them include your search query.</Text>; 
  } 
  return QueryIncludedTweets;
}

RenderRetweetedTweets=()=> {
  let RetweetedTweets;
  const {SelectedInfluencer} = this.state;
  const RetweetedT = SelectedInfluencer.RetweetedTweets;

  if(RetweetedT === 0) {
    RetweetedTweets =<View/>;
  } else {
    RetweetedTweets =<Text> And {RetweetedT} are Retweeted tweets</Text>; 
  } 
  return RetweetedTweets;
 }

handleEmail = () => {
  const to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
  email(to, {
      // Optional additional arguments
      cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
      bcc: 'mee@mee.com', // string or array of email addresses
      subject: 'Show how to use',
      body: 'Some body right here'
  }).catch(console.error)
}

render(){
   const {SelectedInfluencer} = this.state;
   const UserPage = SelectedInfluencer.ProfileUrl;
   const UserWebsite = SelectedInfluencer.Website;
   return(
    <Container>
      <View style={{marginTop:5,width:'100%'}}>
          <View style={{flexDirection:'row',marginLeft:10}}>
            <View style={styles.HeaderIcons}>
                  {SelectedInfluencer.IsVerified ? (<FontAwesomeIcon style={{color:'#1DA1F2',marginBottom: 30,}} size={40} icon={faCheckCircle} />) : (<View/>)}
                  {SelectedInfluencer.Profetional ? (<FontAwesomeIcon style={{color:'#1DA1F2'}} size={30} icon={faUserCheck} />) : (<View/>)}
            </View>

            <View>
              <Image source={{ uri: SelectedInfluencer.Image }}  style={{width: 190, height: 190,alignSelf:'center',marginTop:5,marginLeft:30,borderRadius:50}} />
            </View>

            <View style={styles.HeaderButtons}>
                <Button rounded style={styles.InfBtn} onPress={ ()=>{ Linking.openURL(UserPage)}} >      
                  <FontAwesomeIcon style={{color:'#1DA1F2',alignSelf:'center'}} size={30} icon={faUser} />
                </Button>
                <Button rounded style={styles.InfBtn} onPress={this.handleEmail}>      
                  <FontAwesomeIcon style={{color:'#1DA1F2',alignSelf:'center'}} size={30} icon={faEnvelope} />
                </Button>
                {SelectedInfluencer.Website ? ( <Button rounded style={styles.InfBtn}  onPress={ ()=>{ Linking.openURL(UserWebsite)}}><FontAwesomeIcon style={{color:'#1DA1F2',alignSelf:'center'}} size={30} icon={faGlobe} /></Button> ) : (<View/>)}
            </View>
          </View>

         <View style={{paddingLeft:10,width:"95%"}}>
            <View style={{flexDirection:'column',alignContent:'center',justifyContent:'center'}}>
             {/* <FontAwesomeIcon style={{color:'#1DA1F2'}} size={30} icon={faUserCircle} />*/}
              <Text style={styles.StillHeader}>{SelectedInfluencer.Name}</Text>
              <Text style={styles.StillHeader}>@{SelectedInfluencer.ScreenName}</Text>
           </View>

            <View style={{flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
              {SelectedInfluencer.Location ? ( <Text style={styles.StillHeader}><FontAwesomeIcon style={{color:'#1DA1F2'}} size={15} icon={faGlobe} /> {SelectedInfluencer.Location}</Text>) : (<View/>)}
            </View>
         </View>
      </View>
      <Content style={{marginTop:5}}>   
          <View style={styles.InfluencerSummary_View}>
            <Text style={styles.InfHeader}><FontAwesomeIcon style={{color:'#1DA1F2'}} size={30} icon={faIdCard} /> Influencer Summary:</Text>
            <Text style={styles.InfText}>Impact: {SelectedInfluencer.Impact}</Text>
            <Text style={styles.InfText}>Followers: {SelectedInfluencer.Followers}</Text>   
            <Text style={styles.InfText}>Engagment: {SelectedInfluencer.Engagment}</Text>
            <Text style={styles.InfText}>TimelineCount: {SelectedInfluencer.TimelineCount}</Text>
            <Text style={styles.InfText}>Rank: {SelectedInfluencer.Rank}</Text>
            <Text style={styles.InfText}>GeneralActivity: {SelectedInfluencer.GeneralActivity}</Text> 
            

          </View>

          <Text style={{alignSelf:'center',fontWeight:'bold'}}>_____________________________________________</Text>
          
          <View style={styles.influencerDetails_View}>
            <Text style={styles.InfHeader}><FontAwesomeIcon style={{color:'#1DA1F2'}} size={30} icon={faCalculator} /> Influencer Details:</Text>
            <Text style={styles.InfText}>TweetsEngagmentRate: {SelectedInfluencer.TweetsEngagmentRate}</Text>
            <Text></Text> 

            <Text>
              {this.RenderTimelineTweets()}
              {this.RenderQueryIncludedTweets()}
              {this.RenderRetweetedTweets()} 
              {this.RenderCalculatedTweets()}          
            </Text>
            <Text></Text>
            <Text style={styles.InfText}>{SelectedInfluencer.Description}</Text>
          </View>

          {/* <View style={{ width:"100%",paddingLeft:5,flexDirection:'row',flexWrap:'wrap',alignContent:'center',justifyContent: 'center'}}> 

            <Button style={styles.RankingBtn} disabled rounded >
              <Text uppercase={false}> Impact: {SelectedInfluencer.Impact}</Text>
            </Button>
            <Button style={styles.RankingBtn} disabled rounded >
              <Text uppercase={false}>Rank: {SelectedInfluencer.Rank}</Text>
            </Button>
            <Button style={styles.RankingBtn} disabled rounded >
              <Text uppercase={false}>Engagment: {SelectedInfluencer.Engagment}</Text>
            </Button>
            <Button style={styles.RankingBtn} disabled rounded >
              <Text uppercase={false}> GeneralActivity: {SelectedInfluencer.GeneralActivity}</Text>
            </Button>
            <Button style={styles.RankingBtn} disabled rounded >
              <Text uppercase={false}>TimelineCount: {SelectedInfluencer.TimelineCount}</Text>
            </Button>
            <Button style={styles.RankingBtn} disabled rounded >
              <Text uppercase={false}>TweetsEngagmentRate: {SelectedInfluencer.TweetsEngagmentRate}</Text>
            </Button>
          </View> */}

      </Content>    
    </Container>

   );
 }
}
export default InfluencerDetails

  


const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   },
   RankingBtn:{
     marginRight:5,
     marginBottom:5,
     marginTop:1,
     textTransform: 'lowercase',
     backgroundColor:'#AAB8C2'
   },
   InfluencerSummary_View:{
    paddingLeft:10,
   },
   BannerImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
   StillHeader:{
    fontWeight:"bold",
    fontSize:22,
    color:"#1DA1F2",
    marginTop:5,
    marginLeft:3,
   },
   HeaderIcon:{
    marginLeft: 0, 
    marginRight: 0,
    color:'#1DA1F2',
   },
   buttonsView:{
     alignItems:'center',
     justifyContent: 'center',
     flex:1,
     flexDirection:'row',
     marginTop:20,
   },
   HeaderButtons:{
    marginTop:15,    
    paddingLeft:15
  },
  HeaderIcons:{
    marginTop:15,    
    marginRight: 5,

  },
   InfHeader:{
    fontSize:18,
    color:'#1DA1F2',
    fontWeight:'bold',
    marginBottom:5,
    marginTop:5,

  },
  influencerDetails_View:{
     width:"95%",
     paddingLeft:10,
   },
   InfBtn:{
    width:60,
    justifyContent: 'center',
    marginBottom:20,
    color:'#1DA1F2'

   },
   InfText:{
     fontSize:18,
     color:'#657786'
   },
  
  
});
