document.addEventListener("DOMContentLoaded", () => {

    const apiUrlAnimal = "/animal";

    const apiUrlAnimalForImagem = "/animalImagem";

    const apiUrlTagsAnimal = "/tagsAnimal";

    //--------------------------------FUNÇÕES saveData-----------------------------------//

    /**
     * @param {object} imagem imagem a ser salvado pelo backend
     */

    async function saveDataImageAnimal(file) {
      const apiKey = 'a4dcb923f4523e3bd8f0b6a7cdf23f0f'; // My_API_KEY do ImgBB
      const formData = new FormData();
      formData.append('image', file);
  
      try {
          const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
              method: 'POST',
              body: formData
          });
  
          const data = await response.json();
  
          if (data.success) {
              console.log('URL da imagem:', data.data.url);
              return data.data.url; // Retorna a URL da imagem
          } else {
              console.error('Erro ao enviar a imagem:', data.error.message);
          }
      } catch (error) {
          console.error('Erro na requisição:', error);
      }
  };
  

  /**
   * Manda para o BackEnd o objeto animal
   * @param {object} dado objeto a ser salvo no BackEnd
   */
  async function saveDataAnimal(dado) {
    try {
        // Espera pelo resultado da requisição fetch
        const response = await fetch(apiUrlAnimal, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dado)
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao adicionar o animal');
        }

        // Espera pela conversão da resposta em JSON
        const data = await response.json();
        alert("Animal adicionado com sucesso");
        console.log("Dado retornado do save data:", data);
        
        return data;
    } catch (error) {
        console.error('Erro:', error);
        alert("Erro ao adicionar o animal");
        throw error; 
    }
  }

    /**
     * Manda para o JSON qualquer objeto
     * @param {object} dado objeto a ser Atualizado no JSON server
     */
    async function UpdateDataAnimal(dado, id) {
      fetch(`${apiUrlAnimal}/update/${id}`, { // URL base do servidor
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dado)
      }).then(response => response.json())
        .then(dado => {
          console.log(dado);
          alert("Animal " + id + " Atualizado com sucesso");
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao Atualizar o animal " + id + " ou animal inexistente");
        });
     }
    /**
     * Apaga do server os objetos
     * @param {string} id ID do objeto a ser excluído
     */
    async function deleteData(id) {
      try {
          const response = await fetch(`${apiUrlAnimal}/delete/${id}`, { // URL base do servidor
              method: 'POST',
          });

          const data = await response.json();
          console.log(data);
          alert("Animal " + data + " removido com sucesso");
          return data; // Retorna o id do animal removido
      } catch (error) {
          console.error('Erro:', error);
          alert("Erro ao remover o animal ou animal inexistente");
          throw error; // Re-throw o erro para que possa ser capturado pelo chamador
      }
  }

   async function getAnimal(FunctionCallBack, id) {
        fetch(`${apiUrlAnimal}/${id}`)
          .then((res) => res.json())
          .then(data => {
            FunctionCallBack(data);
            return data;
          })
          .catch(error => {
            alert("Animal não encontrado ou inexistente");
            console.error('Erro:', error);
          });
      }

    async function getTodosAnimais(FunctionCallBack) {
        fetch(`${apiUrlAnimal}`)
          .then((res) => res.json())
          .then(data => {
            FunctionCallBack(data);
            return data;
          })
          .catch(error => {
            alert("Animal não encontrado ou inexistente");
            console.error('Erro:', error);
          });
      }



      //--------------------------------FUNÇÕES saveDataTags-----------------------------------//


      async function saveDataTagsAnimal(tagsAnimal){
        fetch(apiUrlTagsAnimal, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            },
            body: JSON.stringify(tagsAnimal)}
        ).then(response => response.json())
         .then(dado => {
          console.log(dado)
          alert("Tags adicionadas com sucesso");
         })
         .catch(error => {
             console.error('Erro:', error);
             alert("Erro ao adicionar as tags");
         });
    }


    async function getTagsAnimal(id) {
      try {
        const response = await fetch(`${apiUrlTagsAnimal}/${id}`);
        
        if (!response.ok) {
          throw new Error("Animal não encontrado ou inexistente");
        }
        
        const data = await response.json();
        return data; // Agora a função retorna os dados corretamente
      } catch (error) {
        alert("Animal não encontrado ou inexistente");
        console.error('Erro:', error);
        return null; // Retorna null em caso de erro
      }
    }

        /**
     * Apaga do server os objetos
     * @param {string} id ID do objeto a ser excluído
     */
        async function deleteDataTagsAnimal(id) {
          try {
              const response = await fetch(`${apiUrlTagsAnimal}/delete/${id}`, { // URL base do servidor
                  method: 'POST',
              });
    
              const data = await response.json();
              console.log(data);
              alert("Tags do animal " + data + " removido com sucesso");
              return data; // Retorna o id do animal removido
          } catch (error) {
              console.error('Erro:', error);
              alert("Erro ao remover Tags do animal " + id + " ou animal inexistente");
              throw error; // Re-throw o erro para que possa ser capturado pelo chamador
          }
      }


    /**
     * Manda para o JSON qualquer objeto
     * @param {object} dado objeto a ser Atualizado no JSON server
     */
    async function UpdateDataTagsAnimal(dado, id) {
      fetch(`${apiUrlTagsAnimal}/update/${id}`, { // URL base do servidor
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dado)
      }).then(response => response.json())
        .then(dado => {
          console.log(dado);
          alert("Tags do Animal " + id + " Atualizado com sucesso");
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao Atualizar Tags do animal " + id + " ou animal inexistente");
        });
     }


    //--------------------------------EventListener - DELETAR animal e tags-----------------------------------//

    const RemoveAnimalBtn = document.querySelector(".botao-remove-animal");

    RemoveAnimalBtn.addEventListener("click", async function() {

      let inputIdRemoveAnimal = document.querySelector("#id-remove-animal");

      let idRemoveAnimal = inputIdRemoveAnimal.value;
  
      try {
          // Aguarde a conclusão da exclusão do animal
          await deleteDataTagsAnimal(idRemoveAnimal);
         
          await deleteData(idRemoveAnimal);
          
          getTodosAnimais(ListaTodosAnimais);
      } catch (error) {
          console.error("Erro ao remover animal:", error);
      }

      inputIdRemoveAnimal.value = "";
   });


    //-------------------------------- FUNÇÕES SaveData -----------------------------------//

     const CadastrarAnimalBtn = document.querySelector(".botao-cadastra-animal");

  
     CadastrarAnimalBtn.addEventListener("click", async () => {

      //----------------------------------Animal-----------------------------------//

      // Selecionando os elementos diretamente
      let inputImagemAnimal = document.querySelector("#imagem-input-animal"); // input imagem

      let inputNomeAnimal = document.querySelector("#nome-input-animal");
      let inputSexoAnimal = document.querySelector('#sexo-input-animal');
      let inputIdadeAnimal = document.querySelector("#idade-input-animal");
      let inputRacaAnimal = document.querySelector("#raca-input-animal");
      let inputVacinasAnimal = document.querySelector("#vacinas-input-animal");
      let inputCastradoAnimal = document.querySelector("#castrado-input-animal");
      let inputHistoriaAnimal = document.querySelector("#historia-input-animal");
      let inputPorteAnimal = document.querySelector('#porte-input-animal');
      let inputEspecieAnimal = document.querySelector('#especie-input-animal');


      
      // Agora, acessamos os valores dos inputs
      let castradoBoolean = inputCastradoAnimal.value === "true";

      //Trata a image, inserida
      if (inputImagemAnimal.files[0]) {
         imagemInserida = await saveDataImageAnimal(inputImagemAnimal.files[0]);
      } else {
          imagemInserida = "../../imgs/imagsInputs/ImagemInexistente.png";
      }

      let Animal = {
          imagem: imagemInserida,
          nome: inputNomeAnimal.value,
          sexo: inputSexoAnimal.value,
          idade: inputIdadeAnimal.value,
          raca: inputRacaAnimal.value,
          vacinas: inputVacinasAnimal.value,
          castrado: castradoBoolean,
          historia: inputHistoriaAnimal.value,
          porte: inputPorteAnimal.value,
          especie: inputEspecieAnimal.value
      };
      
      let id = await saveDataAnimal(Animal);
      // Chama a função para salvar os dados

      // Limpar os campos após o salvamento
      inputImagemAnimal.value = "";
      inputNomeAnimal.value = "";
      inputSexoAnimal.value = "";
      inputIdadeAnimal.value = "";
      inputRacaAnimal.value = "";
      inputVacinasAnimal.value = "";
      inputCastradoAnimal.value = ""; 
      inputHistoriaAnimal.value = "";
      inputPorteAnimal.value = "";
      inputEspecieAnimal.value = "";
      inputImagemAnimal.value = ""; //Limpa imagem do campo

      //----------------------------------Tags insert-----------------------------------//

      let inputTag1Animal = document.querySelector('#tag1-input-animal');
      let inputTag2Animal = document.querySelector('#tag2-input-animal');
      let inputTag3Animal = document.querySelector('#tag3-input-animal');

      let tagsAnimal = {
          conteudo_tag: [inputTag1Animal.value, inputTag2Animal.value, inputTag3Animal.value],
          id_animal: id
      };

      console.log(tagsAnimal);

      await saveDataTagsAnimal(tagsAnimal);

      inputTag1Animal.value = "";
      inputTag2Animal.value = "";
      inputTag3Animal.value = "";

  });

  //-------------------------------- END - FUNÇÕES SaveData -----------------------------------//





     //-------------------------------- FUNÇÕES UPDATE Data -----------------------------------//

     const AtualizarAnimalBtn = document.querySelector(".botao-atualiza-animal");

  
     AtualizarAnimalBtn.addEventListener("click", async () => {

           // Selecionando os elementos diretamente
           let inputImagemAnimal = document.querySelector("#imagem-input-animal"); // input imagem

           let inputNomeAnimal = document.querySelector("#nome-input-animal");
           let inputSexoAnimal = document.querySelector('#sexo-input-animal');
           let inputIdadeAnimal = document.querySelector("#idade-input-animal");
           let inputRacaAnimal = document.querySelector("#raca-input-animal");
           let inputVacinasAnimal = document.querySelector("#vacinas-input-animal");
           let inputCastradoAnimal = document.querySelector("#castrado-input-animal");
           let inputHistoriaAnimal = document.querySelector("#historia-input-animal");
           let inputPorteAnimal = document.querySelector('#porte-input-animal');
           let inputEspecieAnimal = document.querySelector('#especie-input-animal');
     
           let inputIdAnimal = document.querySelector("#id-atualiza-animal");
     
           
           // Agora, acessamos os valores dos inputs
           let castradoBoolean = inputCastradoAnimal.value === "true";
     
           //Trata a image, inserida
           if (inputImagemAnimal.files[0]) {
              imagemInserida = await saveDataImageAnimal(inputImagemAnimal.files[0]);
         } else {
             imagemInserida = "../../imgs/imagsInputs/ImagemInexistente.png";
         }
       
     
           let Animal = {
               imagem: imagemInserida,
               nome: inputNomeAnimal.value,
               sexo: inputSexoAnimal.value,
               idade: inputIdadeAnimal.value,
               raca: inputRacaAnimal.value,
               vacinas: inputVacinasAnimal.value,
               castrado: castradoBoolean,
               historia: inputHistoriaAnimal.value,
               porte: inputPorteAnimal.value,
               especie: inputEspecieAnimal.value
           };
           
           
           // Chama a função para salvar os dados
           UpdateDataAnimal(Animal, inputIdAnimal.value);
     
     
           // Limpar os campos após o salvamento
           inputImagemAnimal.value = "";
           inputNomeAnimal.value = "";
           inputSexoAnimal.value = "";
           inputIdadeAnimal.value = "";
           inputRacaAnimal.value = "";
           inputVacinasAnimal.value = "";
           inputCastradoAnimal.value = ""; 
           inputHistoriaAnimal.value = "";
           inputPorteAnimal.value = "";
           inputEspecieAnimal.value = "";
           inputImagemAnimal.value = ""; //Limpa imagem do campo
     
           //----------------------------------Tags update-----------------------------------//

           let inputTag1Animal = document.querySelector('#tag1-input-animal');
           let inputTag2Animal = document.querySelector('#tag2-input-animal');
           let inputTag3Animal = document.querySelector('#tag3-input-animal');
     
           let tagsAnimal = {
               conteudo_tag: [inputTag1Animal.value, inputTag2Animal.value, inputTag3Animal.value],
               id_animal: inputIdAnimal.value
           };
     
           console.log(tagsAnimal);
     
           await UpdateDataTagsAnimal(tagsAnimal, inputIdAnimal.value);
     
           inputTag1Animal.value = "";
           inputTag2Animal.value = "";
           inputTag3Animal.value = "";
           inputIdAnimal.value = "";
  });

  //-------------------------------- END - FUNÇÕES UpdateData -----------------------------------//



  //----------------Mostra animal solicitado em JSON -----------------//

    const DetalharAnimalJSONBtn = document.querySelector(".botao-detalha-animal-JSON"); 

    DetalharAnimalJSONBtn.addEventListener("click", function() {

        const inputIdAnimal= document.querySelector("#id-detalha-animal");

        getAnimal(MostraAnimalVisualizavel_EmJSON, inputIdAnimal.value)

        inputIdAnimal.value = "";
        
    });

    function MostraAnimalVisualizavel_EmJSON(animal) {

        window.location.href = "http://localhost:8080/animal/" + animal.id_animal;
    }

      //----------------Mostra TODOS os animal solicitado no html -----------------//

      const botaolistaAnimaisBtn = document.querySelector(".botao-lista-animais");

      botaolistaAnimaisBtn.addEventListener("click", function(){
          getTodosAnimais(ListaTodosAnimais)
      });
  
      async function ListaTodosAnimais(animais) {
        const divAnimalVisualizavel = document.querySelector(".pagina-container-Animal-Visualizavel");
        divAnimalVisualizavel.style.display = "flex";
        divAnimalVisualizavel.innerHTML = `<br><h1 class="titulo">Animais Visualizavel</h1>`;
      
        // Mapeia cada animal para uma promessa de HTML gerada
        const promises = animais.map(async (animal) => {
          let tags = await getTagsAnimal(animal.id_animal);
      
          return `
            <div class="Card-Animal-Visualizavel">
              <div>
                <img id="avatarPrincipalJP" src="${animal.imagem}" alt="animal">
              </div>
              <div class="informacoesJP">
                <div id="nomeAutorJP">
                  <p>Nome: ${animal.nome}</p>
                </div>
                <p><strong>id do animal:</strong> ${animal.id_animal}</p>
                <p><strong>Idade:</strong> ${animal.idade}</p>
                <p><strong>Sexo:</strong> ${animal.sexo}</p>
                <p><strong>Raça:</strong> ${animal.raca}</p>
                <p><strong>Vacinação:</strong> ${animal.vacinas}</p>
                <p><strong>Castrado:</strong> ${animal.castrado}</p>
                <p><strong>Porte:</strong> ${animal.porte}</p>
                <p><strong>Espécie:</strong> ${animal.especie}</p>
                <p><strong>Tags: </strong>${tags.conteudo_tag.join(", ")}</p>
                <div id="descricaoJP">
                  <h4><strong>História:</strong></h4>
                  <p>${animal.historia}</p>
                </div>
              </div>
            </div>`;
        });
      
        // Espera todas as promessas serem resolvidas e adiciona o conteúdo gerado ao innerHTML
        const animalCards = await Promise.all(promises);
        divAnimalVisualizavel.innerHTML += animalCards.join("");
      
        // Adiciona o botão de fechar após o loop
        divAnimalVisualizavel.innerHTML += `<button type="submit" class="botao-fechaAba-Animal-Visualizavel">Fechar</button>`;
      
        // Configura o evento de clique para fechar a aba
        const FecharAbaAnimalVisualizavelBtn = document.querySelector(".botao-fechaAba-Animal-Visualizavel");
        FecharAbaAnimalVisualizavelBtn.addEventListener("click", function() {
          divAnimalVisualizavel.style.display = "none";
        });
      }
      


    //----------------Mostra animal solicitado no html -----------------//


    const DetalharAnimalBtn = document.querySelector(".botao-detalha-animal");



    DetalharAnimalBtn.addEventListener("click", function(){

        const inputIdAnimal= document.querySelector("#id-detalha-animal");

        getAnimal(MostraAnimalVisualizavel, inputIdAnimal.value)

        inputIdAnimal.value = "";
    });


    async function MostraAnimalVisualizavel(animal){

        const divAnimalVisualizavel = document.querySelector(".pagina-container-Animal-Visualizavel");

        divAnimalVisualizavel.style.display = "flex"

        let tags = await getTagsAnimal(animal.id_animal);

        divAnimalVisualizavel.innerHTML = `<br><h1 class="titulo">Animal visualizavel</h1>

                <div class="Card-Animal-Visualizavel">

          <div>
            <img id="avatarPrincipalJP" src="${animal.imagem}" alt="animal do animal ${animal.nome}">
          </div>
          <div class="informacoesJP">
            <div id="nomeAutorJP">
              <p>Nome: ${animal.nome}</p>
            </div>
            <p><strong>id do animal:</strong> ${animal.id_animal}</p>
            <p><strong>Idade:</strong> ${animal.idade}</p>
            <p><strong>Sexo:</strong> ${animal.sexo}</p>
            <p><strong>Raça:</strong> ${animal.raca}</p>
            <p><strong>Vacinação:</strong> ${animal.vacinas}</p>
            <p><strong>Castrado:</strong> ${animal.castrado}</p>
            <p><strong>Porte:</strong> ${animal.porte}</p>
            <p><strong>Espécie:</strong> ${animal.especie}</p>
            <p><strong>Tags: </strong>${tags.conteudo_tag.join(", ")}</p>
            <div id="descricaoJP">
              <h4><strong>História:</strong></h4>
              <p>
                ${animal.historia}
              </p>
            </div>
          </div>
        </div>`;

        divAnimalVisualizavel.innerHTML += `<button type="submit" class="botao-fechaAba-Animal-Visualizavel">Fechar</button>`


        const FecharAbaAnimalVisualizavelBtn = document.querySelector(".botao-fechaAba-Animal-Visualizavel");

        FecharAbaAnimalVisualizavelBtn.addEventListener("click", function(){


        divAnimalVisualizavel.style.display = "none"
       });

    }


        //--------------------------------End - EventListener Botões-----------------------------------//


}); // <-- Aqui está a chave de fechamento do primeiro bloco DOMContentLoaded

