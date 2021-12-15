import React, { Component } from 'react';

import './style.scss';

export class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      inputText: '',
    };

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleCheckTask = this.handleCheckTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  handleAddTask() {
    this.setState((state) => ({
      tasks: [
        ...state.tasks,
        { id: Math.random(), title: state.inputText, isCompleted: false },
      ],
      inputText: '',
    }));
  }

  handleCheckTask(id) {
    const checkedTasks = this.state.tasks.map((task) => {
      if (task.id === id) task.isCompleted = !task.isCompleted;
      return task;
    });

    this.setState((state) => ({
      tasks: [...checkedTasks],
    }));
  }

  handleDeleteTask(id) {
    const filteredTasks = this.state.tasks.filter((task) => task.id !== id);

    this.setState((state) => ({
      tasks: [...filteredTasks],
    }));
  }

  render() {
    return (
      <div className="todo-list">
        <header className="input-container">
          <h1>Minhas Tasks</h1>
          <div className="inputs">
            <input
              type="text"
              placeholder="Adicionar nova tarefa"
              onChange={(event) => {
                this.setState((state) => ({
                  inputText: event.target.value,
                }));
              }}
              value={this.state.inputText}
            />
            <button onClick={this.handleAddTask}>
              <i className="far fa-check-square"></i>
            </button>
          </div>
        </header>
        <ul className="list">
          {this.state.tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isCompleted ? 'isCompleted' : ''}
                data-task="task"
              >
                <input
                  type="checkbox"
                  onClick={() => this.handleCheckTask(task.id)}
                />
                <p>{task.title}</p>
              </div>
              <button onClick={() => this.handleDeleteTask(task.id)}>
                <i className="far fa-trash-alt"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
