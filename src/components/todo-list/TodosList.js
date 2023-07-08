import React, { useEffect } from 'react'
import './todoList.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

//----redux----
import { useDispatch, useSelector } from 'react-redux'
import { deleteData, setEditData, getLocalStorage } from '../features/todoSlice'

function TodosList({ open, setOpen }) {

    const todos = useSelector((state) => state.todosStore.todosData)
    const dispatch = useDispatch()


    const handleDelete = (item) => {

        dispatch(deleteData(item))
    }
    const handleEdit = (item) => {
        dispatch(setEditData(item))
        setOpen(true)
    }


    console.log(todos)

    if (JSON.parse(sessionStorage.getItem("todos"))) {
        console.log(JSON.parse(sessionStorage.getItem("todos")))
    }
    // sessionStorage.removeItem("todos")
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th><p>Name</p></th>
                        <th><p>Task</p></th>
                        <th><p>Due Date </p></th>
                        <th><p>Status</p></th>
                        <th><p>Action</p></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td><p>{item.name}</p></td>
                                    <td><p>{item.task}</p></td>
                                    <td><p>{item.date} </p></td>
                                    <td><p className={item.status}>{item.status}</p></td>
                                    <td>
                                        <div className='actionIconContainer'>
                                            <AiOutlineEdit className='editIcon' onClick={() => handleEdit(item)} />
                                            <AiOutlineDelete className='deleteIcon' onClick={() => handleDelete(item)} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })

                    }

                </tbody>


            </table>
        </>
    )
}

export default TodosList