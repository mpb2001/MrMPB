import React from 'react';

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      droppedItems: [],
      isModalOpen: false,
      selectedItem: null,
    };
  }
  allowDrop = (event) => {
    event.preventDefault();
  }

  drag = (event) => {
    event.dataTransfer.setData('text', event.target.id);
  }

  drop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const item = document.getElementById(data).cloneNode(true);
    item.removeAttribute('id');

    this.setState((prevState) => ({
      droppedItems: [...prevState.droppedItems, item],
    }));
  }
  
  openModal = (item) => {
    this.setState({
      isModalOpen: true,
      selectedItem: item,
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedItem: null,
    });
  }

  render() {
    const { droppedItems, isModalOpen, selectedItem } = this.state;
    return (
      <div className="drag-and-drop-container">
        <div
          className="box"
          id="targetBox"
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >
          {droppedItems.map((item, index) => (
            <div
              key={index}
              className="dropped-item"
              onDoubleClick={() => this.openModal(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="item-container">
          <input
            type="text"
            className="item text-item"
            id="textItem"
            draggable="true"
            onDragStart={this.drag}
            placeholder='Text'
          />

          <input
            type="number"
            className="item number-item"
            id="numberItem"
            draggable="true"
            onDragStart={this.drag}
            placeholder='Number'
          />

          <input
            type="button"
            className="item button-item"
            id="buttonItem"
            draggable="true"
            onDragStart={this.drag}
            value="Button"
          />
        </div>
        {isModalOpen && (
          <Modal>
            <div className="modal-content">
              {selectedItem}
              <button onClick={this.closeModal}>Close</button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default DragAndDrop;
