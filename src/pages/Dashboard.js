import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getExpenses, addExpense, deleteExpense, updateExpense } from '../api/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

function Dashboard() {
    const { token } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [editing, setEditing] = useState(null);

    const loadExpenses = useCallback(async () => {
        const res = await getExpenses(token);
        setExpenses(res);
    }, [token]);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const handleAdd = async (data) => {
        if (editing) {
            await updateExpense(token, editing._id, data);
            setEditing(null);
        } else {
            await addExpense(token, data);
        }
        loadExpenses();
    };

    const handleDelete = async (id) => {
        await deleteExpense(token, id);
        loadExpenses();
    };

    const handleEdit = (expense) => {
        setEditing(expense);
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <ExpenseForm onAdd={handleAdd} editing={editing} />
            <ExpenseList expenses={expenses} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    );
}

export default Dashboard;
