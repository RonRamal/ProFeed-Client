import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { RotationGestureHandler } from "react-native-gesture-handler";
import {getToken, storeToken} from '../UserMethods/AsyncStorageService';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SERVER_URL_IP='http://10.0.0.9:51300';
const SERVER_URL_USER_PUT=SERVER_URL_IP+'/Users/Update';
const SERVER_URL_USER_POST=SERVER_URL_IP+'/Users/SignUp';
const SERVER_URL_USER_GET=SERVER_URL_IP+'/Users/Login';
const SERVER_URL_USER_EXIST=SERVER_URL_IP+'/Users/Exist';

export async function UserPostRequest(iFirstName,iLastName,iUserName,iEmail,iPassword){  
    let aUserDetails={     
        FirstName:iFirstName,
        LastName:iLastName,
        UserName:iUserName,
        Email:iEmail,
        Phone:'1233',
        Password:iPassword
    }

    const res = await fetch(SERVER_URL_USER_POST, {
      method: 'POST',
      body: JSON.stringify(aUserDetails),
      headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
      })
    })
    let result;
    try{
    console.log('res=', JSON.stringify(res));
     result = res.json();
    }
    catch(error){
      console.log('error=', error);
      return false;
    }
    console.log("fetch CheckIfUserExists= ", result);
    return result;
      // .then((res) => {
      //   console.log('res=', JSON.stringify(res));
      //   return res.json();
      // })
      // .then(
      // (result) => {
      //   console.log("fetch POST= ", result);
      //   return result;
      // },
      // (error) => {
      //   console.log("err post=", error);
      // });   
}

export async function UserPutRequest(iFirstName,iLastName,iUserName,iEmail){  
  let aUserDetails={     
      FirstName:iFirstName,
      LastName:iLastName,
      UserName:iUserName,
      Email:iEmail,
  }
  console.log('UserPutRequest=', JSON.stringify(aUserDetails));

  const res = await fetch(SERVER_URL_USER_PUT, {
    method: 'PUT',
    body: JSON.stringify(aUserDetails),
    headers: new Headers({
    'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
    })
  })
  let result;
  try{
  console.log('res=', JSON.stringify(res));
   result = res.json();
  }
  catch(error){
    console.log('error=', error);
    return false;
  }
  console.log("fetch CheckIfUserExists= ", result);
  return result;
 
}
  
export async function CheckIfUserExists(iEmail){  

    const res = await fetch(SERVER_URL_USER_EXIST+`?email=` + iEmail, {
      method: 'GET',
      headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
      Accept: 'application/json; charset=UTF-8',
      })
    })

    let result;
    try{
    console.log('res=', JSON.stringify(res));
     result = res.json();
    }
    catch(error){
      console.log('error=', error);
      return false;
    }
    return result;
}

export async function LoginRequestUserName(iUserName,iPassword){

    const res = await fetch(SERVER_URL_USER_GET+`?username=`+iUserName+`&password=`+iPassword, {
        method: 'GET',
        headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
        Accept: 'application/json; charset=UTF-8',
        })
      })

      let result;
      try{
        console.log('res=', JSON.stringify(res));
        if(res) {
        result = res.json();
        }else{
          return false;
        }
      }
      catch(error){
        console.log('error=', error);
        return false;
      }
}


export async function LoginRequestEmail(iEmail,iPassword){

    console.log("LoginRequestEmail -> email:"+iEmail+",password:"+iPassword);

    const res = await fetch(SERVER_URL_USER_GET+`?email=`+iEmail+`&password=`+iPassword, {
        method: 'GET',
        headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
        Accept: 'application/json; charset=UTF-8',
        })
      })
      let result;
      console.log('res=', JSON.stringify(res));
      try{
        if(res) {
        result = res.json();
        }else{
          return false;
        }
      }
      catch(error){
        console.log('error=', error);
        return false;
      }
      return result;
}