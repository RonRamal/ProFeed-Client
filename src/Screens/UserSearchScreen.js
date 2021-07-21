import React from 'react';
import { Alert, StyleSheet,View ,TouchableHighlight,Image,ImageBackground} from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon,Switch} from 'native-base';
import CategoryButton from '../Components/CategoryButton';
import CategoryButtonV2 from '../Components/CategoryButtonV2';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActivityIndicator } from 'react-native'
import { GetGlobalSearchKeys,SaveUserSearch } from '../../UserMethods/NodeJsService';
import {getToken} from '../../UserMethods/AsyncStorageService';

class UserSearchScreen extends React.Component {

    constructor(props){
      super(props)
      this.updateUserData = this.updateUserData.bind(this);
      this.state={      
        MainCategories:[],
        SubCategories:[],
        OtherCategories:[],
        QueryInput:'',
        First_Stage_Toggle:true,
        Second_Stage_Toggle:false,
        Third_Stage_Toggle:false,
        Submit_BTN_Toggle:false,   
        HashTag_BTN_Toggle:false,   
        StagesArray:['','',''],
        loadingGif:'',
        FirstCatToggle:true,
        SecondCatToggle:false,
        ThirdCatToggle:false,
      };
      userEmaildataMember=''
  }

    updateUserData=(iCollectionName,iStageNumber)=>{   
      let searchKeyRes = []; 
      GetGlobalSearchKeys(iCollectionName).then(aFirstCatRes =>{
       if(!aFirstCatRes["0"]){
          return;
       } 
        for (const [key, value] of Object.entries(aFirstCatRes["0"])) {
          if(!(key =="_id")){
            console.log(`${key}: ${value}`);
            searchKeyRes.push(value);
          }
        }
        switch(iStageNumber) {
          case "MainCategories":
            this.setState({FirstCatToggle:false,MainCategories:searchKeyRes})
            break;
          case "SubCategories":
            this.setState({SecondCatToggle:false,SubCategories:searchKeyRes})
            break;
          case "OtherCategories":
            this.setState({ThirdCatToggle:false,OtherCategories:searchKeyRes})
            break;
          default:
        }
      })
    
  };

  componentDidMount(){

    async function getUserEmail(){    
      let aUserData = await getToken();
      console.log("UserSeach SCREEN ->" +JSON.stringify(aUserData));
      let userEmail = aUserData.Email;
      console.log("userEmail SCREEN ->" +userEmail);
      userEmaildataMember = userEmail
   
     }
 
     getUserEmail();


    this.updateUserData("Global","MainCategories");

    let stages = this.state.StagesArray;
    let myQuery= this.state.QueryInput;

    myQuery = stages[0] +' '+ stages[1] +' '+ stages[2];

    this.setState({        
      QueryInput:myQuery,
    })
  }  

  componentWillUnmount(){

  }



  updateQuery=(input,index)=>{

    let OldQueryArr = this.state.StagesArray;
    let HashTagEnabled = this.state.HashTag_BTN_Toggle;
    let myQuery= this.state.QueryInput;

    if(HashTagEnabled){
      let tempInput= 'hashtag'+input;
      input = tempInput;
      this.setState({
        HashTag_BTN_Toggle:false,
      })
    }

    switch (index) {
      case 0:
        OldQueryArr[index] = input;
        break;
      case 1:
        OldQueryArr[index] = ','+input;
        break;
      case 2:
        OldQueryArr[index] = ','+input;
        break;
    
      default:
        break;
    }    


    myQuery = OldQueryArr[0] + OldQueryArr[1] + OldQueryArr[2];

    this.setState({
      StagesArray:OldQueryArr,
      QueryInput:myQuery,
  })
  }

