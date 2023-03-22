import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
import {BiTrash} from "react-icons/bi"
import {BiEditAlt} from "react-icons/bi"
import { IconContext } from 'react-icons/lib'


const TaskComponent = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos")

        if (savedTodos) {
            return JSON.parse(savedTodos)
        }
        else {
            return []
        }
    })
    const [todo, setTodo] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [currentTodo, setCurrentTodo] = useState({})
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const handleInputChange = (e) => {
        setTodo(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: todos.length + 1,
                    text: todo.trim()
                }
            ])
        }
        setTodo("")
    }

    const handleDeleteClick = (id) => {
        const removeItem = todos.filter((todo) => {
            return todo.id !== id
        })
        setTodos(removeItem)
    }

    const handleEditInputChange = (e) => {
        setCurrentTodo({...currentTodo, text: e.target.value})
        console.log(currentTodo);
        
    }

    const handleEditClick = (todo) => {
        setIsEditing(true)
        setCurrentTodo({...todo})
    }

    const handleUpdateTodo = (id, updatedTodo) => {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo
        })
        setIsEditing(false)
        setTodos(updatedItem)
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault()
        handleUpdateTodo(currentTodo.id, currentTodo)
        
    }

    const handleCheckbox = (index) => {
        setTodos((prevTodoList) => 
        prevTodoList.map((todo, todoIndex) => {
            if (index === todoIndex) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        })
        )
    }

  return (
    <>
    {isEditing ?  
        <form className='editForm' onSubmit={handleEditFormSubmit}>
            <h4>Edit Task</h4>

            <div className="editTask">
                <div className="newTask subEdit">
                <label htmlFor="task">New Task</label>
                <input type="text" name="task" id="task" className='editInput' value={currentTodo.text} onChange={handleEditInputChange} placeholder='e.g. Walk The Dog' />
                </div>

                {/* <div className="checked subEdit">
                <label htmlFor="completed">Completed</label>
                <input type="checkbox" name="checked" id="checked" className='checkBox'  />
                </div> */}
            </div>

            <button type="submit">Edit</button>
        </form>
     : (
        <form className='taskForm' onSubmit={handleFormSubmit}>
            <h4>Task Manager</h4>
            <input type="text" name="task" id="task" placeholder='e.g. Walk The Dog' value={todo} onChange={handleInputChange} />

            <button type="submit">Submit</button>
        </form> 
        )}

        <ul className='todoList'>
            {todos.map((todo, index) => {
                return <li key={todo.id} className="listItems">
                    <input type="checkbox" name="checkbox" id="check" className='check' checked={todo.completed} onChange={() => handleCheckbox(index)} />
                    <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.text}</span>  
                            <span className='parentSpan'>
                                <span className='reactIcon' onClick={() => {
                                    handleEditClick(todo)
                                }}>
                    <IconContext.Provider value={{className: "edit"}}>
                        <BiEditAlt />
                    </IconContext.Provider>
                    </span> 
                    
                    <span className='reactIcon' onClick={() => {
                        handleDeleteClick(todo.id)
                    }}>
                        <IconContext.Provider value={{className: "delete"}}>
                            <BiTrash />
                        </IconContext.Provider>
                        </span> 
                            </span>
                    </li>
            })}
        </ul>
    </>
  )
}

export default TaskComponent