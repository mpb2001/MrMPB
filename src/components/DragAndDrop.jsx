/* eslint-disable no-unused-vars */
import { useState } from 'react';

function generateRandomId() {
  const randomValue = Math.random().toString(36).substr(2, 9);
  return randomValue;
}

function DragAndDrop() {
  const [items] = useState([
    { id: generateRandomId(), type: 'number', value: 42 },
    { id: generateRandomId(), type: 'text', value: 'Hello, world!' },
    { id: generateRandomId(), type: 'button', value: 'Click Me' },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = JSON.parse(e.dataTransfer.getData('text/plain'));
    setDroppedItems([...droppedItems, droppedItem]);
  };

  const handleInputChange = (index, event) => {
    const newDroppedItems = [...droppedItems];
    newDroppedItems[index].value = event.target.value;
    setDroppedItems(newDroppedItems);
  };

  const handleButtonClick = (index) => {
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="items-container">
        <h2>Draggable Items</h2>
        <ul className="items-list">
          {items.map((item) => (
            <li
              key={item.id}
              className="draggable-item"
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
            >
              {item.type === 'button' ? (
                <button className="button">{item.value}</button>
              ) : (
                item.value
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="drop-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h2>Dropped Items</h2>
        <ul className="items-list">
          {droppedItems.map((item, index) => (
            <li key={item.id} className="dropped-item">
              {item.type === 'button' ? (
                <button
                  onClick={() => handleButtonClick(index)}
                  className="dropped-button"
                >
                  {item.value}
                </button>
              ) : (
                <input
                  type={item.type}
                  value={item.value}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder={`Edit this ${item.type}...`}
                  className="input-box"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DragAndDrop;
