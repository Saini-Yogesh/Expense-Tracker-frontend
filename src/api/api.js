const BASE_URL = process.env.REACT_APP_BASE_URL;

export const register = async (data) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const login = async (data) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const getExpenses = async (token) => {
    const res = await fetch(`${BASE_URL}/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};

export const addExpense = async (token, expense) => {
    const res = await fetch(`${BASE_URL}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
    });
    return res.json();
};

export const deleteExpense = async (token, id) => {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};

export const updateExpense = async (token, id, updatedExpense) => {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExpense),
    });
    return res.json();
};
