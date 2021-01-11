import React from 'react';
import { StyleSheet } from 'react-native';
import { Container,H1,H3 ,Header, Content, Button, Input, Item, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CategoryCard from '../Components/CategoryCard.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Home extends React.Component {

    constructor(props){
      super(props)
      this.state={      
        CategoriesToRender: [],
        CategoryInput:"",
      };
      this.Categories=[];
      this.NewID=0;
  }


  componentDidMount(){
    this.getData();
  }  

  clearAsyncStorage = async() => {
    AsyncStorage.clear(); 
    this.setState({
      CategoriesToRender:[],
    })
  }

  storeData = async (value) => {
    try {   
      await AsyncStorage.setItem('Categories', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  getData = async () => {
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Categories');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) {      
        this.setState({
          CategoriesToRender:getAsyncStorageParsed,
        })

      }
    } catch(e) {
      console.log(e);
    }
  }

  AddCategory = (CurrentInput) =>{

    let id = this.NewID;
    let title = CurrentInput;

    var NewCategory = {
      CategoryID:id, 
      CategoryTitle:title,
      NoteCounter:0,
    }

    this.NewID++;

    this.Categories.push(NewCategory);
    this.storeData(this.Categories);

    this.setState(prevState => ({
      CategoriesToRender: [...prevState.CategoriesToRender,NewCategory]
    }))
  }

  
  
  ValidateInput = () =>{
    let CurrentInput = this.state.CategoryInput;
    if(CurrentInput === ''){
        alert("Please Enter Category Name!")
    }
    else{
      this.AddCategory(CurrentInput);
    }
  }

  render(){

    const {CategoriesToRender,CategoryInput} = this.state;

   return(

    <Container>
    <Content>
      <Grid>
        <Row style={styles.MainRow}>
            <H1>My Notes</H1>     
        </Row>
        <Row>
          <Col>
           <Button rounded onPress={this.ValidateInput}>
             <Text>Add Category</Text>         
           </Button>
           <Button rounded onPress={this.clearAsyncStorage}>
             <Text>Clear Async Storage</Text>       
           </Button>
          </Col>
          <Col>
            <Item rounded>
             <Input placeholder='Rounded Textbox' onChangeText={(text)=>this.setState({CategoryInput:text})}/>
           </Item>
          </Col>
        </Row>

        <Col >
           {   
            CategoriesToRender?.length>0&&
            CategoriesToRender.map((item,key)=><CategoryCard Category={item} key={key} navigation={this.props.navigation} />)
           }
        </Col>     
      </Grid>
    </Content>  
  </Container>
   );
 }
}
export default Home



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainRow:{
    justifyContent:'center',
    padding:20 ,
  }
});
