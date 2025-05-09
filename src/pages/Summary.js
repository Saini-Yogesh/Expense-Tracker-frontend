import React, { useEffect, useState } from 'react';
import { getExpenses } from '../api/api';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import '../Css/Summary.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CATEGORIES = [
    "Food", "Groceries", "Transport", "Rent", "Healthcare",
    "Entertainment", "Shopping", "Subscriptions", "Education", "Other"
];

const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#66BB6A',
    '#BA68C8', '#FF7043', '#4DD0E1', '#9575CD',
    '#F06292', '#90A4AE'
];

const getDateRange = (filter, customStart, customEnd) => {
    const today = new Date();
    const start = new Date();
    switch (filter) {
        case 'last7':
            start.setDate(today.getDate() - 6);
            break;
        case 'last30':
            start.setDate(today.getDate() - 29);
            break;
        case 'thisMonth':
            start.setDate(1);
            break;
        case 'thisYear':
            start.setMonth(0, 1);
            break;
        case 'lastYear':
            start.setFullYear(today.getFullYear() - 1, 0, 1);
            today.setFullYear(today.getFullYear() - 1, 11, 31);
            break;
        case 'allTime':
            return [null, null]; // No filtering by date, show all
        case 'customRange':
            return [new Date(customStart), new Date(customEnd)];
        default:
            return [null, null];
    }
    return [start, today];
};

const Summary = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chartType, setChartType] = useState('pie');
    const [filter, setFilter] = useState('thisMonth');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getExpenses(token);
                setExpenses(data);
            } catch (err) {
                console.error('Error fetching expenses:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const [startDate, endDate] = getDateRange(filter, customStartDate, customEndDate);
    const filteredExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return startDate ? expDate >= startDate && expDate <= endDate : true;
    });

    const categoryTotals = CATEGORIES.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
    }, {});

    for (let exp of filteredExpenses) {
        if (categoryTotals.hasOwnProperty(exp.category)) {
            categoryTotals[exp.category] += parseFloat(exp.amount);
        }
    }

    const usedCategories = CATEGORIES.filter(cat => categoryTotals[cat] > 0);
    const usedData = usedCategories.map(cat => categoryTotals[cat]);
    const totalAmount = usedData.reduce((a, b) => a + b, 0);

    const chartData = {
        labels: usedCategories,
        datasets: [{
            data: usedData,
            backgroundColor: usedCategories.map((_, i) => COLORS[i % COLORS.length]),
            borderColor: '#fff',
            borderWidth: 1
        }]
    };

    const pieOptions = {
        plugins: { legend: { display: false } }
    };

    const barOptions = {
        plugins: { legend: { display: false } },
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
        }
    };

    return (
        <>
            <h2 className="summary-title">Expense Summary</h2>
            <div className="summary-container">
                <div className="summary-chart">
                    <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
                    {!loading && (chartType === 'pie' ? (
                        <Pie data={chartData} options={pieOptions} />
                    ) : (
                        <Bar data={chartData} options={barOptions} />
                    ))}
                </div>

                <div className="summary-list">

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="summary-controls">
                                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                    <option value="last7">Last 7 Days</option>
                                    <option value="last30">Last 30 Days</option>
                                    <option value="thisMonth">This Month</option>
                                    <option value="thisYear">This Year</option>
                                    <option value="lastYear">Last Year</option>
                                    <option value="allTime">All Time</option>
                                    <option value="customRange">Custom Range</option>
                                </select>

                                {filter === 'customRange' && (
                                    <div className="custom-date-range">
                                        <input
                                            type="date"
                                            value={customStartDate}
                                            onChange={(e) => setCustomStartDate(e.target.value)}
                                        />
                                        <input
                                            type="date"
                                            value={customEndDate}
                                            onChange={(e) => setCustomEndDate(e.target.value)}
                                        />
                                    </div>
                                )}

                                <button onClick={() => setChartType(prev => prev === 'pie' ? 'bar' : 'pie')}>
                                    Toggle to {chartType === 'pie' ? 'Bar' : 'Pie'}
                                </button>
                            </div>

                            <ul>
                                {usedCategories.map((cat, idx) => (
                                    <li key={cat}>
                                        <span className="dot" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                        <span className="category-name">{cat}</span>
                                        <span className="amount">
                                            ₹{categoryTotals[cat].toFixed(2)} ({((categoryTotals[cat] / totalAmount) * 100).toFixed(1)}%)
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Summary;
