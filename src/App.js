import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



function App() {
  const [inputData, setInputData] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://34.122.107.224/messages')
      .then(response => setRecords(response.data))
      .catch(error => console.error('Error fetching records:', error));
  }, []);

  const handleAddRecord = () => {
    if (inputData.trim()) {
      const randomId = Math.floor(Math.random() * 1000);

      const newRecord = { id: randomId, message: inputData };
      axios.post('http://34.122.107.224/save/message', newRecord)
        .then(response => {
          setRecords([...records, response.data]);
          setInputData('');
        })
        .catch(error => console.error('Error adding Message:', error));
    } else {
      alert("please add a message");
    }
  };

  return (
    <div className="App">
      <h1>message registration</h1>
      <label htmlFor="inputData">input a message:</label>
      <input
        type="text"
        id="inputData"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Write something..."
      />
      <button onClick={handleAddRecord}>ADD</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
