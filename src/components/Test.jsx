import React from "react";
import { nanoid } from "nanoid";
import "../index.css";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                id: nanoid(),
                firstName: "",
                lastName: "",
                age: "",
                number: "",
                isEditing: false,
            },
            items: [],
            errors: {},
        };

        this.inputFields = [
            { name: "firstName", label: "First Name", type: "text", placeholder: "Enter first name" },
            { name: "lastName", label: "Last Name", type: "text", placeholder: "Enter last name" },
            { name: "age", label: "Age", type: "number", placeholder: "Enter age" },
            { name: "number", label: "Number", type: "number", placeholder: "Enter number" },
        ];
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            person: {
                ...prevState.person,
                [name]: value,
            },
        }));
    };

    validateInputs = () => {
        const { firstName, lastName, age, number } = this.state.person;
        const errors = {};

        if (!firstName.trim()) {
            errors.firstName = "First name is required.";
        }

        if (!lastName.trim()) {
            errors.lastName = "Last name is required.";
        }

        if (!age.trim()) {
            errors.age = "Age is required.";
        } else if (isNaN(age)) {
            errors.age = "Age must be a valid number.";
        }

        if (!number.trim()) {
            errors.number = "Number is required.";
        } else if (isNaN(number)) {
            errors.number = "Number must be a valid number.";
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    editItem = (id) => {
        const editIndex = this.state.items.findIndex(item => item.id === id);
        const editItem = this.state.items[editIndex];

        this.setState({
            person: {
                ...editItem,
                isEditing: true,
            },
            editIndex: editIndex,
        });
    };

    deleteItem = (id) => {
        this.setState((prevState) => ({
            items: prevState.items.filter(item => item.id !== id),
        }));
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.addItem();
        }
    };

    addItem = () => {
        const { firstName, lastName, age, number, id, isEditing } = this.state.person;

        if (this.validateInputs()) {
            const newItem = {
                id,
                firstName,
                lastName,
                age,
                number,
            };

            if (isEditing) {
                const editIndex = this.state.editIndex;
                const updatedItems = this.state.items.map((item, index) =>
                    index === editIndex ? newItem : item
                );
                this.setState({
                    items: updatedItems,
                    person: {
                        firstName: "",
                        lastName: "",
                        age: "",
                        number: "",
                        isEditing: false,
                        id: nanoid(),
                    },
                });
            } else {
                this.setState((prevState) => ({
                    items: [...prevState.items, newItem],
                    person: {
                        firstName: "",
                        lastName: "",
                        age: "",
                        number: "",
                        isEditing: false,
                        id: nanoid(),
                    },
                }));
            }
        }
    };

    render() {
        const { isEditing } = this.state.person;
        const { items, errors } = this.state;

        return (
            <div className="container">
                <div className="form-container">
                    <h2 className="section-heading">Input Form</h2>
                    <div className="input-form" onKeyDown={this.handleKeyDown}>
                        {this.inputFields.map((field) => (
                            <div key={field.name} className={`input-group ${errors[field.name] ? "input-error" : ""}`}>
                                <label htmlFor={field.name}>{field.label}:</label>
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={this.state.person[field.name]}
                                    placeholder={field.placeholder}
                                    onChange={this.handleChange}
                                />
                                {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
                            </div>
                        ))}

                        <button
                            type="button"
                            className={`add-button ${isEditing ? "submit-button" : ""}`}
                            onClick={this.addItem}
                        >
                            {isEditing ? "Submit" : "Add Item"}
                        </button>
                    </div>
                </div>

                <div className="list-container">
                    <h2 className="section-heading">List of Items</h2>
                    {items.length > 0 ? (
                        <ul className="item-list">
                            {items.map((item) => (
                                <li key={item.id} className="item">
                                    <span className="item-info">
                                        Name: {item.firstName} {item.lastName}, Age: {item.age}, Number: {item.number}
                                    </span>
                                    <button className="edit-button" onClick={() => this.editItem(item.id)}>
                                        Edit
                                    </button>
                                    <button className="delete-button" onClick={() => this.deleteItem(item.id)}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-list">List is empty. Add items above.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Form;
