import React from 'react';
import * as Facebook from 'expo-facebook';
import { StyleSheet, View,Alert,Image, TextInput,Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class LoginScreen extends React.Component {
  state={
    email:"",
    password:"",
    photoUrl:"",
    lblErr:"",
    token:"",
  }

  btnFBLogin = async()=> {
    try {

        await Facebook.initializeAsync({
          appId: '802022317193125',
        });
        const { type, token, expires, permissions, declinedPermissions, } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile','email'],
        });

        if (type === 'success')
        {        
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
            let res = await response.json();
            this.setState({token:token})

            Alert.alert('Logged in!',`Hi NAME: ${res.name}!\nEMAIL: ${res.email}\nPICTURE: ${res.picture.data.url}`); 
            //Alert.alert('Logged in!', 'Hi NAME: ${res.name}!\nEMAIL: ${res.email}\nPICTURE: ${res.picture}\nRES:${JSON.stringify(res)}');
        }else
        { 
         type === 'cancel' 
        }
    }
    catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
    }
  } 


  btnFetch_PersonPicture = () => {
    // POST adds a random id to the object sent
    fetch(`https://graph.facebook.com/me?fields=picture&access_token=${this.state.token}`, {
    method: 'POST',
    body: '',
    headers: {
    "Content-type": "application/json; charset=UTF-8"
     }
    })
    .then(response => response.json())
    .then(json => {
        if (json != null) 
        {
            this.setState({ photoUrl: json.picture.data.url });
            alert(`picture= ${json.picture}\npicture.data.url= ${(json.picture.data.url)}\nRES=${JSON.stringify(json)}`);
        }
        else
        {
        this.setState({ lblErr: true });
        }
    });
  }
    
    
  
  render(){
   
    const {photoUrl} = this.state;
    return (

        <View style={styles.container}>

        <Text style={styles.logo}>MyList</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebookBtn} onPress={this.btnFBLogin}>     
         <Text style={styles.loginText}> 
          <Ionicons name="md-logo-facebook" size={20}/> Login with Facebook
         </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SignUpBtn} >
          <Text style={styles.loginText}>SignUp</Text>
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#003f5c',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:30,
    marginTop: 40,
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  Pic:{
    width:"60%",
    height:100,
    backgroundColor:"#465881",

  },
  inputText:{
    height:50,
    color:"white",
    fontSize:18
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
  },
  facebookBtn:{
    width:"80%",
    backgroundColor:"#3b5998",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
  },
  SignUpBtn:{
 
    marginTop:20,
  },
  loginText:{
    color:"white",
    fontSize:18
  }
});
export default LoginScreen;
