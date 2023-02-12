(() => {
  const form = document.querySelector('#form');
  const input = document.querySelector('#task');
  const table = document.querySelector('#table');
  const tbody = document.querySelector('#tasks');

  // Função para ler as tarefas do localStorage
  const carregarTarefas = () => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach((tarefa) => {
      criarTarefa(tarefa);
    });
  };

  // Função para salvar as tarefas no localStorage
  const salvarTarefas = () => {
    const tarefas = [...tbody.querySelectorAll('tr')].map((tarefa) => {
      return tarefa.querySelector('td').textContent;
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  };

  const criarTarefa = (nomeTarefa) => {
    const tarefa = document.createElement('tr');
    const colunaTarefa = document.createElement('td');
    const colunaAcoes = document.createElement('td');
    const botaoConcluir = document.createElement('button');
    const botaoEditar = document.createElement('button');
    const botaoDeletar = document.createElement('button');

    colunaTarefa.textContent = nomeTarefa;
    botaoConcluir.textContent = 'Concluir';
    botaoEditar.textContent = 'Editar';
    botaoDeletar.textContent = 'Deletar';

    botaoConcluir.addEventListener('click', () => {
      tarefa.classList.toggle('concluida');
      if (botaoConcluir.textContent === 'Concluir') {
        botaoConcluir.textContent = '✔️';
        colunaTarefa.style.textDecoration = 'line-through';
      } else {
        botaoConcluir.textContent = 'Concluir';
        colunaTarefa.style.textDecoration = 'none';
      }
      salvarTarefas();
    });

    botaoEditar.addEventListener('click', () => {
      const novoNome = prompt('Digite o novo nome da tarefa');
      if (novoNome) {
        colunaTarefa.textContent = novoNome;
        salvarTarefas();
      }
    });

    botaoDeletar.addEventListener('click', () => {
      tarefa.remove();
      salvarTarefas();
    });

    colunaAcoes.appendChild(botaoConcluir);
    colunaAcoes.appendChild(botaoEditar);
    colunaAcoes.appendChild(botaoDeletar);

    tarefa.appendChild(colunaTarefa);
    tarefa.appendChild(colunaAcoes);

    tbody.appendChild(tarefa);

    salvarTarefas();
  };

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (input.checkValidity()) {
      criarTarefa(input.value);
      input.value = '';
    }
  });

  carregarTarefas();
})();
