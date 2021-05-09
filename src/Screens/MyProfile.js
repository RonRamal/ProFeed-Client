import React from 'react';
import { Alert, StyleSheet,View ,TouchableHighlight} from 'react-native';
import { Container,Header, Content, Button, Input, Item, Text ,Icon,Switch, Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CategoryButton from '../Components/CategoryButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


class UserSearch extends React.Component {

    constructor(props){
      super(props)
      this.state={      
       
      };
  }


  componentDidMount(){

   
    this.setState({        
    })
  }  

  componentWillUnmount(){

  }


  
  ClearStages=()=>{

    this.setState({   
    
    })
  }
  render(){
  
   return(
    <Container>

        <Text style={styles.StillHeader}>
            Profile
        <FontAwesomeIcon style={styles.HeaderIcon} size={45} icon={faUser} />

        </Text>         
      <Content style={{width:'100%',paddingLeft:10,}}>
          
           
      </Content>  
           
    </Container>

   );
 }
}
export default UserSearch



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
    color:"#1DA1F2",
    marginBottom:15,
    alignSelf:'center',
    marginTop:30,
   },
   HeaderIcon:{
    marginLeft: 0, 
    marginRight: 0,
    fontSize: 60,
    color:'#1DA1F2',
   },
});
