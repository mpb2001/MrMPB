import React from 'react';
import '../index.css';

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
      <div>
        <div
          className="box"
          id="targetBox"
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >
          Drop items here
        </div>

        <input
          type="text"
          className="item"
          id="textItem"
          draggable="true"
          onDragStart={this.drag}
          defaultValue="Text Item"
        />

        <input
          type="number"
          className="item"
          id="numberItem"
          draggable="true"
          onDragStart={this.drag}
          defaultValue="42"
        />

        <input
          type="button"
          className="item"
          id="buttonItem"
          draggable="true"
          onDragStart={this.drag}
          value="Button Item"
        />
      </div>
    );
  }
}

export default DragAndDrop;