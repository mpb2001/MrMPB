import { useState } from 'react';
import Modal from './Modal';

function generateRandomId() {
  const randomValue = Math.random().toString(36);
  return randomValue;
}

function Testx() {
  const [items] = useState([
    { id: generateRandomId(), type: 'number', value: 42},
    { id: generateRandomId(), type: 'text', value: 'Text' },
    { id: generateRandomId(), type: 'button', value: 'Click Me' },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');

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

  const handleInputDoubleClick = (index) => {
    const selectedItem = droppedItems[index];
    setSelectedInputIndex(index);
    setInputValue(selectedItem.value);
    setShowModal(true);
  };

  const handleButtonClick = (index) => {
    // Handle button click if needed
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
                  onDoubleClick={() => handleInputDoubleClick(index)}
                  className="dropped-button"
                >
                  {item.value}
                </button>
              ) : (
                <input
                  type={item.type}
                  value={item.value}
                  onDoubleClick={() => handleInputDoubleClick(index)}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder={`Edit this ${item.type}...`}
                  className="input-box"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal
          inputValue={inputValue}
          setInputValue={setInputValue}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedInputIndex={selectedInputIndex}
          droppedItems={droppedItems}
          setDroppedItems={setDroppedItems}
        />
      )}
    </div>
  );
}

export default Testx;
