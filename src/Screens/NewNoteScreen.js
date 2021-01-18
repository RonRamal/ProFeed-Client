import React, {Component} from 'react';
import { StyleSheet,Dimensions,Image,View } from 'react-native';
import { Container, H3, Content, Button, Left, Right, Text,H1,Item,Form,Input,Textarea } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NewNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NoteTitle:"",
      NoteInfo:"",
      image:"",
      hasCameraPermission: null,
    };
    this.Category=[];
    this.Notes=[];

  }

  async componentDidMount() {
    //const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });  
    this.getAsyncStorage();
  }

  OpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
  OpenCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
     allowsEditing: true,
     aspect: [4, 3],
     quality:1
     
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  storeCategories = async (value) => {
    try {   
      await AsyncStorage.setItem('Categories', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  getCategories = async (CategoryId) => {
    try {
      var oldNotesCounter = 0;
      const getAsyncStorageDataT = await AsyncStorage.getItem('Categories');
      const getAsyncStorageParsedY = JSON.parse(getAsyncStorageDataT);
      if(getAsyncStorageParsedY !== null) {  
              
        var index = getAsyncStorageParsedY.findIndex(obj => obj.CategoryID === CategoryId);
        oldNotesCounter=getAsyncStorageParsedY[index].NoteCounter;
        oldNotesCounter++;
        getAsyncStorageParsedY[index].NoteCounter=oldNotesCounter;
        this.storeCategories(getAsyncStorageParsedY); 
      }
      
    } catch(e) {
      console.log(e);
    }
  }

  setAsyncStorage = async (value) => {
    try {   
      await AsyncStorage.setItem('Notes', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  getAsyncStorage = async () => {
    const Notess=[];
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Notes');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) {      
              
        getAsyncStorageParsed.map((item =>{
            Notess.push(item);
        }))

        this.Notes=Notess;
      }
    } catch(e) {
      console.log(e);
    }
  }

  SubmitNote =()=>{

    const {CategoryId} = this.props.route.params;
    const NotesToSave = this.Notes;
     
    let NewNote = {
     CategoryID:CategoryId,
     NoteTitle:this.state.NoteTitle,
     NoteText:this.state.NoteInfo,
     NoteImage:this.state.image,
    }
     
    NotesToSave.push(NewNote);
    this.setAsyncStorage(NotesToSave);
    this.getCategories(CategoryId);
    this.setState({
      NoteTitle:'',
      NoteInfo:'',
      image:'',
    });

    this.props.navigation.goBack();
  }


  ValidateForm =()=>{

    let title=this.state.NoteTitle;
    let info=this.state.NoteInfo;

    if(info==='' || title===''){
      alert("Missing Note Info/Title");
    }
     

    this.SubmitNote;
 }

  render() {
    const {image,hasCameraPermission,NoteInfo,NoteTitle} = this.state;
    const {CategoryId,CategoryTitle} = this.props.route.params;
    const {navigation} = this.props

    if (hasCameraPermission === null) {
     return <View />;
    }
    else if (hasCameraPermission === false) {
     return <Text>Access to camera has been denied.</Text>;
    }
    else {
    return (
      <Container>
       <Content padder>
        <Grid>
            <Row style={styles.MainRow}>
             <Left>
               <H1>New Note in {CategoryTitle} Category </H1>
             </Left>                 
            </Row>
           <Col>
            <Form>
             <Item rounded > 
                <Input placeholder='Note Title' value={NoteTitle} onChangeText={InputTitle=> this.setState({NoteTitle: InputTitle})}/>
             </Item>
             <Textarea rowSpan={5} bordered placeholder="Nore info.." value={NoteInfo} onChangeText={Info=> this.setState({NoteInfo: Info})} />
            </Form>        
           </Col>
            <Col>
              <H3 style={styles.H3}>Image from galley/Camera (Optional)</H3>
                <View style={styles.activeImageContainer}>
                {image ? (<Image source={{ uri: image }}  style={{ flex: 1 }} />) : (<View/>)}
                </View>      
              <Row>
               <Button rounded info style={styles.Button} onPress={this.OpenCamera}>
                 <Text>Camera</Text>
               </Button>
               <Button rounded info style={styles.Button} onPress={this.OpenGallery}>
                 <Text>Gallery</Text>
               </Button>
              </Row>    
              <Button rounded success style={styles.SubmitButton} onPress={this.SubmitNote} >
               <Text>Submit Note</Text>
              </Button>
             
            </Col>       
         </Grid>
        </Content>
      </Container>
    );
   }
  }
}
export default NewNoteScreen;



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
  },
  Button: {
    margin:15,
    padding:5,
  },
  SubmitButton: {
    margin:15,
    marginTop:15,
    padding:5,
  },
  H3:{
    padding:10,
  },
  activeImageContainer: {
    flex: 1,
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height / 4,
    backgroundColor: "#eee",
    borderBottomWidth: 0.5,
    borderColor: "#fff",
    alignSelf:'center',
    },
});
