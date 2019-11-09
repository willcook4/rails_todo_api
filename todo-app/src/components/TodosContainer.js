import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

let TaskList = styled('ul')`
  padding: 0 25px;

  li {
    list-style-type: none;
    font-family: Tahoma, sans-serif;
    font-size: 1.2em;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }

  li:hover {
    // visibility: visible;
    // opacity: 1;
    color: firebrick;
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
`

class TodosContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  getTodos() {
    // NOTE we can use /api/v1/ here rather than http://localhost:3000/api/v1 due to the proxy in our package.json file
    axios.get('/api/v1/todos')
    .then(response => {
      this.setState({todos: response.data}, () => console.log('STATE: ', this.state))
    })
    .catch(error => console.log(error))
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
            maxLength='50' />
        </InputContainer>
        <ListWrapper>
          <TaskList>
            {this.state.todos.map(todo => (
              <li key={todo.id}>
                <input type='checkbox' />
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