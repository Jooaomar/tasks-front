import axios from 'axios';

async function getTasks() {
  const response = await axios.get('http://localhost:8080/tarefas');
  return response.data;
}


const tasks = await getTasks();

const taskListElement = document.querySelector('#task-list');

//  Buscando dados



async function buscarDados(url) {
  const response = await axios.get(url);
  return response.data;
}

async function exibirTarefas() {
  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.descricao;
    taskListElement.appendChild(taskElement);
  });

  try {
      const url = 'http://0.0.0.0:8080/tarefas';
      const dados = await buscarDados(url);

      dados.forEach(task => {
      const taskElement = document.createElement('li');
      taskElement.textContent = task.descricao;
      taskListElement.appendChild(taskElement);
    });
  } catch (error) {
    console.error(error);
  }
}

exibirTarefas();




// Enviando dados

const form = document.getElementById('create-task-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskDescription = document.getElementById('task-description').value;
  const responsavel = document.getElementById('task-responsavel').value;
  const taskPriority = document.getElementById('task-priority').value;
  const taskSituacao = document.getElementById('task-situacao').value;
  const taskNivel = document.getElementById('task-nivel').value;
  const taskData = {
    id: 0,
    responsavel: responsavel,
    descricao: taskDescription,
    nivel: taskNivel,
    situacao: taskSituacao,
    prioridade: taskPriority,
  };

  axios.post('http://localhost:8080/adicionar/', taskData)
    .then((response) => {
      console.log('Tarefa criada com sucesso:', response.data);
      // Aqui você pode redirecionar para a página de lista de tarefas ou atualizar a lista na mesma página
      location.reload();
    })
    .catch((error) => {
      console.error('Erro ao criar tarefa:', error);
    });
});
