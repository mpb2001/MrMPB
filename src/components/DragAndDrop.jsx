import React from 'react';

class DragAndDrop extends React.Component {
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
    event.target.appendChild(item);
  }

  render() {
    return (
      <div className="drag-and-drop-container">
        <div
          className="box"
          id="targetBox"
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >
          Drop items here
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
      </div>
    );
  }
}

export default DragAndDrop;
