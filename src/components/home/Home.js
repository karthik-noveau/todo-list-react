import React, { useEffect, useState } from 'react';
import './home.css'
import '../model/model.css'
import Model from '../model/Model';
import TodosList from '../todo-list/TodosList';

function Home() {

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(!open)
    }

    return (
        <div className='HomeContainer'>

            <div className='HomeContainerBox'>
                <section className='HomeTitleContainer'>
                    <h1>Task List</h1>
                    <button onClick={showModal}>Add</button>
                </section>

                <Model
                    open={open}
                    setOpen={setOpen}
                />
                <TodosList
                    open={open}
                    setOpen={setOpen}
                />
            </div>


        </div>
    )
}

export default Home