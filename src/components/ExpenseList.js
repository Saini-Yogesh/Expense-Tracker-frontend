import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import "../Css/ExpenseList.css";
import ActionDeleteButtons from './ActionDeleteButtons'; // adjust the path as needed

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
    const [filterCategory, setFilterCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
        setCurrentPage(1);
    };

    const filteredExpenses = filterCategory === 'All'
        ? expenses
        : expenses.filter(exp => exp.category === filterCategory);

    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
    const currentExpenses = filteredExpenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const total = currentExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="expense-table">
            <div className="filter-total">
                <div className="filter">
                    <label htmlFor="category-filter">Filter by Category:</label>
                    <select
                        id="category-filter"
                        value={filterCategory}
                        onChange={handleFilterChange}
                    >
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

                <div className="total-amount">
                    <strong>Total:</strong> ₹{total.toFixed(2)}
                </div>
            </div>

            {/* Table View for Large Screens */}
            <div className="table-view">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th><th>Amount</th><th>Date</th><th>Category</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentExpenses.map((exp) => (
                            <tr key={exp._id}>
                                <td>{exp.name}</td>
                                <td>₹{parseFloat(exp.amount).toFixed(2)}</td>
                                <td>
                                    {new Date(exp.date).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </td>

                                <td>{exp.category}</td>
                                <td className="action-buttons">
                                    <FaEdit className="icon edit" onClick={() => onEdit(exp)} />
                                    <ActionDeleteButtons
                                        onDelete={onDelete}
                                        id={exp._id}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card View for Small Screens */}
            <div className="card-view">
                {currentExpenses.map((exp) => (
                    <div className="expense-card" key={exp._id}>
                        <div className="row">
                            <div className="name">{exp.name}</div>
                            <div className="amount">₹{parseFloat(exp.amount).toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="date">
                                {new Date(exp.date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>

                            <div className="category">{exp.category}</div>
                        </div>
                        <div className="card-actions">
                            <FaEdit className="icon edit" onClick={() => onEdit(exp)} />
                            <ActionDeleteButtons
                                onDelete={onDelete}
                                id={exp._id}
                            />
                        </div>
                    </div>
                ))}
            </div>


            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || totalPages === 0}>Previous</button>
                <span>Page {(totalPages === 0) ? 0 : currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
        </div>
    );
};

export default ExpenseList;
