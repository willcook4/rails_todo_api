import React, { useState } from 'react'
import styled from 'styled-components'

let InputContainer = styled('div')`
  padding: 15px;
`

let TaskInput = styled('input')`
  padding: 10px;
  width: 100%;
  border-radius: 25px;
  box-sizing: border-box;

  ::placeholder {
    font-size: 1.1em;
  }
`

const AddTodo = ({createTodo, setError}) => {
  const [inputValue, setValue] = useState('')

  return (
    <InputContainer>
      <TaskInput
        type='text'
        placeholder='Add a task'
        maxLength='50'
        onKeyPress={(e) => {
          setError('')
          if (e.key === 'Enter') {
            createTodo(e)
            setValue('') // clear the input box
          }
        }}
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputContainer>
  )
}

export default AddTodo
