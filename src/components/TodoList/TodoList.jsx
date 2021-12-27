import React, { Component } from 'react';

import './style.scss';

export class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      prevId: 0,
      inputTxt: '',
    }
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleRemoving = this.handleRemoving.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleText = (e) => {
    this.setState((_state, _props) => ({
      inputTxt: e.target.value,
    }))
  }

  handleAddTask = () => {
    this.setState((state, _props) => ({
      tasks: [...state.tasks, {
        id: state.prevId + 1,
        text: state.inputTxt,
        isCompleted: false,
      }],
      prevId: state.prevId + 1,
      inputTxt: '',
    }))
  }

  handleRemoving = (id) => {
    const novoArray = this.state.tasks.filter((task) => task.id !== id);

    this.setState((_state, _props) => ({
      tasks: [...novoArray],
    }))
  }

  handleCheck = (id) => {
    const checkedTasks = this.state.tasks.map((task) => {
      if(task.id === id) task.isCompleted = !task.isCompleted;
      return task;
    })

    this.setState((_state, _props) => ({
      tasks: [...checkedTasks],
    }))
  }
  
  render() {
    return (
      <div className="todo-list">
        <header className="input-container">
          <h1>Minhas Tasks</h1>
          <div className="inputs">
            <input onChange={this.handleText} value={this.state.inputTxt}
              type="text" placeholder="Adicionar nova tarefa" />
            <button onClick={this.handleAddTask}>
              <i className="far fa-check-square"></i>
            </button>
          </div>
        </header>
        <ul className="list">
            {this.state.tasks.map((task) => (
              <li key={task.id}>
                <div className={task.isCompleted? 'isCompleted': ''} data-task="task">
                  <input type="checkbox" onClick={() => this.handleCheck(task.id)}/>
                  <p>{task.text}</p>
                </div>
                <button onClick={() => this.handleRemoving(task.id)}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
