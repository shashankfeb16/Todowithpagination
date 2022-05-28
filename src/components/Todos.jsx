import React, { useEffect, useState } from 'react'
import axios from "axios"

const Todos = () => {
    const [page,setPage] = useState(1);
  const [totalcount,setTotalcount] = useState(0)
  const [limit,setLimit] = useState(5)
    const [newTodo,setNewTodo] = useState("")
    const [todos,setTodos] = useState([])

    const saveInfo = ()=>{
        // call api to save this info in backend
        fetch("  http://localhost:8080/todos",{
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({
                value: newTodo,
                isCompleted: false,
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            setTodos([...todos,data])
            setNewTodo("")
        })
    }
//    useEffect(()=>{
//     fetch("  http://localhost:8080/todos/?_page=1&_limit=5")
//     .then((res)=> res.json())
//     .then((data)=>{
//       setTodos(data)
//     })
//    },[])
useEffect(() => {
    axios.get(`http://localhost:8080/todos/?_page=${page}&_limit=${limit}`).then((res)=>{
      console.log(res);
      setTodos(res.data);
      setTotalcount(Number(res.headers["x-total-count"]))
    })
  }, [page])
  return (
    <div>Todo
        <div>
            <input type="text" placeholder='Write Something' onChange={({target})=>setNewTodo(target.value)} value={newTodo} />
            <button onClick={saveInfo}>+</button>
        </div>
        {todos.map((todo)=>{
           return <div key={todo.id}>{todo.value}</div>
        })}
        <div>
        <button onClick={()=>setPage(page-1)} disabled={page<=1}>{`<`}</button>
        <button onClick={()=>setPage(page+1)} disabled={totalcount<page*limit}>{`>`}</button>
        </div>
    </div>
  )
}

export default Todos