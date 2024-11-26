window.onload = () => {
  console.log("Renderer.js loaded");
  window.electronAPI.onRequestTodos((todos) => {
    document.getElementById("todos").innerHTML = todos
      .map((todo) => `<li>${todo}</li>`)
      .join("");
  });
};

const sendTodo = () => {
  const todoInput = document.getElementById("newTodo");
  const newTodo = todoInput.value;
  console.log("in renderer.js", newTodo);
  window.electron.addTodo(newTodo);
  todoInput.value = "";
  document.getElementById("todos").innerHTML += `<li>${newTodo}</li>`;
};
