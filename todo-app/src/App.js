import React from 'react'
import styled from 'styled-components'
// import './App.css'
import TodosContainer from './components/TodosContainer'

let Container = styled('div')`
  width: 40%;
  height: 400px;
  position: relative;
  margin: 0 auto;
  border-radius: 5px;
`

let Header = styled('div')`
  color: black;
  padding: 5px;
  text-align: center;
  font-family: Tahoma, sans-serif;
`

function App() {
  return (
    <Container>
      <Header>
        <h1>Todo List</h1>
      </Header>
      <TodosContainer />
    </Container>
  )
}

export default App
