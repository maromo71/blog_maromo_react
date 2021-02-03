import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./dashboard.css";

function Dashboard(props) {
   const [nome, setNome] = useState(localStorage.nome);
   const [email, setEmail] = useState(localStorage.email);

   useEffect(() => {
      console.log("Como está o usuario: ", localStorage.nome);
      if (localStorage.nome === "") {
         localStorage.nome = "";
         localStorage.email = "";
         setNome("");
         setEmail("");
         props.history.replace("/login");
         return;
      } else {
         firebase.getUserName((info) => {
            console.log(info.val());
            localStorage.nome = info.val().nome;

            firebase.getCurrent().then((email) => {
               setNome(localStorage.nome);
               localStorage.email = email;
               setEmail(localStorage.email);
            });
         });
      }
   }, [props.history]);

   async function logout() {
      await firebase
         .logout()
         .then((resolve) => {
            console.log("Deslogou... ", resolve);
            localStorage.removeItem("nome");
            localStorage.removeItem("email");
         })
         .catch((error) => {
            alert(error.message);
         });
      props.history.push("/");
   }
   return (
      <div id="dashboard">
         <div className="user-info">
            <h1>Olá {nome}!!!</h1>
         </div>
         <p>Saudações!!!</p>

         <p>Você está logado como: {email} </p>
         <p>Publique no nosso Blog</p>
         <Link to="/dashboard/new">Novo Post</Link>
         <button onClick={logout}>Sair</button>
      </div>
   );
}

export default withRouter(Dashboard);
