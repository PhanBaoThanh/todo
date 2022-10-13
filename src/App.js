import './App.scss';
import {useRef,useState,useEffect} from 'react'
import { TodoContext } from './Context/TodoContext';
import TodoItem from './TodoItem.js'

//empty
//add
//changed
//remove
//removeAll


function App() {
  const inputRef = useRef()
  const [data,setData] = useState([])
  const [stt,setStt] = useState("")
  const [id,setId] = useState(0)
  const [value,setValue] = useState("")
  const alertRef = useRef()
  const [isEdit,setIsEdit] = useState(false)
  const [idEdit,setIdEdit] = useState()

  const handleEnterValue = e => {
      if(e.keyCode === 13){
        if(isEdit){
          if(value === "" || value === null)
            setStt("empty")
          else{
            setData(data.map(item => {
              if(item.id === idEdit){
                return {
                  id: item.id,
                  info: value
                }
              }
              return item
            }))
            setIsEdit(false)
            setStt('changed')
          }
        }
        else{
          if(value === "" || value === null)
            setStt("empty")
          else{
            setData(prev => [
              ...prev,
              {
                id: id,
                info: value
              }
            ])
            setId(prev => prev + 1)
            setStt("add")
          }
        }
        setValue("")
      }
    
  }

  const handleClickAddItem = () => {
    if(isEdit){
      if(value === "" || value === null)
            setStt("empty")
          else{
            setData(data.map(item => {
              if(item.id === idEdit){
                return {
                  id: item.id,
                  info: value
                }
              }
              return item
            }))
            setIsEdit(false)
            setStt('changed')
      }
    }
    else{
      if(value === "" || value === null)
        setStt("empty")
      else{
        setData(prev => [
          ...prev,
          {
            id: id,
            info: value
          }
        ])
        setId(prev => prev + 1)
        setStt("add")
      }
    }
    setValue("")
    
  }

  const handleChangeValue = () => {
    setValue(inputRef.current.value)
  }

  const handleClickClearBtn = () => {
    setData([])
    setStt('removeAll')
  }

  useEffect(() => {
    setTimeout(() => {
      alertRef.current.classList.remove("success")
      alertRef.current.classList.remove("danger")
      setStt("")
    },500)
  },[stt])

  return (
    <TodoContext.Provider value={{data,setData,stt,setStt,isEdit,setIsEdit,setValue,idEdit,setIdEdit}}>
      <div className="App">
        <div className='todo'>
          <div ref={alertRef} className={`alert ${stt === "add" || stt ==="changed" ? "success" : stt === 'empty' || stt === 'remove' || stt === 'removeAll' ? "danger" : ""} `}>
            <p>
              {
                stt === 'add' ? 'Item Added To The List' :
                stt === 'changed' ? 'Value Changed' :
                stt === 'empty' ? 'Please Enter Value' :
                stt === 'remove' ? 'Item Removed' :
                stt === 'removeAll' ? 'Empty List' : ''
              }
            </p>
          </div>

          <div className='header'>Grocery Bud</div>

          <div className='input'>
            <input ref={inputRef} value={value} type='text' placeholder="e.g eggs" className='inputItem' onChange={handleChangeValue} onKeyDown={e => handleEnterValue(e)} />
            <button className='btn' onClick={handleClickAddItem}>Submit</button>
          </div>

          <div className='list'>
            {
              data.map(item => (
                <TodoItem key={item.id} idItem={item.id} info={item.info}/>
              ))
            }
            {
              data.length>0 ? (
                <div className='clearBtn'>
                  <p onClick={handleClickClearBtn}>Clear Items</p>
                </div>
              ) : (
                <></>
              )
            }
            
          </div>

        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
