/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import MyModal from './Modal';
function generateRandomId() {
  const randomValue = Math.random().toString(36);
  return randomValue;
}

function DragAndDrop() {
  const [items] = useState([
    { id: generateRandomId(), type: 'number', value: 1 },
    { id: generateRandomId(), type: 'text', value: 'Text' },
    { id: generateRandomId(), type: 'button', value: 'Click Me' },
  ]);
  const openModal = useRef(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [setShowModal] = useState(false);
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
    openModal.current.handleOpenModal()
    setShowModal(true);
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
                  onDoubleClick={() => handleInputDoubleClick(index)}
                  className="dropped-button"
                >
                  {item.value}
                </button>
              ) : (
                <input
                  type={item.type}
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
      <MyModal
        ref={openModal}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setShowModal={setShowModal}
        selectedInputIndex={selectedInputIndex}
        droppedItems={droppedItems}
        setDroppedItems={setDroppedItems}
      />
    </div>
  );
}

export default DragAndDrop;