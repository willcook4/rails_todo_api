import React from 'react'
import styled from 'styled-components'

let StyledError = styled('p')`
  margin: 0 0 -10px 25px;
  color: firebrick;
  font-family: tahoma, sans-serif;
  font-size: small;
`

const Errors = ({errors}) => {
  return (
    <StyledError>{errors}</StyledError>
  )
}

export default Errors