'use client'
import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { BsSun, BsMoon } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const onHandle = (e) => {
    e.preventDefault();
    if (!title || !desc) {
      toast.error("Please enter both a title and description for the task!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? "dark" : "light"
      });
      return;
    }
    setMainTask([...mainTask, { title, desc, completed: false }]);
    setTitle("");
    setDesc("");
  };

  const deleteTask = (index) => {
    setMainTask(mainTask.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    const task = mainTask[index];
    setCompletedTasks([...completedTasks, { ...task, completed: true }]);
    deleteTask(index);
  };

  const renderTask = mainTask.length > 0 ? (
    mainTask.map((t, i) => (
      <div key={i} className='flex justify-between items-center bg-white p-4 rounded-md shadow-sm mb-3'>
        <div>
          <h1 className="text-lg font-semibold">{t.title}</h1>
          <p className="text-gray-600">{t.desc}</p>
        </div>
        <div className='flex gap-2'>
          <MdOutlineDeleteOutline
            className='text-5xl cursor-pointer text-red-500'
            onClick={() => deleteTask(i)}
          />
          <TiTick
            className={`text-5xl cursor-pointer ${darkMode ? 'text-emerald-700' : 'text-blue-600'}`}
            onClick={() => completeTask(i)}
          />
        </div>
      </div>
    ))
  ) : (
    <h2 className="text-gray-500">No Task</h2>
  );

  return (
    <div className={`${darkMode ? 'bg-black' : 'bg-gray-100'} flex justify-center align-center h-screen w-full`}>
      <div className='text-center w-full flex flex-col justify-center items-center p-2'>
        <ToastContainer />
        <div className="absolute top-4 right-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 md:text-6xl text-3xl">
            {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-gray-700" />}
          </button>
        </div>
        
        <h1 className={`text-5xl ${darkMode ? 'text-white' : 'text-black'}`}>ToDo List</h1>

        <div className={`${darkMode ? 'bg-zinc-800' : 'bg-white'} p-10 mt-5 md:w-[760px] w-full rounded-2xl shadow-lg shadow-emerald-600`}>
          <form onSubmit={onHandle}>
            <div className='flex gap-4 flex-col md:flex-row'>
              <input 
                type="text" 
                className={`${darkMode ? 'border-white text-black' : 'border-gray-300 text-black'} border p-3 px-6 text-xl`} 
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input 
                type="text" 
                className={`${darkMode ? 'border-white text-black' : 'border-gray-300 text-black'} border p-3 px-6 text-xl`} 
                placeholder='Enter Description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button type='submit' className={`p-2 rounded-sm ${darkMode ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'} font-bold hover:bg-emerald-600 px-6`}>
                ADD
              </button>
            </div>
          </form>
          
          <hr className={`mt-4 ${darkMode ? 'bg-slate-400' : 'bg-gray-300'}`} />
          
          <div className='flex mt-5'>
            <button className={`p-2 font-bold ${darkMode ? 'bg-emerald-600 text-white' : 'bg-blue-500 text-white'}`}>
              TODO
            </button>
            <button className={`p-2 font-bold ${darkMode ? 'bg-zinc-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
              Completed ({completedTasks.length})
            </button>
          </div>

          <div className='mt-5'>
            <div className={`${darkMode ? 'bg-zinc-700' : 'bg-gray-100'} p-5 rounded-md`}>
              {renderTask}
            </div>
          </div>
          
          {completedTasks.length > 0 && (
            <div className='mt-5'>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Completed Tasks</h2>
              {completedTasks.map((task, i) => (
                <div key={i} className='bg-green-100 p-4 rounded-md shadow-sm mb-3'>
                  <h1 className="text-xl font-semibold">{task.title}</h1>
                  <p className="text-gray-600">{task.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
