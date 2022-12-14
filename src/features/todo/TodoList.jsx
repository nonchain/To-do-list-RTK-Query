import {
   useGetTodoQuery,
   useAddTodoMutation,
   useUpdateTodoMutation,
   useDeleteTodoMutation
} from "../api/apiSlice"
import { useState } from "react"

const TodoList = () => {
   const [newTodo, setNewTodo] = useState('');

   const { data: todos, isLoading, isError, isSuccess, error } = useGetTodoQuery();
   const [addTodo] = useAddTodoMutation();
   const [updateTodo] = useUpdateTodoMutation();
   const [deleteTodo] = useDeleteTodoMutation();

   const handleSubmit = (e) => {
      e.preventDefault();
      addTodo({ userId: 1, title: newTodo, completed: false });
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
   if (isSuccess) content = todos.map(todo => {
      return (
         <article key={todo?.id} className="p-4 w-full bg-gray-100 flex items-center justify-between rounded-md">
            <div className="flex gap-2">
               <input
                  type="checkbox"
                  checked={todo?.completed}
                  id={todo?.id}
                  onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
               />
               <label htmlFor={todo.id}>{todo.title}</label>
            </div>
            <button className="" onClick={() => deleteTodo({ id: todo.id })}>
               <i className="ri-delete-bin-line"></i>
            </button>
         </article>
      )
   })

   return (
      <main className="mx-auto w-3/4 flex flex-col p-8 gap-8">
         <h1 className="text-4xl text-slate-800 font-bold">Online Todo List</h1>
         {newItemSection}
         {content}
      </main>
   )
}
export default TodoList