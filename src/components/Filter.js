import React from 'react';

const Filter = ({ selectedCategory, onChange }) => {
    return (
        <div className="filter">
            <label>Filter by Category:</label>
            <select value={selectedCategory} onChange={e => onChange(e.target.value)}>
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Groceries">Groceries</option>
                <option value="Transport">Transport</option>
                <option value="Rent">Rent</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
};

export default Filter;
