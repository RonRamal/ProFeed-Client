import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container,H1 , Content, Button, Item, Text, Right,Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NoteCard from '../Components/NoteCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NotesToRender:[],
    };
    this.CurrentCategory=0;
  }


  componentDidMount(){
    const {CategoryId} = this.props.route.params;
    this.CurrentCategory = CategoryId;
    this._unsubscribeFocus = this.props.navigation.addListener('focus',(payload)=>{
      this.CurrentCategory = CategoryId;
      this.getAsyncStorage(CategoryId);
    });
  }

  componentWillUnmount(){
    this._unsubscribeFocus();
  }
 
  setAsyncStorage = async (value) => {
    try {   
      await AsyncStorage.setItem('Notes', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  getAsyncStorage = async (CategoryId) => {
    const Notess = [];
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Notes');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) { 

          getAsyncStorageParsed.map((item =>{

          if(item.CategoryID===CategoryId){
            Notess.push(item);
          }

        }))
        this.setState({
          NotesToRender:Notess,
        })    
      }
    } catch(e) {
      console.log(e);
    }
  }

  delAsyncNote = async (Note) => {
    const NotesToSave = [];
    const CategoryNotes=[];
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Notes');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) { 

          getAsyncStorageParsed.map((item =>{

           if( item.CategoryID===Note.CategoryID && item.NoteTitle === Note.NoteTitle && item.NoteText ===Note.NoteText ){
            //Dont insert it 
           }else{
            if(item.CategoryID===this.CurrentCategory){
              CategoryNotes.push(item);
            }
            NotesToSave.push(item);
          }
        }))
       
        this.setAsyncStorage(NotesToSave);    
        this.UpdateNotesCount(Note.CategoryID); 
        this.setState({
          NotesToRender:CategoryNotes,
        })    
      }
    } catch(e) {
      console.log(e);
    }
  }


  UpdateCategories = async (value) => {
    try {   
      await AsyncStorage.setItem('Categories', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  UpdateNotesCount = async (CategoryId) => {
    try {
      var oldNotesCounter = 0;
      const getAsyncStorageDataT = await AsyncStorage.getItem('Categories');
      const getAsyncStorageParsedY = JSON.parse(getAsyncStorageDataT);
      if(getAsyncStorageParsedY !== null) {  
              
        var index = getAsyncStorageParsedY.findIndex(obj => obj.CategoryID === CategoryId);
        oldNotesCounter=getAsyncStorageParsedY[index].NoteCounter;

        if(oldNotesCounter>0){
          oldNotesCounter--;
        }
        getAsyncStorageParsedY[index].NoteCounter=oldNotesCounter;
        this.UpdateCategories(getAsyncStorageParsedY); 
      }
      
    } catch(e) {
      console.log(e);
    }
  }

  deleteNote=(Note)=>{
    this.delAsyncNote(Note);
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
            {
            NotesToRender.length>0&&
            NotesToRender.map((item,key)=><NoteCard Note={item} key={key} ClickEvent={this.deleteNote}/>)
            }
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
