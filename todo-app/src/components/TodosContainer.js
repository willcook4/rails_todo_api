import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import update from 'immutability-helper'

let TaskList = styled('ul')`
  padding: 0 25px;
  
  li {
    list-style-type: none;
    font-family: Tahoma, sans-serif;
    font-size: 1.2em;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;

    input[type=checkbox] {
      position: relative;
      float: left;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
      margin-left: 5px;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
    }

    input[type=checkbox] + label {
      color: black;
    }
    input[type=checkbox]:checked + label {
      text-decoration: line-through;
      color: #656565;
    }

    span {
      float: right;
      color: red;
      background: rgba(0,0,0,0);
      font-size: 20px;
      font-weight: bold;
      border: 1px solid white;
      border-radius: 50%;
      padding: 10px 5px;
      visibility: hidden;
      opacity: 0;
      line-height: 0;
      margin-right: 5px;
      cursor: default;
    }
  }

  li:hover span {
    color: red;
    visibility: visible;
    opacity: 1;
  }
`

let ListWrapper = styled('div')`
  position: absolute;
  bottom: 50px;
  top: 160px;
  right: 0;
  left: 0;
  overflow: auto;
`

let InputContainer = styled('div')`
  padding: 15px;
`

let TaskInput = styled('input')`
  padding: 10px;
  width: 100%;
  border-radius: 25px;
  box-sizing: border-box;

  ::placeholder {
    /* color: red; */
    font-size: 1.1em;
  }
`

class TodosContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      inputValue: ''
    }
  }

  // Get all the todos from the backend
  getTodos() {
    // NOTE we can use /api/v1/ here rather than http://localhost:3000/api/v1 due to the proxy in our package.json file
    axios.get('/api/v1/todos')
    .then(response => {
      this.setState({todos: response.data}, () => console.log('STATE: ', this.state))
    })
    .catch(error => console.log(error))
  }

  // Send the input value text to the api post create 
  createTodo = (e) => {
    if(e.key === 'Enter'){
      axios.post('/api/v1/todos', { todo: {title: e.target.value } })
      .then(resp => {
        const todos = update(this.state.todos, {
          $splice: [[0, 0, resp.data]]
        })
        this.setState({
          todos: todos,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))
    }
  }

  // reset the add a todo value
  handleChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  // Mark a todo as done
  updateTodo = (e, id) => {
    axios.put(`/api/v1/todos/${id}`, { todo: { done: e.target.checked } })
    .then(resp => {
      const todoIndex = this.state.todos.findIndex(x => x.id === resp.data.id)
      const todos = update(this.state.todos, { [todoIndex]: { $set: resp.data } } )
      this.setState({
        todos: todos
      })
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getTodos()
  }

  render () {
    return (
      <>
        <InputContainer>
          <TaskInput
            type='text'
            placeholder='Add a task'
            maxLength='50'
            onKeyPress={this.createTodo}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </InputContainer>
        <ListWrapper>
          <TaskList>
            {this.state.todos.map(todo => (
              <li key={todo.id}>
                <input type='checkbox'
                       checked={todo.done}
                       onChange={(e) => this.updateTodo(e, todo.id)}
                />
                <label>{todo.title}</label>
                <span>x</span>
              </li>
            ))}
          </TaskList>
        </ListWrapper>
      </>
    )
  }
}

export default TodosContainer