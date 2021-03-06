/**
 * Created by pc on 4/7/18. */
 import axios from "axios";
import ClientSession from "./client-session.js";
 
 //let API_BASE_URL = "http://localhost:8000"
  let API_BASE_URL = "http://104.248.163.118:8001"
 //let API_BASE_URL = "https://api.gochereta.com"
 

export default class Api {
  
  static API_BASE_URL = API_BASE_URL;

  static getData(method, param, nformaterror) {

    let url = API_BASE_URL +'/' + method + '/' 
    

    if( param)
      url +=param
  
        return new Promise(function(resolve, reject) {

          ClientSession.getAccessToken( function(isLoggedIn, authData) {

            let headers = {}
    
            // if user is logged in and the authentication token is found 
            if ( isLoggedIn && authData != null) {
              
              headers = {
                'headers' : { 
                  Authorization : 'Token ' + authData.token
                }
              }
    
            }

            axios
              .get(url, headers)
              .then(response => {
                resolve(response.data);
                
              })
              .catch(error => {
                
                reject( error.response && ( nformaterror &&  error.response.data || Api.formatError( error.response.data ) ) )
              });

          }); // Client Session 

        });//promise


  }


  static removeData(method, data, nformaterror) {

    let url = API_BASE_URL +'/' + method + '/' 
    

  
        return new Promise(function(resolve, reject) {

          ClientSession.getAccessToken( function(isLoggedIn, authData) {

            let headers = {}
    
            // if user is logged in and the authentication token is found 
            if ( isLoggedIn && authData != null) {
              
              headers = {
                  Authorization : 'Token ' + authData.token
              }
    
            }

            axios
              .delete(url, { headers : headers, data : data})
              .then(response => {
                resolve(response.data);
                
              })
              .catch(error => {
                
                reject( error.response && ( nformaterror &&  error.response.data || Api.formatError( error.response.data ) ) )
              });

          }); // Client Session 

        });//promise


  }


  static postData(method, data, param=null, nformaterror) {
    let url = API_BASE_URL + '/' + method + '/'

    if( param)
      url +=param

    return new Promise( function( resolve, reject) {        
      ClientSession.getAccessToken( function(isLoggedIn, authData) {

        let headers = {}

        // if user is logged in and the authentication token is found 
        if ( isLoggedIn && authData != null) {
          
          headers = {
            'headers' : { 
              Authorization : 'Token ' + authData.token
            }
          }

        }
        
        axios
          .post(url, data, headers)
          .then( response => {
            resolve(response.data)
          })
          .catch( error => {
            reject( error.response && ( nformaterror &&  error.response.data || Api.formatError( error.response.data ) ) )
          })
      
      }) // client session 
      
    }) // promise 
  }

  static updateData(method, data, param=null) {
    let url = API_BASE_URL + '/' + method + '/'

    if( param)
      url +=param

    return new Promise( function( resolve, reject) {        
      ClientSession.getAccessToken( function(isLoggedIn, authData) {

        let headers = {}

        // if user is logged in and the authentication token is found 
        if ( isLoggedIn && authData != null) {
          
          headers = {
            'headers' : { 
              Authorization : 'Token ' + authData.token
            }
          }

        }
        


        axios
          .put(url, data, headers)
          .then( response => {
            resolve(response.data)
          })
          .catch( error => {
            reject( error.response && Api.formatError( error.response.data ) )
          })
      
      }) // client session 
      
    }) // promise 
  }

  static login(data) {
    let url = API_BASE_URL + '/login/'

    return new Promise( function( resolve, reject) {        

      axios
        .post(url, data)
        .then( response => {
          ClientSession.storeAuth(response.data)
          resolve(response.data)
        })
        .catch( error => {
          reject(Api.formatError(error.response.data) )
        })
    
    }) // promise 

  }

  static  formatError( errors ) {
    if( !errors )
      return;

    for( let error_key in errors ) {
        return errors[error_key]
    }

    return null
  }


}

