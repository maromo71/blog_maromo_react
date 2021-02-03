import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase.js";
import "./new.css";

function New(props) {
   const [titulo, setTitulo] = useState("");
   const [imagem, setImagem] = useState(null);
   const [url, setUrl] = useState("");
   const [descricao, setDescricao] = useState("");
   const [alert, setAlert] = useState("");
   const [progress, setProgress] = useState(0);
   useEffect(() => {
      if (!localStorage.nome) {
         console.log("Sem usuario logado... mandei para o login aqui...");
         props.history.replace("/");
      }
   }, [props.history]);
   async function cadastrar(e) {
      e.preventDefault();
      console.log("Cadastrar clicado");

      //verificar preenchimento dos campos
      if (titulo !== "" && (imagem !== "") & (descricao !== "") & (url !== "")) {
         let posts = firebase.app.ref("posts");
         let chave = posts.push().key;
         await posts.child(chave).set({
            titulo: titulo,
            imagem: url,
            descricao: descricao,
            autor: localStorage.nome,
         });
         setInterval(() => {
            props.history.push("/dashboard");
         }, 1200);
         setAlert("Post cadastrado com sucesso.");
      } else {
         setAlert("Preencha todos os campos corretamente.");
      }
   }

   async function handleFile(e) {
      //verifica se enviou imagem
      if (e.target.files[0]) {
         const imagemUpload = await e.target.files[0];
         //verificar o tipo de arquivo enviado
         if (
            imagemUpload.type === "image/png" ||
            imagemUpload.type === "image/jpeg"
         ) {
            console.log("Imagem Válida: ", imagemUpload);
            //enviar a imagem para o storage
            handleUpload(imagemUpload);
            setImagem(await imagemUpload);
         } else {
            setAlert("Imagem inválida. Tipos aceitos: png ou jpeg.");
            console.log("Erro na imagem");
            setImagem(null);
            return;
         }
      }
      setAlert("");
   }

   const handleUpload = async (imagemUpload) => {
      console.log("imagem para enviar ao storage: ", imagemUpload);
      const currentUid = await firebase.getCurrentUid();
      const uploadTasks = firebase.storage
         .ref(`images/${currentUid}/${imagemUpload.name}`)
         .put(imagemUpload);

      await uploadTasks.on(
         "state_changed",
         (snapshot) => {
            //progress - progresso do carregamento da imagem
            const progresso = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progresso);
         },
         (error) => {
            //error
            setAlert("Não foi possível enviar a imagem.");
         },
         () => {
            //sucess
            //Aqui vamos recuperar a url para armazenar no firebase

            firebase.storage
               .ref(`images/${currentUid}`)
               .child(imagemUpload.name)
               .getDownloadURL()
               .then((urlArmazenada) => {
                  setUrl(urlArmazenada);
               });
         }
      );
   };
   return (
      <div>
         <header id="new">
            <div id="cabec">
               <div>
                  <h1>Novo Post</h1>
               </div>
               <div>
                  <Link to="/dashboard">Dashboard</Link>
               </div>
            </div>
            <div className="mensagem">
               <span>{alert}</span>
            </div>
            <form onSubmit={cadastrar} id="new-post">
               <label>Procurar Imagem</label>
               <input type="file" onChange={handleFile} />
               <label>Carregamento e preview da imagem</label>
               {url !== "" ? (
                  <img
                     src={url}
                     alt="Capa do Post"
                     width="150px"
                     height="150px"
                  />
               ) : (
                  <progress value={progress} max="100" />
               )}

               <label>Título</label>
               <input
                  type="text"
                  autoFocus
                  required
                  placeholder="Título do Post"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
               />

               <label>Descrição do Post: </label>
               <textarea
                  type="text"
                  placeholder="Descrição completa do Post"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
               />

               <button type="submit">Cadastrar Post</button>
            </form>
         </header>
      </div>
   );
}
export default withRouter(New);
