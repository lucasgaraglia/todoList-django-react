
import { useState } from "react"
import axios from "axios"

export const TodoForm = ({setTodos, fetchData}) => {

  const [newTodo, setNewTodo] = useState({
    body: '',
  })

  // controla el valor de newTodo con el cambio del input
  const handleChange = (e) => {
    setNewTodo(prev => ({
      ...prev,
      'body': e.target.value
    }))
    // console.log(newTodo)
  }

  // post request, para enviar el todo a la bdd
  const postTodo = async () => {
    try {
          // axios.post(a_donde, que)
      await axios.post('http://127.0.0.1:8000/api/todo/', newTodo)
      // setTodos( prevTodos => [...prevTodos, newTodo] )
      fetchData()
      // vacio devuelta el value
      setNewTodo({
        'body': ''
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="text-white flex flex-row">
        <input id="input_todo" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
        onChange={handleChange} 
        value={newTodo.body}
        // tambien posteamos con Enter
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            postTodo()
          }
        }}/>
        <button className="btn btn-success ml-2" onClick={postTodo}>Add</button>
    </div>
  )
}
