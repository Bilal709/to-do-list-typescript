"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class TodoList {
    todos;
    constructor() {
        this.todos = this.loadFromLocalStorage();
    }
    loadFromLocalStorage() {
        try {
            const data = fs.readFileSync("todos.json");
            return JSON.parse(data);
        }
        catch (error) {
            // If file doesn't exist or is empty, return an empty array
            return [];
        }
    }
    saveToLocalStorage() {
        fs.writeFileSync("todos.json", JSON.stringify(this.todos));
    }
    addTask(task, deadline) {
        const newTodo = {
            id: this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1,
            task: task,
            deadline: deadline,
            completed: false
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
    }
    completeTask(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            this.saveToLocalStorage();
        }
        else {
            console.log("Task not found!");
        }
    }
    listTasks(filter) {
        console.log("Todo List:");
        const filteredTodos = filter ? this.todos.filter(todo => todo.task.includes(filter)) : this.todos;
        filteredTodos.forEach(todo => {
            const status = todo.completed ? "Completed" : "Not Completed";
            const deadline = todo.deadline ? ` Deadline: ${todo.deadline}` : "";
            console.log(`${todo.id}. ${todo.task} - ${status}${deadline}`);
        });
    }
}
// Example usage:
const todoList = new TodoList();
todoList.addTask("Buy groceries", "2024-04-30");
todoList.addTask("Finish homework", "2024-04-25");
todoList.listTasks(); // List all tasks
todoList.completeTask(1); // Complete task with id 1
todoList.listTasks(); // List tasks again to see changes
todoList.listTasks("groceries"); // Filter tasks by keyword "groceries"
