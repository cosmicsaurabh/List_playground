import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Papa from 'papaparse';
import { faTrash, faFileExport } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);
  
  const transferLeftToRight = () => {
    const checkedItems = leftList.filter(item => document.getElementById(item).checked);
    setLeftList(leftList.filter(item => !document.getElementById(item).checked));
    setRightList([...rightList, ...checkedItems]);
  };

  const transferRightToLeft = () => {
    const checkedItems = rightList.filter(item => document.getElementById(item).checked);
    setRightList(rightList.filter(item => !document.getElementById(item).checked));
    setLeftList([...leftList, ...checkedItems]);
  };

  const handleDelete = (item, list) => {
    if (list === 'left') {
      setLeftList(leftList.filter(i => i !== item));
    } else if (list === 'right') {
      setRightList(rightList.filter(i => i !== item));
    }
  };


  const handleAddToLeftList = () => {
    const newItem = prompt("Enter item for left list:");
    if (newItem && !leftList.includes(newItem)) {
      setLeftList([...leftList, newItem]);
    }
  };

  const handleAddToRightList = () => {
    const newItem = prompt("Enter item for right list:");
    if (newItem && !rightList.includes(newItem)) {
      setRightList([...rightList, newItem]);
    }
  };
  
  // Function to export the lists to a CSV file
  const exportToCSV = () => {
    const data = [...leftList, ...rightList];
    const csv = Papa.unparse(data.map(item => [item]));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'lists.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="container">
      <div className="export-button-container">
        <button className="export-button" onClick={exportToCSV}>
          Export to CSV <FontAwesomeIcon icon={faFileExport} />
        </button>
      </div>
      <div className="list">
        {leftList.length === 0 ? (
          <div className="empty-placeholder">Empty List</div>
        ) : (
          leftList.map(item => (
            <div key={item}>
              <button className="delete-button" onClick={() => handleDelete(item, 'left')}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <div className="checkbox-container">
                <input type="checkbox" id={item} />
                <label htmlFor={item}>{item}</label>
              </div>
            </div>
          ))
        )}
        <button className="add-button" onClick={handleAddToLeftList}>Add Items</button>
      </div>
      <div>
        <button className="transfer-button" onClick={transferLeftToRight}>&rarr;</button><br /><br />
        <button className="transfer-button" onClick={transferRightToLeft}>&larr;</button>
      </div>
      <div className="list">
        {rightList.length === 0 ? (
          <div className="empty-placeholder">Empty List</div>
        ) : (
          rightList.map(item => (
            <div key={item}>
              <button className="delete-button" onClick={() => handleDelete(item, 'right')}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <div className="checkbox-container">
                <input type="checkbox" id={item} />
                <label htmlFor={item}>{item}</label>
              </div>
            </div>
          ))
        )}
        <button className="add-button" onClick={handleAddToRightList}>Add Items</button>
      </div>
    </div>
  );
}

export default App;
