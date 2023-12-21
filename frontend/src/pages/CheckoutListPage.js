import React, { useState } from 'react';

const CheckoutListPage = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Strip bedding and leave in a pile in rooms', completed: false },
        { id: 2, text: 'Make sure all windows and doors are closed and locked', completed: false },
        { id: 3, text: 'Close window and sliding door blinds', completed: false },
        { id: 4, text: 'Be sure to throw away any unused food items or take them with you', completed: false },
        { id: 5, text: 'Run dishwasher and do dishes', completed: false },
        { id: 6, text: 'Turn off all lights', completed: false },
        { id: 7, text: 'Make sure pellet stove is off!', completed: false },
        { id: 8, text: 'Turn off water main!', completed: false }
    ]);

    const handleCheckboxChange = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the submission logic here
        console.log('Submitted todos:', todos);
    };

    return (
        <div>
          <div className='content-container'>
            <form onSubmit={handleSubmit}>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleCheckboxChange(todo.id)}
                            />
                            {todo.text}
                        </li>
                    ))}
                </ul>
                <button type="submit">Submit</button>
            </form>
          </div>
        </div>
    );
};

export default CheckoutListPage;
