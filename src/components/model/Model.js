
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import './model.css'
//-----redux----
import { useDispatch, useSelector } from 'react-redux'
import { setInputData, setTodosData, setEditedData, inputDataEmpty, editDataEmpty } from '../features/todoSlice'


const Model = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.todosStore.inputData)
  const todos = useSelector((state) => state.todosStore.todosData)
  const editTodo = useSelector((state) => state.todosStore.editData)
  const [btnText, setBtnText] = useState("")
  useEffect(() => {
    editTodo ? setBtnText("Update") : setBtnText("Add")
  }, [])
  const hideModal = () => {
    setOpen(false)
    dispatch(inputDataEmpty())
    dispatch(editDataEmpty())
  }
  const FormOnSubmited = (e) => {
    e.preventDefault();

    console.log(!editTodo)
    if (!editTodo) {
      dispatch(setTodosData({ ...inputs, id: uuidv4() }))

    }
    else {
      const data = todos.map((item) => {
        return item.id === editTodo.id ? { ...inputs, id: editTodo.id } : item
      })
      console.log(data)
      dispatch(setEditedData(data))
      dispatch(editDataEmpty())
    }

    dispatch(inputDataEmpty())
    setOpen(false)
  }

  const handleOnChanged = (e) => {
    dispatch(setInputData({ [e.target.name]: e.target.value }))
  }




  return (
    <>
      <Modal
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
      >
        <form onSubmit={FormOnSubmited} className='formContainer'>
          <div className='formContainerBox'>
            <label>Name</label>
            <input type="text" name="name" value={inputs.name} onInput={handleOnChanged} placeholder='Enter your name' />
            <label>Task</label>
            <input type="text" name="task" value={inputs.task} onInput={handleOnChanged} placeholder='Type your Task' />
            <label>Date</label>
            <input type="date" name="date" value={inputs.date} onInput={handleOnChanged} placeholder='date' />
            <label>Status</label>
            <select value={inputs.status} defaultValue="selected" onInput={handleOnChanged} name="status">
              <option value="selected" disabled>select your task</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="NOT-STARTED">NOT-STARTED</option>
              <option value="IN-PROGRESS">IN-PROGRESS</option>
            </select>
            <button type='submit'>{btnText}</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Model;