import app from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

let firebaseConfig = {
   apiKey: "AIzaSyB25c7kka_ipV4iGXOUIfYrcuq-3a6UVvA",
   authDomain: "reactapp-e8032.firebaseapp.com",
   databaseURL: "https://reactapp-e8032.firebaseio.com",
   projectId: "reactapp-e8032",
   storageBucket: "reactapp-e8032.appspot.com",
   messagingSenderId: "388115953941",
   appId: "1:388115953941:web:2a97e37243ff627e89d11c",
   measurementId: "G-793VTCNKER", 
};

class Firebase {
   constructor() {
      // Initialize Firebase
      app.initializeApp(firebaseConfig);
      //Referrenciando a database para acessar em outros locais
      this.app = app.database();
      this.storage = app.storage();
   }

   login(email, password) {
      return app.auth().signInWithEmailAndPassword(email, password);
   }

   logout(){
      return app.auth().signOut();
   }

   async register(nome, email, password) {
      await app.auth().createUserWithEmailAndPassword(email, password);

      const uid = app.auth().currentUser.uid;

      return app.database().ref("usuarios").child(uid).set({
         nome: nome,
      });
   }

   isInitialized() {
      console.log(app);
      if(app!==null) {
         return true;
      }else{
         return false;
      }
   }

   async getCurrent(){
      if(app.auth().currentUser) {
         return app.auth().currentUser.email;
      }
   }

   async getCurrentUid(){
      if(app.auth().currentUser) {
         return app.auth().currentUser.uid;
      }
   }

   async getUserName(callback){
      if(!app.auth().currentUser){
         return null;
      }
      const uid = app.auth().currentUser.uid;
      await app.database().ref('usuarios').child(uid).once('value').then(callback);
   }


}

export default new Firebase();
