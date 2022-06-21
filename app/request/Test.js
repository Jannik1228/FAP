const getTest = async () => {
      try {
        const response = await fetch(
          'http://10.1.160.176:8080/FAPServer/service/fapservice/getOrt?plz=46342' ,{mode: 'cors'}
        );
        const json = await response.json();
        return json.status.message.ergebnis;
      } catch (error) {
        console.error(error);
      }
}

export default getTest;