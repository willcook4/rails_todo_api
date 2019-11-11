import React from 'react'
import styled from 'styled-components'

let ListWrapper = styled('div')`
  position: absolute;
  bottom: 50px;
  top: 160px;
  right: 0;
  left: 0;
  overflow: auto;
`

let StyledTaskList = styled('ul')`
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
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      margin: 5px 10px 5px 0;
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

const TaskList = ({todos, updateTodo}) => {
  console.log('Tasklist render')
  return (
    <ListWrapper>
      <StyledTaskList>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type='checkbox'
                    checked={todo.done}
                    onChange={(e) => {
                      updateTodo(e, todo.id)
                    }}
            />
            <label>{todo.title}</label>
            <span onClick={(e) => console.log('deleting id: ', todo.id)}>delete</span>
          </li>
        ))}
      </StyledTaskList>
    </ListWrapper>
  )
}

export default TaskList