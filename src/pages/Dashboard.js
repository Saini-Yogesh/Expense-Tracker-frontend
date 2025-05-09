import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getExpenses, addExpense, deleteExpense, updateExpense } from '../api/api';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { toast } from 'react-toastify';

function Dashboard() {
    const { token } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(false);

    const toastTriggered = useRef(false);  // Ref to track if toast was triggered

    const loadExpenses = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getExpenses(token);
            setExpenses(res);
        } catch (error) {
            toast.error('Failed to load expenses.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const handleAdd = async (data) => {
        setLoading(true);  // Start loading
        try {
            if (editing) {
                await updateExpense(token, editing._id, data);  // Update expense
                if (!toastTriggered.current) {
                    toast.success('Expense updated successfully!');
                    toastTriggered.current = true;  // Mark toast as triggered
                }
                setEditing(null);  // Clear editing state
            } else {
                await addExpense(token, data);  // Add new expense
                if (!toastTriggered.current) {
                    toast.success('Expense added successfully!');
                    toastTriggered.current = true;  // Mark toast as triggered
                }
            }

            await loadExpenses();  // Reload expenses only after successful action
        } catch (error) {
            toast.error(error.message || 'Failed to save expense.');  // Show error toast if any error occurs
        } finally {
            setLoading(false);  // End loading
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteExpense(token, id);
            if (!toastTriggered.current) {
                toast.success('Expense deleted successfully!');
                toastTriggered.current = true;
            }
            loadExpenses();
        } catch (error) {
            toast.error('Failed to delete expense.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (expense) => {
        setEditing(expense);
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <ExpenseForm onAdd={handleAdd} editing={editing} />
            <ExpenseList expenses={expenses} onDelete={handleDelete} onEdit={handleEdit} />
            {loading && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem'
                }}>
                    <div style={{
                        width: '30px',
                        height: '30px',
                        border: '4px solid #ccc',
                        borderTop: '4px solid #007bff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>
                        {`@keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }`}
                    </style>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
