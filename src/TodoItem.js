import React from 'react'
import './todo.scss'
import { useContext } from 'react'
import { TodoContext } from './Context/TodoContext'

const TodoItem = ({idItem,info}) => {
    const {
        data,
        setData,
        setStt,
        setIsEdit,
        setValue,
        setIdEdit
    } = useContext(TodoContext)

    const handleRemoveItem = () => {
        setData(data.filter(item => item.id !== idItem))
        setStt("remove")
    }

    const handleClickEditBtn = () => {
        setIsEdit(true)
        setValue(info)
        setIdEdit(idItem)
    }
  return (
    <div className='listItem'>
        <p>{info}</p>
        <div className='listBtn'>
            <div className='listBtnItem green' onClick={handleClickEditBtn}>Edit</div>

            <div className='listBtnItem red' onClick={handleRemoveItem}>Delete</div>
        </div>
    </div>
  )
}

export default TodoItem