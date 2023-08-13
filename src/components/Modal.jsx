import { useState, forwardRef, useImperativeHandle } from 'react';

const Modal = forwardRef(function MyModal(props, ref) {
  const [inputValue, setInputValue] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [placeHolder, setPlaceHolder] = useState('');
  const [showModal, setShowModal] = useState(false);


  useImperativeHandle(ref, () => ({

    handleOpenModal() {
      setShowModal(true);
    }

  }));


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitModal = () => {
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
    <div className="modal-container" >
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
              placeholder="Enter your Label"
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
            <button className="submit-modal-button" onClick={handleSubmitModal}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
})



export default Modal
