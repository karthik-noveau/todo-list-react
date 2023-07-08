import { createSlice } from '@reduxjs/toolkit'



export const todoSlice = createSlice({
    name: 'todoSection',
    initialState: {
        inputData: {},
        todosData:  JSON.parse(sessionStorage.getItem("todos")) || [],
        editData: null
    },
    reducers: {
        setInputData: (state, action) => {
            state.inputData = { ...state.inputData, ...action.payload }

        },
        setTodosData: (state, action) => {
            state.todosData = [...state.todosData, action.payload]
            console.log(state.todosData)
            sessionStorage.setItem("todos", JSON.stringify(state.todosData))
           
        },
        deleteData: (state, action) => {
            state.todosData = state.todosData.filter((item) => item.id != action.payload.id)
            console.log(action.payload)
            sessionStorage.setItem("todos", JSON.stringify(state.todosData))
        },
        setEditData: (state, action) => {
            const data = state.todosData.find((item) => item.id === action.payload.id)
            state.inputData = data
            state.editData = data
        },
        setEditedData: (state, action) => {
            console.log(action.payload)
            state.todosData = action.payload
            sessionStorage.setItem("todos", JSON.stringify(state.todosData))
        },
        inputDataEmpty: (state, action) => {
            state.inputData.id = ""
            state.inputData.name = ""
            state.inputData.task = ""
            state.inputData.date = ""
            state.inputData.status = ""
        },
        editDataEmpty: (state, action) => {
            state.editData = null
        },
        getLocalStorage: (state, action) => {
            state.todosData = action.payload
        }
    }
})


export const { setInputData, setTodosData, deleteData, setEditData, setEditedData, inputDataEmpty, editDataEmpty, getLocalStorage } = todoSlice.actions

export default todoSlice.reducer