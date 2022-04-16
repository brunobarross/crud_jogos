export default function modalCriacao() {
  const fundoPreto = document.querySelector('.fundo--preto');
  const btnAbrir = document.querySelector('#abrirCriacao');
  const obody = document.body;

  const abrirModal = () => {
    obody.classList.add('modalCriacao');
  };

  const fecharModal = () => {
    obody.classList.remove('modalCriacao');
  };

  fundoPreto.addEventListener('click', fecharModal);
  btnAbrir.addEventListener('click', abrirModal);
}
