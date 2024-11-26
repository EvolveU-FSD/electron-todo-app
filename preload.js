const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  addTodo: (todo) => {
    console.log("todo", todo);
    ipcRenderer.send("newTodo", todo);
  },
});

contextBridge.exposeInMainWorld("electronAPI", {
  onRequestTodos: (callback) => {
    console.log("in preload.js");
    ipcRenderer.on("todos", (event, todos) => {
      callback(todos);
    });
    ipcRenderer.send("getTodos");
  },
});
