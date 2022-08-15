//Basis URL
const baseURL = 'http://10.0.20.54:8080/FAPServer/service/fapservice/'

const checkLoginName = async (benutzername) => {
  //preparing Data
  const data = {
      id: benutzername,
  }
  //API Request with Error handling
  try {
    const res = await fetch(
      baseURL + 'checkLoginName?' + new URLSearchParams(data) ,{mode: 'cors'}
    );
    const json = await res.json();
    if(json.ergebnis){
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

const getOrt = async (plz) => {
  //preparing Data
  const data ={
    postalcode: plz,
    username: "Jannik1228"  
  }
  //API Request with Error handling
    try {
      const res = await fetch(
        baseURL + "getOrt?" + new URLSearchParams(data)  ,{mode: 'cors'}
      );
      const json = await res.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
      return false;
    }
}
//TODO
const getLocation = async (land, plz, ort, strasse, hausnummer) => {
    //preparing Data

    //API Request with Error handling
    try {
      const res = await fetch(
        "http://api.positionstack.com/v1/forward?access_key=e3012d1d20ad7aac6f3ae5d136974c7f&query="+  hausnummer + "+"+ strasse + "+,+" +ort +",+"+land ,{mode: 'cors'}
      );
      const json = await res.json();
      console.log(json)
      return json;
    } catch (error) {
      console.error(error);
      return false;
    }
}

const addUser = async ( email, benutzername,password,name, nachname, plz, ort, strasse,land) => {
   //preparing Data 
  const data = {
        loginName: benutzername,
        vorname: name,
        nachname: nachname,
        land: land,
        plz: plz,
        ort: ort,
        strasse: strasse,
        address:{
          email: email
        },
        passwort:{
          passwort:password
        }      
    }
    //API Request with Error handling
    try {
      const res = await fetch(
        baseURL + 'addUser' ,{headers: {
          'Content-Type': 'application/json'}, method: "POST", mode: 'cors', body: JSON.stringify(data)}
      );
      const json = await res.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
      return false;
    }
}

const getSessionID = async ( benutzername, password) => {
  //preparing Data 
  const data = {
      loginName: benutzername,
      passwort:{
        passwort:password
      }
  }
  //API Request with Error handling
  try {
    const res = await fetch(
      baseURL + 'login' ,{headers: {
        'Content-Type': 'application/json'}, method: "POST", mode: 'cors', body: JSON.stringify(data)}
    );
    const json = await res.json();
    console.log(json.sessionID);
    return json.sessionID;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const getUsersLocation = async ( session, login, id) => {
  //preparing Data 
  const data = {
      session: session,
      login: login,
      id: id
  }
   //API Request with Error handling
  try {
    const res = await fetch(
      baseURL + 'getStandort?'+ new URLSearchParams(data) ,{headers: {
        'Content-Type': 'application/json'}, mode: 'cors'}
    );
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//TODO
const setUserLocation = async (data) => {
  //preparing Data

  //API Request with Error handling
  try {
    const res = await fetch(
      baseURL + 'setStandort' ,{headers: {
        'Content-Type': 'application/json'},method: "PUT", mode: 'cors', body: JSON.stringify(data)}
    );
    const json = await res.json();
    console.log(json);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//TODO
const logout = async ( data) => {
  //preparing Data

  //API Request with Error handling
  try {
    const res = await fetch(
      baseURL + 'logout' ,{headers: {
        'Content-Type': 'application/json'}, method: "POST", mode: 'cors', body: JSON.stringify(data)}
    );
    const json = await res.json();
    console.log(json);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//export Constants
export {logout, setUserLocation, getUsersLocation, getSessionID, addUser, getLocation, checkLoginName, getOrt};