  FirstStageToggle=()=>{
             
      this.setState({
          First_Stage_Toggle:!this.state.First_Stage_Toggle,
      })
  }
  SecondStageToggle=(ButtonName)=>{
    this.setState({SecondCatToggle:true,ThirdCatToggle:false})
    let aCollectionName = ButtonName.replace(/ /g, '')
    this.updateUserData(aCollectionName,"SubCategories");
    this.updateQuery(ButtonName,0);
    

    this.setState({
        Second_Stage_Toggle:true,
        Third_Stage_Toggle:false,
    })
  }
  ThirdStageToggle=(ButtonName)=>{

    this.setState({ThirdCatToggle:true})
    let aCollectionName = ButtonName.replace(/ /g, '')
    this.updateUserData(aCollectionName,"OtherCategories");

    this.updateQuery(ButtonName,1);


      this.setState({        
          Third_Stage_Toggle:true,
      })
  }


SubmitBtnToggle=(ButtonName)=>{

  this.updateQuery(ButtonName,2);


  this.setState({        
      Submit_BTN_Toggle:true,
  })
}

PostToServer=()=>{

  console.log('PostToServer=',userEmaildataMember);
  let stages = this.state.StagesArray;
  let aFirst = stages[0].replace(',',"");
  let aSecond = stages[1].replace(',',"");
  let aThird = stages[2].replace(',',"");

  let aOwnerEmail = userEmaildataMember;
  let aSavedData ={
     firstCat:aFirst,
     secondCat:aSecond,
     thirdCat:aThird
  }
  console.log(JSON.stringify(aSavedData));

 
  SaveUserSearch(aSavedData,aOwnerEmail)
  .then((res) => {
      console.log('SaveUserDataRequest_Client=', JSON.stringify(res));
      return res;
    })
    .then(
    (result) => {
      console.log("UserSearchSaved");
    },
    (error) => {
      alert("There has been a problem saving "+aSavedInf.ScreenName);
      console.log("err post=", error);
    });





  let userInputSearch = this.state.QueryInput;
  this.setState({
    loadingGif:'https://media.giphy.com/media/SMKiEh9WDO6ze/giphy.gif',
  })
  this.ClearStages();
  fetch(`http://proj.ruppin.ac.il/igroup29/test2/tar6/api/Twitter?request=` + userInputSearch, {
    method: 'GET',
    headers: new Headers({
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json; charset=UTF-8',
    })
  })
    .then((res) => {
      console.log('res=', JSON.stringify(res));
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      return res.json()
    })
    .then(
    (result) => {
      console.log("fetch GET= ", result);
      this.props.navigation.navigate('Results',{InfResult:result.FinalList});
      this.setState({
        loadingGif:'',
      })

    },
    (error) => {
      console.log("err GET=", error);
    });

   
}


HashTagClick=()=>{

  this.setState({
    HashTag_BTN_Toggle:!this.state.HashTag_BTN_Toggle,
  })

}

ClearStages=()=>{

    this.setState({   
        First_Stage_Toggle:true,
        Second_Stage_Toggle:false,
        Third_Stage_Toggle:false,
        Submit_BTN_Toggle:false,
        QueryInput:'',
        StagesArray:['','',''],  
    })
}
  render(){
    const {QueryInput,loadingGif} = this.state;
    const {First_Stage_Toggle,Second_Stage_Toggle,Third_Stage_Toggle,Submit_BTN_Toggle,HashTag_BTN_Toggle} = this.state;
    const {MainCategories,SubCategories,OtherCategories} = this.state;
    const {FirstCatToggle,SecondCatToggle,ThirdCatToggle} = this.state;

   return(

    <Container>
      <ImageBackground  source={require('../../assets/SearchBackgroundQuery.png')} style={styles.background} >

        <Text style={styles.StillHeader}>
        </Text> 

        <Item style={styles.HeaderButtons}>            
            <Input style={styles.titleInput} placeholder='Search Query..' placeholderTextColor='white' editable={false} value={QueryInput} onChangeText={InputTitle=> this.setState({QueryInput: InputTitle})}/>
            <Icon name="search-sharp" style={styles.ListIcon} /> 
        </Item>   

        {loadingGif ? (<View/>) 
            : (<View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#1DA1F2'}}>  HashTag
              <FontAwesomeIcon style={{color:'#1DA1F2'}} size={20} icon={ faHashtag } />
            </Text>  

            <Switch  trackColor={{ false: "#767577", true: "#1DA1F2" }} thumbColor={HashTag_BTN_Toggle ? "white" : "#f4f3f4"} onValueChange={this.HashTagClick} value={HashTag_BTN_Toggle} />

            <Button style={styles.HashTagBtn} onPress={this.ClearStages}>
              <FontAwesomeIcon style={{color:'white'}} size={19} icon={faTrash} />
            </Button>                   
         </View>)}
    
      <Content style={{width:'100%',paddingLeft:10}}>

            {loadingGif ? 
            (<View>
              <Image source={{ uri: loadingGif }}  style={styles.tinyLogo} /><ActivityIndicator size={50} color="#600" />
            </View>) :
            (<View>
             {First_Stage_Toggle && <Text style={styles.HeaderText}>Stage 1:</Text>}
            <View style={{width:'100%',paddingBottom:5,flexDirection:'row',flexWrap:'wrap',alignContent:'center',alignItems:'center'}}>
              {
              FirstCatToggle ? (<ActivityIndicator size={65} color="#1DA1F2" style={{marginLeft: 130}} />):(
              First_Stage_Toggle &&
              MainCategories.map((item,key)=><CategoryButton ButtonName={item} key={key} ClickEvent={this.SecondStageToggle} /> )
              )
              }
            </View>

            {Second_Stage_Toggle && <Text style={styles.HeaderText}>Stage 2:</Text>}
            <View style={{width:'100%',flexDirection:'row',paddingBottom:5,flexWrap:'wrap'}}>
              {
              SecondCatToggle ? (<ActivityIndicator size={65} color="#1DA1F2" style={{marginLeft: 130}}/>):(
              Second_Stage_Toggle &&
              SubCategories.map((item,key)=><CategoryButtonV2 ButtonName={item} key={key} ClickEvent={this.ThirdStageToggle} /> )
              )
              }
            </View>

            {Third_Stage_Toggle && <Text style={styles.HeaderText}>Stage 3:</Text>}
            <View style={{width:'100%',flexDirection:'row',paddingBottom:10,flexWrap:'wrap'}}>
              {
              ThirdCatToggle ? (<ActivityIndicator style={{marginLeft: 130}} size={65} color="#1DA1F2" alignSelf='center'/>):(
              Third_Stage_Toggle && 
              OtherCategories.map((item,key)=><CategoryButton ButtonName={item} key={key} ClickEvent={this.SubmitBtnToggle} /> )
              )
              }
            </View>

            {
            Submit_BTN_Toggle &&
            <Button rounded success style={styles.SubmitBtn} onPress={this.PostToServer}>
              <Text style={{fontSize:25}}>Submit</Text>
              <Icon name="send-outline" style={styles.ListIcon} /> 
            </Button>
            }
        </View>)}
      </Content>  
      </ImageBackground>

    </Container>

   );
 }
}
export default UserSearchScreen



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderText:{
   fontSize:27,
   fontWeight:'bold',
   marginBottom:2,
   color:'#1DA1F2'
  }, 
 
  header:{
    fontWeight:"bold",
    fontSize:48,
    color:"#fb5b5a",
    marginBottom:50,
   },
   background: {
    width: '100%',
    height: '100%'
  },
   StillHeader:{
    fontWeight:"bold",
    fontSize:48,
    color:"#1DA1F2",
    marginBottom:15,
    alignSelf:'center',
    marginTop:30,
   },
   ListIcon:{
    marginLeft: 0, 
    marginRight: 0,
    fontSize: 40,
    color:'white',
   },
   HeaderIcon:{
    marginLeft: 0, 
    marginRight: 0,
    fontSize: 60,
    color:'#1DA1F2',
   },
   titleInput:{
    height:50,
    color:"white",
    fontSize:15,
    width:'100%',
    fontWeight:'bold'
   },
   HeaderButtons:{
    marginTop:20,
    padding:20,
    paddingBottom:20,
    marginBottom:15,
    width:"95%",
    backgroundColor:"#1DA1F2",
    borderRadius:25,
    height:55,
    justifyContent:"center",
    alignSelf:'center',
   },
   SubmitBtn:{
     alignItems:'center',
     justifyContent:'center',
     width:'50%',
     alignSelf:'center',
     backgroundColor:'#1DA1F2'
   },
   HashTagBtn:{
    alignItems:'center',
    justifyContent:'center',
    width:'12%',
    backgroundColor:'#1DA1F2',
    marginLeft:'35%',
   },
   tinyLogo: {
    width: 300,
    height: 300,
    alignSelf:'center',
    marginTop:70,
    marginBottom:20,

  },
});
