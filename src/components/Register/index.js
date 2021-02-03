import React, { useState } from "react";
import firebase from "../../firebase";
import { withRouter } from "react-router-dom";
import "./register.css";

const Register = (props) => {
   const [nome, setNome] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   function register(e) {
      e.preventDefault();
      console.log("Eta, clicou no registrar");
      onRegister();
   }

   async function onRegister() {
      try {
         await firebase.register(nome, email, password);
         props.history.replace("/dashboard");
      } catch (error) {
         alert(error.message);
      }
   }
   return (
      <div>
         <form onSubmit={register} id="register">
            <h3>Novo Usuário</h3>
            <label>Nome:</label>
            <input
               type="text"
               autoFocus
               autoComplete="off"
               value={nome}
               onChange={(e) => {
                  setNome(e.target.value);
               }}
            />
            <label>Email:</label>
            <input
               type="email"
               autoComplete="off"
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
         </form>
      </div>
   );
};

export default withRouter(Register);
