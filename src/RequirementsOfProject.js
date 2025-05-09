import React from 'react'

const RequirementsOfProject = () => {
    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Requirements For Expense Tracker Application</h2>
            <div style={{ display: "flex" }}>
                <div style={{ padding: '0 50px', width: "50vw" }}>

                    <p><strong>Project Overview:</strong></p>
                    <p>
                        The Expense Tracker Application is a web-based platform that allows users to efficiently manage their expenses. Users can register, log in, add, edit, and delete their expenses, while also visualizing their spending patterns through charts.
                    </p>
                    <p>
                        The application is built using a modern tech stack, ensuring a responsive and user-friendly interface, with a focus on security and data integrity.
                    </p>

                    <h3>Key Features</h3>
                    <h4>1. User Authentication</h4>
                    <ul>
                        <li><strong>Sign Up:</strong> Users can create an account by providing their username, email, and password. The password is securely hashed before storage.</li>
                        <li><strong>Login:</strong> Users can log in using their email and password. A JSON Web Token (JWT) is generated upon successful authentication.</li>
                    </ul>

                    <h4>2. Expense Management</h4>
                    <ul>
                        <li><strong>Add Expense:</strong> Input amount, category, description, and date. Validated and stored in the database.</li>
                        <li><sHtrong>Edit Expense:</sHtrong> Retrieve and modify existing expenses by ID.</li>
                        <li><strong>Delete Expense:</strong> Remove expenses using the expense ID.</li>
                        <li><strong>View Expenses:</strong> List of all expenses for tracking and management.</li>
                    </ul>

                </div>
                <div style={{ padding: '0 20px', width: "50vw" }}>
                    <h4>3. Data Analysis Features</h4>
                    <ul>
                        <li><strong>Calculate Total Expenses:</strong> Sum of all expense amounts.</li>
                        <li><strong>Filter by Category:</strong> Analyze spending by filtering categories.</li>
                        <li><strong>Data Visualization:</strong> Pie charts and summaries for visual analysis.</li>
                    </ul>

                    <h4>API Endpoints</h4>
                    <ul>
                        <li><strong>POST</strong> /api/register - Register user</li>
                        <li><strong>POST</strong> /api/login - Login and JWT</li>
                        <li><strong>POST</strong> /api/expenses - Add new expense</li>
                        <li><strong>PUT</strong> /api/expenses/:id - Edit expense</li>
                        <li><strong>DELETE</strong> /api/expenses/:id - Delete expense</li>
                        <li><strong>GET</strong> /api/expenses - Get all user expenses</li>
                    </ul>
                </div>
            </div >
        </>
    );
}

export default RequirementsOfProject
