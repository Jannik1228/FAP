const baseURL = 'http://192.168.178.148:8080/FAPServer/service/fapservice/'

const checkLoginName = async (benutzername) => {
    const data = {
        id: benutzername,
    }
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
    }
}

const getOrt = async (ort) => {
    try {
      const res = await fetch(
        'https://api.zippopotam.us/de/' + ort ,{mode: 'cors'}
      );
      const json = await res.json();
      return json;
    } catch (error) {
      console.error(error);
    }
}

const getLocation = async (land, plz, ort, strasse, hausnummer) => {

    try {
      const res = await fetch(
        "http://api.positionstack.com/v1/forward?access_key=e3012d1d20ad7aac6f3ae5d136974c7f&query="+  hausnummer + "+"+ strasse + "+,+" +ort +",+"+land ,{mode: 'cors'}
      );
      const json = await res.json();
      return json;
    } catch (error) {
      console.error(error);
    }
}

const addUser = async ( email, benutzername,password,name, nachname, plz, ort, strasse,land) => {
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
    }
}

const getSessionID = async ( benutzername, password) => {
  const data = {
      loginName: benutzername,
      passwort:{
        passwort:password
      }
      
  }
  try {
    const res = await fetch(
      baseURL + 'login' ,{headers: {
        'Content-Type': 'application/json'}, method: "POST", mode: 'cors', body: JSON.stringify(data)}
    );
    const json = await res.json();
    return json.sessionID;
  } catch (error) {
    console.error(error);
  }
}

const getUsersLocation = async ( session, login, id) => {
  const data = {
      session: session,
      login: login,
      id: id
  }
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
  }
}

const setUserLocation = async (data) => {
  try {
    const res = await fetch(
      baseURL + 'setStandort' ,{headers: {
        'Content-Type': 'application/json'},method: "PUT", mode: 'cors', body: JSON.stringify(data)}
    );
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
}






export {setUserLocation, getUsersLocation, getSessionID, addUser, getLocation, checkLoginName, getOrt};

