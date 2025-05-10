const BASE_URL = process.env.REACT_APP_BASE_URL;

const handleResponse = async (res) => {
    const contentType = res.headers.get("content-type");
    const data = contentType?.includes("application/json") ? await res.json() : null;
    if (!res.ok) {
        const errorMsg = data?.message || res.statusText || 'An error occurred';
        throw new Error(errorMsg); // ❌ This will now get caught in your Dashboard
    }
    return data;
};

export const register = async (data) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

export const login = async (data) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

export const getExpenses = async (token) => {
    const res = await fetch(`${BASE_URL}/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
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
    return handleResponse(res);
};

export const deleteExpense = async (token, id) => {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
};

export const updateExpense = async (token, id, updatedExpense) => {
    const res = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedExpense),
    });
    return handleResponse(res);
};

// Function to get the username
export const getUsername = async (token) => {
    const res = await fetch(`${BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return handleResponse(res);
};