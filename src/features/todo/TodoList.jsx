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
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
         <label htmlFor="new-todo" >Enter a new todo item</label>
         <div className="flex gap-3 items-center">
            <input
               className="px-3 py-2 rounded border border-gray-400 focus:border-gray-800 duration-200"
               type="text"
               id="new-todo"
               value={newTodo}
               onChange={(e) => setNewTodo(e.target.value)}
               placeholder="Enter new todo"
            />
            <button className="rounded-full w-9 h-9 flex items-center justify-center bg-blue-500 text-white">
               <i className="ri-add-line"></i>
            </button>
         </div>

      </form>


   let content;
   if (isLoading) content = <p>Loading...</p>
   if (isSuccess) content = JSON.stringify(todos);

   return (
      <main className="flex flex-col p-8 gap-8">
         <h1 className="text-4xl text-slate-800 font-semibold">Todo List</h1>
         {newItemSection}
         {content}
      </main>
   )
}
export default TodoList