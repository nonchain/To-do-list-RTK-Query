import { useGetTodoQuery } from "../api/apiSlice"
import { useState } from "react"

const TodoList = () => {
   const [newTodo, setNewTodo] = useState('');
   const {
      data: todos,
      isLoading, isError, isSuccess, error
   } = useGetTodoQuery();

   const handleSubmit = (e) => {
      e.preventDefault();
      setNewTodo('')
   }

   const newItemSection =
      <form onSubmit={handleSubmit}>
         <label htmlFor="new-todo">Enter a new todo item</label>
         <div className="new-todo">
            <input
               type="text"
               id="new-todo"
               value={newTodo}
               onChange={(e) => setNewTodo(e.target.value)}
               placeholder="Enter new todo"
            />
         </div>
         <button className="submit">
            <i className="ri-upload-cloud-2-line"></i>
         </button>
      </form>


   let content;
   // Define conditional content

   return (
      <main>
         <h1>Todo List</h1>
         {newItemSection}
         {content}
      </main>
   )
}
export default TodoList