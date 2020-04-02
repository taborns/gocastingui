
class MySessionStorage {


    constructor() {
        this.session = localStorage
    }

    put = (key, value) => {
        this.session.setItem(key, JSON.stringify(value ) )
    }

    get = (key, callback) => {
        callback(false, JSON.parse(this.session.getItem(key) ) )
    }

    remove = (key, mycallback) => {
        this.session.removeItem(key)
        
        mycallback()
        console.log("CALLING THE CALL BACK HERE")
        mycallback()
    }
}

let session = new MySessionStorage()

class ClientSession {
    
  static authkey =  "token";
  static loggedin = null;

  // stores authentication token 
  static storeAuth = (value, func, authkey) => {

    if( !authkey ) 
      authkey = ClientSession.authkey

    session.put(authkey, value);

  };

  // gets authentication token 
  static getAuth = (reciverfunc, authkey) => {

    if (!authkey)
      authkey = ClientSession.authkey

    session.get( authkey ,(err, value) => reciverfunc(err, value) );

  };

  static removeAuth = (func, authkey) => {
    if (!authkey)
      authkey = ClientSession.authkey

    session.remove(authkey, (err) => {
      console.log("WHAT THE FUCK IS HAPPENING HERE")
      func(err);
    });
  };

  static isLoggedIn = (func, authkey) => {

    ClientSession.getAuth( (err, value)=> {

      if(err || !value){
        func(false);

      }else {
        func(true);
      }

    },  authkey );

  };

  static getAccessToken = (callback, authkey) => {

    ClientSession.isLoggedIn(function (isLoggedIn) {

      if(isLoggedIn){

        ClientSession.getAuth((err, value)=> {
          if(err){
            callback(false, err);
          }else {
            callback(true, value)
          }
        }, authkey)

      }else{
        callback(false, null);
      }
    }, authkey);

  };

  static logout = () => {
      ClientSession.removeAuth(()=>{}, ClientSession.authkey)
  }
}

export default ClientSession;