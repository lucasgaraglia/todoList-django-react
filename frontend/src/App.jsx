
import { TodoForm } from "./components/TodoForm"
import { Table } from "./components/Table"
import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [todos, setTodos] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  // el useEffect se ejecuta apenas carga la pagina, y despues
  // cada vez que sucede una dependencia de la lista de dependencias
  useEffect(() => {
    fetchData()
    // console.log(todos)
  }, [])

  // fetch a la API de django
  const fetchData = async () => {

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/")
      // console.log(response.data)
      setTodos(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="bg-indigo-100 px-8 min-h-screen text-black">
      <header className="py-8">
        <h1 className="text-5xl text-center">ToDo List</h1>
      </header>
      <div className="flex flex-col items-center">
        <TodoForm
        setTodos={setTodos}
        fetchData={fetchData} />
        <Table 
          todos={todos}
          setTodos={setTodos}
          isLoading={isLoading}
        />
      </div>


    </div>

  )
}

export default App
