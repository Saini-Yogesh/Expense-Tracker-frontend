import React, { useEffect, useState } from "react";
import "../Css/ExpenseForm.css";
import { toast } from "react-toastify";

const ExpenseForm = ({ onAdd, editing }) => {
    const today = new Date().toLocaleDateString('en-CA');
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        amount: "",
        category: "",
        date: today,
    });

    useEffect(() => {
        if (editing) {
            setForm({
                name: editing.name,
                amount: editing.amount,
                category: editing.category,
                date: editing.date.slice(0, 10),
            });
        } else {
            setForm({ name: "", amount: "", category: "", date: today });
        }
    }, [editing, today]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.amount || !form.category || !form.date) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true); // start loading

        try {
            await onAdd(form); // make sure onAdd can handle async if needed
            toast.success(editing ? "Expense updated successfully." : "Expense added successfully.");
            setForm({ name: '', amount: '', category: '', date: today });
        } catch (err) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false); // stop loading
        }
    };


    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Expense Name"
                required
            />
            <input
                type="number"
                id="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
            />
            <select
                id="category"
                value={form.category}
                onChange={handleChange}
                required
            >
                <option value="" disabled>
                    Select Category
                </option>
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
            <input type="date" id="date" value={form.date} onChange={handleChange} />
            <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : editing ? 'Update' : 'Add'} Expense
            </button>

        </form>
    );
};

export default ExpenseForm;
