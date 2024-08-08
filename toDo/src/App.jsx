import { useState } from 'react';
import data from './utils/data';
import './App.css'


function App() {

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users')
    return savedUsers ? JSON.parse(savedUsers) : data
  });

  const [userName, setUserName] = useState('')
  const [userAge, setUserAge] = useState('')

  const handleAddFunction = () => {
    if (userName && userAge) {
      const createdUser = {
        id: users.length + 1,
        userName: userName,
        age: userAge
      }
      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers, createdUser]
        localStorage.setItem('users', JSON.stringify(updatedUsers))
        return updatedUsers
      })
      setUserName('')
      setUserAge('')

    }
  }

  const deleteFunction = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  }


  return (
    <>
      <div className='container'>
        <div className='wrapper'>
          <input className='inp'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text" placeholder='name' />
          <input className='inp'
            onChange={(e) => setUserAge(e.target.value)}
            value={userAge}
            type="number" placeholder='age' />
          <button className='btn-add' onClick={handleAddFunction}>add</button>
        </div>
        <div className='box'>
          {users.map((v) => (
            <div style={{ display: 'flex', gap: '30px' }} key={v.id}>
              <p>{v.userName}</p>
              <p>{v.age}</p>
              <button onClick={() => deleteFunction(v.id)}>d</button>
              <button>e</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
