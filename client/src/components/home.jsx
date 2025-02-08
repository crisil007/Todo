import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [form, setForm] = useState(false);

  // Fetching all todos when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('http://localhost:3000/gettodo');
        console.log("response: ", response);
        setData(response.data.data); // Directly setting all the todos
      } catch (error) {
        console.error('Error fetching todos: ', error);
      }
    };
    fetchData();
  }, []); 

  const displayForm = () => {
    setForm(true);
  };

  // Adding a new todo
  async function addTodo() {
    try {
      const body = {
        title,
        description
      };
      let response = await axios.post('http://localhost:3000/createtodo', body);
      if (response.status === 200) {
        alert(response.message || 'TODO created successfully');
        
        setData([...data, response.data]); 
        setForm(false); 
      }
    } catch (error) {
      console.log('Error adding todo: ', error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:3000/delettodo/${id}`);
      if (response.status === 200) {
        alert("TODO deleted successfully");
        setData(data.filter(item => item._id !== id));
      }
    } catch (error) {
      console.log("Error deleting todo: ", error);
    }
  };

  const editTodo = async (id, title, description,stage) => {
    try {
      const body = { title, description,stage };
      let response = await axios.put(`http://localhost:3000/editodo/${id}`, body);
      if (response.status === 200) {
        alert("TODO updated successfully");

        setData(data.map(item =>
          item._id === id ? { ...item, title, description,stage} : item
        ));
      }
    } catch (error) {
      console.log("Error updating todo: ", error);
    }
  };

 

  return (
    <>
      <nav>
        <button onClick={displayForm} className='font-bold mt-5 ms-5'>Add Task</button>
      </nav>

      <div>
        {form && (
          <form className=''>
            <input
              type="text"
              placeholder='Enter your todo title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder='Enter your todo description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="button" onClick={addTodo}>Submit</button>
          </form>
        )}
      </div>

      <div className='maindiv'>
        {data && data.map(item => (
          <div key={item._id} className='border border-2 font-bold tracking-wide p-5'>
            <div>{item.title}</div>
            <div>{item.description}</div>
            <div>Status: {item.stage}</div>
            <div><button onClick={() => deleteTodo(item._id)}>Delete</button></div>
            
            <div>
              <button onClick={() => editTodo(item._id, prompt('New title:', item.title), prompt('New description:', item.description),prompt('New stage:',item.stage))}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;