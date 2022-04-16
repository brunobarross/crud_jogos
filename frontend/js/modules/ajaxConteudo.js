export default function ajaxConteudo() {
  const jogosContainer = document.querySelector('.jogos--wrapper');
  const formulario = document.forms[0];
  let isLoading = false;

  const ArrayJogos = [];

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
  };

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

  formulario.addEventListener('submit', handleSubmit);
}
