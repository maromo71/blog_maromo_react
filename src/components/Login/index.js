import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./login.css";

function Login(props) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   useEffect(() => {
      //Verificar se há algum usuário logado  para enviar direto ao dashboard
      if (firebase.getCurrent()) {
         firebase.getUserName((info) => {
            localStorage.nome = info.val().nome;
            props.history.replace("/dashboard");
         });
      }
   }, [props.history]);

   function entrar(e) {
      e.preventDefault();
      console.log("Eta cheguei aqui no entrar: ", e);
      login();
   }

   async function login() {
      try {
         await firebase.login(email, password).catch((error) => {
            if (error.code === "auth/user-not-found") {
               alert("Este usuário não existe.");
            } else {
               alert("Código do erro: " + error.code);
               
               return null;
            }
         });
         props.history.replace("/dashboard");
      } catch (error) {
         alert(error.message);
      }
   }

   return (
      <div>
         <form onSubmit={entrar} id="login">
            <h3>Login</h3>
            <label>Email:</label>
            <input
               type="email"
               autoComplete="off"
               autoFocus
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
               placeholder="email@exemplo.com"
            />
            <label>Password:</label>
            <input
               type="password"
               autoComplete="off"
               value={password}
               placeholder="sua senha..."
               onChange={(e) => {
                  setPassword(e.target.value);
               }}
            />
            <button type="submit">Entrar</button>
            <Link to="/register">Ainda não possui uma conta ?</Link>
         </form>
      </div>
   );
}

export default withRouter(Login);
