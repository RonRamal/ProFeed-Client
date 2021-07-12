import React from 'react';
import { Alert, StyleSheet,View ,TouchableHighlight,Image,ImageBackground} from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon,Switch, Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CategoryButton from '../Components/CategoryButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class UserSearchCustom extends React.Component {

    constructor(props){
      super(props)
      this.state={      
        MainCategories:['Fashion','Food','Tech','Fitness','Home styling','Travel','Fintech'],
        SubCategories:['Home cooking','Fast food','Vegan','Brand','Accessories','Style','stock'],
        OtherCategories:['Unboxing','Review','Influencer','Forex'],
        QueryInput:'',

        FirstInput:'',
        SecondInput:'',
        ThirdInput:'',

        First_Stage_Toggle:false,
        Second_Stage_Toggle:false,
        Third_Stage_Toggle:false,
        Submit_BTN_Toggle:false,   
        loadingGif:'',
      };
  }


  componentDidMount(){

   
  }  

  componentWillUnmount(){

  }



  HandleSubmitBtn=()=>{

   let FirstSentence = this.state.FirstInput;
   let SecondSentence = this.state.SecondInput;
   let ThirdSentence = this.state.ThirdInput;


 if(FirstSentence ==='' || SecondSentence ==='' || ThirdSentence ==='' ){

        if(FirstSentence ===''){
                this.setState({
                    First_Stage_Toggle:true,
                })
        }else{  
            this.setState({
                First_Stage_Toggle:false,
            })
         }
        if(SecondSentence ===''){
                this.setState({
                    Second_Stage_Toggle:true,
                })
        }
        else{  
            this.setState({
                Second_Stage_Toggle:false,
            })
         }
        if(ThirdSentence ===''){
            this.setState({
                Third_Stage_Toggle:true,
            })
        }
        else{  
            this.setState({
                Third_Stage_Toggle:false,
            })
         }
 }else{

    this.setState({
        First_Stage_Toggle:false,
        Second_Stage_Toggle:false,
        Third_Stage_Toggle:false,
    })

    let FirstSentence = this.state.FirstInput;
    let SecondSentence = this.state.SecondInput;
    let ThirdSentence = this.state.ThirdInput;

    let myQuery= this.state.QueryInput;

    myQuery = FirstSentence+','+ SecondSentence +','+ ThirdSentence;

    this.setState({        
      QueryInput:myQuery,
    })

    this.PostToServer(myQuery);

 }
}


PostToServer=(myQuery)=>{

  let userInputSearch = myQuery;
  let MinRet = 2;

  //userInputSearch = 'HASHTAGforex';

  this.setState({
    loadingGif:'https://media.giphy.com/media/SMKiEh9WDO6ze/giphy.gif',
  })

  
  fetch(`http://10.0.0.10:60182/api/Twitter?request=` + userInputSearch, {
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

  render(){
    const {QueryInput,loadingGif} = this.state;
    const {First_Stage_Toggle,Second_Stage_Toggle,Third_Stage_Toggle,Submit_BTN_Toggle,HashTag_BTN_Toggle} = this.state;
    const {FirstInput,SecondInput,ThirdInput} = this.state;

   return(

    <Container>
      <Content style={{width:'100%',paddingLeft:10,marginTop:30,}}>
        <ImageBackground  source={require('../../assets/AdvancedSearch.png')} style={styles.background} >

        <Text style={styles.StillHeader}>
        </Text> 
        <Item style={styles.HeaderButtons}>            
            <Input style={styles.titleInput} placeholder='Search Query..' placeholderTextColor='white' editable={false} value={QueryInput} onChangeText={InputTitle=> this.setState({QueryInput: InputTitle})}/>
            <Icon name="search-sharp" style={styles.ListIcon} /> 
        </Item>    

        {loadingGif ? (<Image source={{ uri: loadingGif }}  style={styles.tinyLogo} />) 
        : (<View style={{width:'100%',paddingLeft:10}}  >
          <Text style={styles.HeaderText}>Stage 1:</Text>
            <View style={{flexDirection:'row'}}>
              <View style={styles.StagesInput_div}>
                 <Input style={styles.titleInput} placeholder='Main Category..' placeholderTextColor='white' value={FirstInput} onChangeText={InputTitle=> this.setState({FirstInput: InputTitle})}/>
              </View>

              {First_Stage_Toggle &&
               <Button style={{marginLeft:40}} disabled danger  > 
                  <FontAwesomeIcon style={{color:'white'}} size={40} icon={faWindowClose} />
               </Button>
               }
            </View>
       

            <Text style={styles.HeaderText}>Stage 2:</Text>
            <View style={{flexDirection:'row'}}>
              <View style={styles.StagesInput_div}>
                <Input style={styles.titleInput} placeholder='Sub Category..' placeholderTextColor='white'  value={SecondInput} onChangeText={InputTitle=> this.setState({SecondInput: InputTitle})}/>
              </View>
              {Second_Stage_Toggle &&
                <Button style={{marginLeft:40}} disabled danger > 
                  <FontAwesomeIcon style={{color:'white'}} size={40} icon={faWindowClose} />
                </Button>
               }
            </View>
            

            <Text style={styles.HeaderText}>Stage 3:</Text>
            <View style={{flexDirection:'row'}}>
                <View style={styles.StagesInput_div}>
                    <Input style={styles.titleInput} placeholder='Key Word..' placeholderTextColor='white' value={ThirdInput} onChangeText={InputTitle=> this.setState({ThirdInput: InputTitle})}/>
                </View>
                {Third_Stage_Toggle && 
                <Button style={{marginLeft:40}} disabled danger> 
                    <FontAwesomeIcon style={{color:'white'}} size={40} icon={faWindowClose} />
                </Button>
                } 
            </View>
             
             { (First_Stage_Toggle || Second_Stage_Toggle || Third_Stage_Toggle) &&
                <Text style={styles.ErrorText}>Make sure you fill every stage! </Text>
             }

            
            <Button rounded success style={styles.SubmitBtn} onPress={this.HandleSubmitBtn}>
              <Text style={{fontSize:25}}>Submit</Text>
              <Icon name="send-outline" style={styles.ListIcon} /> 
            </Button>
        </View>)}
        </ImageBackground>       
       </Content>  
    </Container>

   );
 }
}
export default UserSearchCustom



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%'
  },
  HeaderText:{
   marginTop:20,
   fontSize:27,
   fontWeight:'bold',
   marginBottom:5,
   color:'#1DA1F2'
  }, 
  ErrorText:{
    fontSize:20,
    fontWeight:'bold',
    color:'red'
   }, 
  StagesInput_div:{
    marginBottom:5,
    borderRadius:100,
    width:"65%",
    height:45,
    flexDirection:'row',
    backgroundColor:"#1DA1F2",
    paddingLeft:10,
   },
  header:{
    fontWeight:"bold",
    fontSize:48,
    color:"#fb5b5a",
    marginBottom:50,
   },

   StillHeader:{
    fontWeight:"bold",
    fontSize:48,
    color:"#1DA1F2",
    alignSelf:'center',
    marginTop:110,
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
     width:'53%',
     alignSelf:'center',
     backgroundColor:'#1DA1F2',
     marginTop:80,
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
  },
});
