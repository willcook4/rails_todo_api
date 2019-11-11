// All Api calls to be made from here
import React from 'react'
import axios from 'axios'

const APIURI = '/api/v1/todos'

class Api {
  /**
   * CREATE a Todo
  */
  createATodo(title) {
    axios.post(APIURI, { todo: {title: title } })
      .then(resp => {
        return resp.data
      console.log('created a todo: ', resp.data)  
    })
    .catch(err => console.log(err))
  }
}

export default new Api() 