import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./global.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import New from "./components/New";
import firebase from "./firebase";

const App = () => {
   const [firebaseInitialized, setFirebaseInitialized] = useState(false);
   useEffect(() => {
      if (firebase.isInitialized()) {
         setFirebaseInitialized(true);
      }
   }, [firebaseInitialized]);

   if (firebaseInitialized) {
      return (
         <div>
            <BrowserRouter>
               <Header />
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/dashboard/new" component={New} />
               </Switch>
            </BrowserRouter>
         </div>
      );
   } else {
      return (
         <div>
            <h1>Carregando...</h1>
         </div>
      );
   }
};

export default App;
