import React from 'react';
import * as firebase from 'firebase';
import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import apiKeys from './config/keys';

import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/Screens/LoginScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import LoadingScreen from './src/Screens/LoadingScreen';
import HomeScreen from './src/Screens/HomeScreen';
import AboutScreen from './src/Screens/AboutScreen';
import MyProfile from './src/Screens/MyProfile';
import ResultsScreen from './src/Screens/ResultsScreen';
import InfluencerDetails from './src/Screens/InfluencerDetails';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Container,Text,View,Icon } from 'native-base';

import UserSearchScreen from './src/Screens/UserSearchScreen';
import UserSearchCustom from './src/Screens/UserSearchCustom';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {

    if (!firebase.apps.length) {
      console.log('Connected with Firebase')
      firebase.initializeApp(apiKeys.firebaseConfig);
    }

    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName={'Home'}>
           <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false }} />
           <Stack.Screen name="Search" component={UserSearchScreen} options={{headerShown:false}}  />
           <Stack.Screen name="CustomSearch" component={UserSearchCustom} options={{headerShown:false}}  />
           <Stack.Screen name="Results" component={ResultsScreen}  options={{headerShown:false}}/>
           <Stack.Screen name="Influencer" component={InfluencerDetails}  options={{title:'Influencer'}}/>
           <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false}}  />
           <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
           <Stack.Screen name="Register" component={SignUpScreen} options={{headerShown:false}} />   
           <Stack.Screen name="Profile" component={MyProfile} options={{headerShown:false}} />             

           {
            //<Stack.Screen name="NewList" component={NewList} options={{ title: "NewList" }} />
            //<Stack.Screen name="Items" component={ItemsScreen} options={{ title: "" }} />
            //<Stack.Screen name="Lists" component={ListsScreen} options={{headerShown:false}} />
            //<Stack.Screen name="Tab" component={myTabNavigator}  options={{headerShown:false}}/>
           }
         </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

//Create Navigators
const Stack = createStackNavigator();

/*const Tab = createBottomTabNavigator();
function myTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" backBehavior='history' tabBarOptions={{labelStyle:{fontSize:18}}}>
       <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel:'Profile',tabBarIcon: ()=>(<Icon name="person-circle" style={{ fontSize:40}}/>)}}/>
       <Tab.Screen name="Lists" component={ListsScreen} options={{tabBarLabel:'UserArea',tabBarIcon: ()=>(<Icon name="ios-home" style={{ fontSize:40}} />)}} />
       <Tab.Screen name="About" component={AboutScreen} options={{tabBarLabel:'About',tabBarIcon: ()=>(<Icon name="ios-information-circle-sharp" style={{ fontSize:40}} />)}} />
    </Tab.Navigator>
  );
}*/

