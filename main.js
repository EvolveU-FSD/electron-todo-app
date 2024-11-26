const { app, BrowserWindow, ipcMain } = require("electron/main");
const fs = require("fs");
const path = require("node:path");
let todos;
if (fs.existsSync(path.join(__dirname, "todos.json")) === false) {
  fs.writeFileSync(path.join(__dirname, "todos.json"), "[]");
  todos = [];
} else {
  todos = JSON.parse(fs.readFileSync(path.join(__dirname, "todos.json")));
}
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    alwaysOnTop: true,
  });

  win.loadFile("index.html");
}
ipcMain.on("newTodo", (event, todo) => {
  console.log("newTodo", todo);
  todos.push(todo);
  fs.writeFileSync(path.join(__dirname, "todos.json"), JSON.stringify(todos));
  console.log("todos is now", todos);
});
ipcMain.on("getTodos", (event) => {
  event.sender.send("todos", todos);
});
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
