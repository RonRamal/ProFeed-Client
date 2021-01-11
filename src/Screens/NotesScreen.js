import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container,H1 , Content, Button, Item, Text, Right,Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NoteCard from '../Components/NoteCard';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NotesToRender:[],
    };
  }

  componentDidMount(){
    const {CategoryId} = this.props.route.params;
    this.getAsyncStorage(CategoryId);
  }
  
  setAsyncStorage = async (value) => {
    try {   
      await AsyncStorage.setItem('Categories', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  getAsyncStorage = async (CategoryId) => {
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Notes');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) { 
        
        let Notes=[];
        getAsyncStorageParsed.forEach((item)=>{
          if(item.data.CategoryID===CategoryId){
            Notes.push(item);
          }
        })
        this.setState({
          NotesToRender:Notes,
        })    
      }
    } catch(e) {
      console.log(e);
    }
  }



  render() {
    const {CategoryId,CategoryTitle} = this.props.route.params;
    const {NotesToRender} = this.state;

    return (
      <Container>
      <Content>
        <Grid>
          <Row style={styles.MainRow}>
            <Left>
              <H1>{CategoryTitle}</H1>
            </Left>
            <Right>
               <Button rounded onPress={() =>this.props.navigation.navigate('NewNote',{CategoryId:CategoryId,CategoryTitle:CategoryTitle})}>
                 <Text>+</Text>
               </Button> 
            </Right>       
          </Row>
          <Col>
           {
            NotesToRender.length>0&&
            NotesToRender.map((item,key)=><NoteCard Note={item.data} key={key}/>)
            }
          </Col>
        </Grid>
      </Content>  
    </Container>
    );
  }
}

export default Category;


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
