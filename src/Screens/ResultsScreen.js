import React from 'react';
import { Alert, StyleSheet,View ,TouchableHighlight} from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon,Switch, Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CategoryButton from '../Components/CategoryButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import InfluencerCard from '../Components/InfluencerCard';

class ResultsScreen extends React.Component {

    constructor(props){
      super(props)
      this.state={      
        Influencers:[],

      };
  }


  componentDidMount(){

    let {InfResult} = this.props.route.params;
    this.setState({
      Influencers:InfResult,
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

 alert("Ron");
}

render(){
  
   const {Influencers} = this.state;
   return(
    <Container>


     <View style={{alignContent:'center',justifyContent:'center',marginTop:40,marginBottom:15}} >
        <FontAwesomeIcon style={{color:'#1DA1F2',alignSelf:'center'}} size={30} icon={faUsers} />
        <Text style={styles.StillHeader}>Choose an influencer</Text>
     </View>
       
      <Content style={{width:'100%',paddingLeft:2,paddingRight:2}}>
          
       {   
        Influencers?.length>0&&
        Influencers.map((item,key)=><InfluencerCard InfluencerItem={item} ClickEvent={this.InfluencerClick} key={key} navigation={this.props.navigation} />)
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
