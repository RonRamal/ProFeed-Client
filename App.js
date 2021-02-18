import React from 'react';
import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/Screens/HomeScreen';
import CategoriesScreen from './src/Screens/CategoriesScreen'
import NotesScreen from './src/Screens/NotesScreen';
import NewNoteScreen from './src/Screens/NewNoteScreen';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterationScreen from './src/Screens/RegisterationScreen';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
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
         <Stack.Navigator initialRouteName={'Login'}>
           <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
           <Stack.Screen name="Register" component={RegisterationScreen} options={{headerShown:false}} />
           <Stack.Screen name="Home" component={HomeScreen} options={{ title:"Home"}}  />
           <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: "Categories" , headerLeft:null}} />
           <Stack.Screen name="Notes" component={NotesScreen} options={{ title: "Notes" }} />
           <Stack.Screen name="NewNote" component={NewNoteScreen} options={{ title: "NewNote" }} />
         </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const Stack = createStackNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}