import AsyncStorage from '@react-native-async-storage/async-storage';


export async function storeToken(user) {
    console.log("storeToken called - user "+ user);
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  
  export async function getToken() {
    console.log("getToken called");
    try {
      let userData = await AsyncStorage.getItem("userData");
      console.log("userDataString - "+userData);
      let data = JSON.parse(userData);
      console.log("data - " + userData);
      return data
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  export async function loggingOutDeleteToken() {
    console.log("loggingOut called");
    try {
      await AsyncStorage.removeItem("userData");
   } catch (error) {
     console.log("Something went wrong", error);
   }
  }