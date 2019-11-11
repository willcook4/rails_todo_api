import React, { useState } from 'react'
import styled from 'styled-components'
// import axios from 'axios'
// import update from 'immutability-helper'
import Api from '../lib/Api'

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

const AddTodo = () => {
  const [inputValue, setValue] = useState('')

  return (
    <InputContainer>
      <TaskInput
        type='text'
        placeholder='Add a task'
        maxLength='50'
        onKeyPress={async(e) => {
          if (e.key === 'Enter') {
            let resp = await Api.createATodo(e.target.value)
            
            //   .then(resp => {
            //     const todos = update(this.state.todos, {
            //       $splice: [[0, 0, resp.data]]
            //     })
            //     this.setState({
            //       todos: todos,
            //     })
            setValue('')
            //   .catch(error => console.log(error))
          }
        }}
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputContainer>
  )
}

export default AddTodo
