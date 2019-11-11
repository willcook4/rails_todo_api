import React, { useState, useEffect } from 'react'
import axios from 'axios' 
import update from 'immutability-helper'
import AddTodo from './AddTodo'
import TaskList from './TaskList'
import Errors from './Errors'

// note due to the proxy in the package.json this doesn't need to be https://www.....
const BASE_URL = '/api/v1/todos'

const TodosContainer = () => {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('')

  useEffect(
    () => {
      (async() => {
        const response = await axios.get(BASE_URL)
        setTodos(response.data)
        })()
      },
      [todos.length]
  )

   // Send the input value text to the api create 
  let createTodo = async(e) => {
    if(e.key === 'Enter') {
      if(e.target.value.length < 5) {
        setError('Todo is too short, try a longer description')
        return
      }

      axios.post(BASE_URL, { todo: { title: e.target.value } }).then(resp => {
        const updatedTodos = update(todos, {
          $splice: [[0, 0, resp.data]]
        })
        setTodos(updatedTodos)
      })
      .catch(e => console.log('api error: ', e))
    }
  }

  // Mark a todo as done/not done
  let updateTodo = async(e, id) => {
    let resp = await axios.put(`${BASE_URL}/${id}`, { todo: { done: e.target.checked } })
    const todoIndex = todos.findIndex(x => x.id === resp.data.id)
    const updatedTodos = update(todos, { [todoIndex]: { $set: resp.data } } )
    setTodos(updatedTodos)
  }

  return (
    <>
      <Errors errors={error} />
      <AddTodo createTodo={createTodo} setError={setError} />
      <TaskList todos={todos} updateTodo={updateTodo} />
    </>
  )
}

export default TodosContainer