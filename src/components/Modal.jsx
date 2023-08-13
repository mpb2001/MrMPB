
import { useState } from 'react';


const Modal = () => {
  const [inputValue, setInputValue] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [placeHolder, setPlaceHolder] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyValueChange = (e) => {
    setKeyValue(e.target.value);
  };
  const handlePlaceHolderChange = (e) => {
    setPlaceHolder(e.target.value);
  };

  return (
    <div className="modal-container">
      <button className="open-modal-button" onClick={handleOpenModal}>
        Open Modal
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <label htmlFor="placeHolder">Place Holder:</label>
            <input
              type="text"
              id="placeHolder"
              placeholder="Enter key Place Holder"
              value={placeHolder}
              onChange={handlePlaceHolderChange}
            />
            <label htmlFor="inputField">Label Name:</label>
            <input
              type="text"
              id="inputField"
              placeholder="Enter your text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <label htmlFor="keyValueField">Key Value:</label>
            <input
              type="text"
              id="keyValueField"
              placeholder="Enter key value"
              value={keyValue}
              onChange={handleKeyValueChange}
            />
            <button className="close-modal-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
