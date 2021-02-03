import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import "./home.css";

function Home() {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      //Carrega os posts...
      console.log("carregando posts....");
      firebase.app.ref("posts").once("value", (snapshot) => {
         let dados = [];
         snapshot.forEach((childItem) => {
            dados.push({
               key: childItem.key,
               titulo: childItem.val().titulo,
               imagem: childItem.val().imagem,
               autor: childItem.val().autor,
               descricao: childItem.val().descricao,
            });
         });
         dados.reverse();
         setPosts(dados);
      });
   }, []);

   return (
      <section id="post">
         {posts.map((post) => {
            return (
               <article key={post.key}>
                  <header>
                     <div className="title">
                        <strong>{post.titulo}</strong>
                        <span>Autor: {post.autor}</span>
                     </div>
                  </header>
                  <img src={post.imagem} alt="Capa do post " />
                  <footer>
                     <p>
                        <strong>Descrição:</strong> {post.descricao}
                     </p>
                  </footer>
               </article>
            );
         })}
      </section>
   );
}

export default Home;
