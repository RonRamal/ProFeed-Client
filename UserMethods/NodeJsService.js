import { RotationGestureHandler } from "react-native-gesture-handler";
const SERVER_URL_IP='http://10.0.0.9:51300';
const SERVER_URL_USER_POST=SERVER_URL_IP+'/Users/SignUp';
const SERVER_URL_USER_GET=SERVER_URL_IP+'/Users/Login';
const SERVER_URL_USER_EXIST=SERVER_URL_IP+'/Users/Exist';

//const SERVER_URL=`http://localhost:8585`;

export function UserPostRequest(iFirstName,iLastName,iUserName,iEmail,iPassword){  
    let aUserDetails={     
        FirstName:iFirstName,
        LastName:iLastName,
        UserName:iUserName,
        Email:iEmail,
        Phone:'1233',
        Password:iPassword
    }

    fetch(SERVER_URL_USER_POST, {
      method: 'POST',
      body: JSON.stringify(aUserDetails),
      headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then((res) => {
        console.log('res=', JSON.stringify(res));
        return res.json();
      })
      .then(
      (result) => {
        console.log("fetch POST= ", result);
        return result;
      },
      (error) => {
        console.log("err post=", error);
      });   
}
  
export async function CheckIfUserExists(iEmail){  

    const res = await fetch(SERVER_URL_USER_EXIST+`?email=` + iEmail, {
      method: 'GET',
      //body: JSON.stringify(UserDetails),
      headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
      Accept: 'application/json; charset=UTF-8',
      })
    })
    console.log('res=', JSON.stringify(res));
    let result = res.json();
    console.log("fetch CheckIfUserExists= ", result);
    return result;

      //  .then((res) => {
      //   console.log('res=', JSON.stringify(res));
      //   return res.json();
      // })
      // .then(
      // (result) => {
      //   console.log("fetch CheckIfUserExists= ", result);
      //   return result;
        
      // },
      // (error) => {
      //   console.log("err post=", error);
      // });   
}

export function LoginRequestUserName(iUserName,iPassword){

    fetch(SERVER_URL_USER_GET+`?username=`+iUserName+`&password=`+iPassword, {
        method: 'GET',
        //body: JSON.stringify(aUserDetails),
        headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
        Accept: 'application/json; charset=UTF-8',
        })
      })
        .then((res) => {
          console.log('res=', JSON.stringify(res));
          return res.json();
        })
        .then(
        (result) => {
          console.log("fetch LoginRequestUserName= ", result);
          return result;
          
        },
        (error) => {
          console.log("err post=", error);
        });   
}


export function LoginRequestEmail(iEmail,iPassword){

    console.log("PASSSWORD"+iPassword);
    console.log("EMAILLLLL"+iEmail);

    fetch(SERVER_URL_USER_GET+`?email=`+iEmail+`&password=`+iPassword, {
        method: 'GET',
        //body: JSON.stringify(aUserDetails),
        headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
        Accept: 'application/json; charset=UTF-8',
        })
      })
        .then((res) => {
          console.log('res=', JSON.stringify(res));
          return res.json();
        })
        .then(
        (result) => {
          console.log("fetch LoginRequestEmail= ", result);
          return result;
          
        },
        (error) => {
          console.log("err post=", error);
        });   
}