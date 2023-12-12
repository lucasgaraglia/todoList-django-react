
import { MdDelete, MdEdit, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import axios from "axios";
import { useState } from "react";

export const Table = ({ todos, setTodos, isLoading }) => {

    // useState del input del modal
    const [editText, setEditText] = useState({
        'body':''
    })

    const modalOnChange = (e) => {
        setEditText({
            ...editText,
            'body': e.target.value
        })
    }


    const handleDelete = async (id) => {
        try {
            // le paso directamente el link de la api con el id
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            // para la nueva lista mostrada, filtro los todos sacando el id eliminado
            // esto es solo para que se actualice en el momento. en el prox fetch se arregla todo
            const newList = todos.filter(todo => todo.id !== id)
            setTodos(newList)
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = async (id, value) => {
        try {
            // patch para hacer el update
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
            const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
            setTodos(newTodos)

        } catch (error) {
            console.error(error)
        }
    }

    const handleCheckbox = async (id, value) => {
        handleEdit(id, {
            'completed': !value
        })
    }

    const showModal_sendId = (item) => {
        setEditText(item)
        document.getElementById('edit_modal').showModal()
        
    }


    return (
        <div className="py-8 ">



            {/* no deja poner divs dentro de tablas, por lo tanto, mientras carga
        no muestro la tabla, muestro directamente el isLoading.
        
        cuando isLoading es false, muestro la primer parte de la tabla,
        despues hago un map de los elementos, y despues muestro la ultima parte de la tabla*/}

            {isLoading ? <div>is loading</div> :
                <div>
                    <table className="w-11/12 max-w-4xl">

                        <thead className="border-b-2 border-black">
                            <tr>
                                <th className="p-3 text-sm font-semibold tracking-wide text-center">Checkbox</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-center">To Do</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-center">Status</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-center">Created</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="">

                            {todos.map((todoItem, index) => {
                                return (


                                    <tr>
                                        <td className="p-3" title={todoItem.id}>
                                            <span className="inline-block text-xl cursor-pointer" onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}>
                                                {todoItem.completed ? <MdOutlineCheckBox /> :
                                                    <MdOutlineCheckBoxOutlineBlank />}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm">{todoItem.body}</td>
                                        <td className="p-3 text-sm text-center ">
                                            {todoItem.completed ? <span className="p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300">Done</span> :
                                                <span className="p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300">Pending</span>}

                                        </td>
                                        <td className="p-3 text-sm"> {todoItem.created ? new Date(todoItem.created).toLocaleString() : 'alibaba'} </td>
                                        <td className="p-3 font-medium grid grid-flow-col items-center mt-2">
                                            <span className="text-xl cursor-pointer" >
                                                {/* este boton lo saque del modal */}
                                                <button onClick={() => showModal_sendId(todoItem)}>
                                                    <MdEdit />
                                                </button>
                                            </span>
                                            <span className="text-xl cursor-pointer" ><MdDelete onClick={() => { handleDelete(todoItem.id) }} /></span>
                                        </td>
                                    </tr>

                                )
                            })

                            }


                        </tbody>
                    </table>


                </div>
            }


            {/* MODAL PARA EDITAR TODOS, DE DAISYUI */}

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="edit_modal" className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Edit your task.</h3>
                    <input type="text" placeholder="Type here" className="input w-full max-w-xs py-4 mt-4 bg-white" value={editText.body} onChange={modalOnChange} />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-success" onClick={() => handleEdit(editText.id,editText)}>Edit</button>
                            <button className="btn btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}
