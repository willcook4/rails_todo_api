import React from 'react'
import styled from 'styled-components'

let TaskList = styled('ul')`
  padding: 0 25px;
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
          <TaskList />
        </ListWrapper>
      </>
    )
  }
}

export default TodosContainer