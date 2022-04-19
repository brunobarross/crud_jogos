export default function ajaxConteudo() {
  const jogosContainer = document.querySelector('.jogos--wrapper');
  const formulario = document.forms[0];
  let isLoading = false;

  const ArrayJogos = [];

  const getGames = async (data) =>{
    try{
      const response = await fetch('http://localhost:2000/api/')
      data = await response.json();
      return data;
    }
    catch(err){
      console.log(err)
    }
    
  }


  const deletarGame = async (e) => {
    try{
      const id = e.target.id;
      console.log(id);
      const response = await fetch(`http://localhost:2000/api/${id}`,{
        method: 'DELETE'
      })
      // window.location.reload();
    }

    catch(err){
      console.log(err)
    }

  }


  const initialContent = async () =>{
    const data = await getGames(); 
    const mapData = data.map(
      ({ _id, name, trofeus, dificuldade, data_finalizou }) => {
        return `
        <tr>
          <th scope="row">${name}</th>
          <td>${trofeus}</td>
          <td>${dificuldade}</td>
          <td>${data_finalizou}</td>
          <td><button type="button" class="deletar" id="${_id}">DELETAR</td>
        </tr>
        `;
      },
    ).join('');
  
    jogosContainer.innerHTML = mapData;
  
  }
   initialContent()



   
  const generateContent = () => {
    const mapData = ArrayJogos.map(
      ({ id, nome_jogo, qtd_trofeus, dificuldade, data_finalizado }) => {
        return `
        <tr>
          <th scope="row">${id}</th>
          <td>${nome_jogo}</td>
          <td>${qtd_trofeus}</td>
          <td>${dificuldade}</td>
          <td>${data_finalizado}</td>
        </tr>
        `;
      },
    ).join('');

    jogosContainer.innerHTML = mapData;
  };

  const generateID = () => Math.floor(Math.random() * 100);

  const pushJogos = (nome, trofeus, dificuldade, data) => {
    ArrayJogos.push({
      id: generateID(),
      nome_jogo: nome,
      qtd_trofeus: trofeus,
      dificuldade: dificuldade,
      data_finalizado: data,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nome = form.querySelector('#nomeJogo').value;
    const trofeus = form.querySelector('#qtdTrofeus').value;
    const dificuldade = form.querySelector('#dificuldadeJogo').value;
    let dataFinalizou = form.querySelector('#dataFinalizou').value;
    let data = new Date(dataFinalizou);
    const dataFormatada = new Intl.DateTimeFormat('pt-BR').format(data);
    pushJogos(nome, trofeus, dificuldade, dataFormatada);
    setTimeout(() => {
      console.log('oi');
    }, 1000);
    generateContent();
    form.reset();
    form.querySelector('input').focus();
  };

  document.addEventListener('click', (e) =>{
    if(e.target.classList.contains('deletar')){
      deletarGame(e);
    }
  });

  formulario.addEventListener('submit', handleSubmit);
}
