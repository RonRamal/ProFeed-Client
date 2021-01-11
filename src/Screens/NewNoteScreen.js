import React, {Component} from 'react';
import { StyleSheet,Dimensions,Image,View } from 'react-native';
import { Container, H3, Content, Button, Left, Right, Text,H1,Item,Form,Input,Textarea } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
class NewNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NoteTitle:"",
      NoteInfo:"",
      image:"",
      hasCameraPermission: null,
      Notes:[],
    };

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

  setAsyncStorage = async (value) => {
    try {   
      await AsyncStorage.setItem('Notes', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  getAsyncStorage = async () => {
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Notes');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) {       
        this.setState({
          Notes:getAsyncStorageParsed,
        })    
      }
    } catch(e) {
      console.log(e);
    }
  }

  SubmitNote =(CategoryId)=>{
    
    let NotesToSave = this.state.Notes;
     
    let NewNote = {
    CategoryID:CategoryId,
    NoteTitle:this.state.NoteTitle,
    NoteText:this.state.NoteInfo,
    NoteImage:this.state.ImageURL,
    }
     
    NotesToSave.push(NewNote);
    this.setAsyncStorage(NotesToSave);

    
  }
 ValidateForm =(CategoryId)=>{
   
   let title=this.state.NoteTitle;
   let info=this.state.NoteInfo;

    if(info==='' || title===''){
      alert("Missing Note Info/Title");
    }

  this.SubmitNote(CategoryId);
 }

  render() {
    const { image,hasCameraPermission} = this.state;
    const {CategoryId,CategoryTitle} = this.props.route.params;

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
                <Input placeholder='Note Title' onChangeText={InputTitle=> this.setState({NoteTitle: InputTitle})}/>
             </Item>
             <Textarea rowSpan={5} bordered placeholder="Nore info.." onChangeText={Info=> this.setState({NoteInfo: Info})} />
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
              <Button rounded success style={styles.SubmitButton} onPress={this.SubmitNote(CategoryId)}>
               <Text>Submit Note</Text>
              </Button>
              <Button rounded info style={styles.SubmitButton} onPress={() => navigation.navigate('Notes',{CategoryId:Category.CategoryID,CategoryTitle:Category.CategoryTitle})}>
               <Text>Go Back</Text>
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
