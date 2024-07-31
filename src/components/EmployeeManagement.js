import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [shift, setShift] = useState('morning');
    const [attendance, setAttendance] = useState(0);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // Fetch employee details
        axios.get('http://localhost:3001/employees')
            .then(response => {
                const employeeData = response.data;
                fetchDepartmentSalaries(employeeData);
            })
            .catch(error => console.error('Error fetching employee data:', error));

        // Fetch department salaries
        axios.get('http://localhost:3001/departments')
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching department salaries:', error));
    }, []);

    const fetchDepartmentSalaries = (employeeData) => {
        axios.get('http://localhost:3001/departments')
            .then(response => {
                const departmentData = response.data;
                const updatedEmployees = employeeData.map(employee => ({
                    ...employee,
                    payroll: calculatePayroll(employee.department, employee.shift, employee.attendance, departmentData)
                }));
                setEmployees(updatedEmployees);
            })
            .catch(error => console.error('Error fetching department data:', error));
    };

    const addEmployee = () => {
        if (name && department && shift) {
            // Add employee details
            const newEmployee = { name, department, shift, attendance };
            axios.post('http://localhost:3001/employees', newEmployee, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                const employee = response.data;
                // Calculate and add salary details
                axios.get('http://localhost:3001/departments')
                    .then(res => {
                        const departmentData = res.data;
                        const salary = calculatePayroll(employee.department, employee.shift, employee.attendance, departmentData);
                        const salaryDetails = { employeeId: employee.id, salary };

                        axios.post('http://localhost:3001/salaries', salaryDetails, {
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then(() => {
                            setEmployees([...employees, { ...employee, payroll: salary }]);
                            setName('');
                            setDepartment('');
                            setShift('morning');
                            setAttendance(0);
                            console.log('Employee added:', employee);
                        })
                        .catch(error => console.error('Error adding salary details:', error));
                    })
                    .catch(error => console.error('Error fetching department data:', error));
            })
            .catch(error => console.error('Error adding employee:', error));
        }
    };

    const removeEmployee = (id) => {
        console.log(`Attempting to remove employee with id: ${id}`);
    
        // First, delete the employee
        axios.delete(`http://localhost:3001/employees/${id}`)
            .then(() => {
                console.log('Employee removed from employees endpoint');
    
                // Then, delete the corresponding salary details
                axios.delete(`http://localhost:3001/salaries`, { data: { employeeId: id } })
                    .then(() => {
                        console.log('Salary details removed from salaries endpoint');
    
                        // Update the state to remove the employee from the list
                        setEmployees(employees.filter(employee => employee.id !== id));
                    })
                    .catch(error => console.error('Error removing salary details:', error));
            })
            .catch(error => console.error('Error removing employee:', error));
    };
    

    const calculatePayroll = (department, shift, attendance, departmentData) => {
        const dept = departmentData.find(dep => dep.name === department);
        const baseSalary = dept ? dept.baseSalary : 0;
        const shiftMultiplier = shift === 'night' ? 1.5 : 1;

        return baseSalary * shiftMultiplier * attendance;
    };

    return (
        <div className="employee-management">
            <h1>Employee Management</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="Employee Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
                <select value={shift} onChange={(e) => setShift(e.target.value)}>
                    <option value="morning">Morning Shift</option>
                    <option value="night">Night Shift</option>
                </select>
                <input
                    type="number"
                    placeholder="Attendance"
                    value={attendance}
                    onChange={(e) => setAttendance(parseInt(e.target.value, 10))}
                />
                <button onClick={addEmployee}>Add Employee</button>
            </div>
            <div className="employee-list">
                <h2>Employee List</h2>
                {employees.length === 0 ? (
                    <p>No employees added.</p>
                ) : (
                    <ul>
                        {employees.map((employee) => (
                            <li key={employee.id}>
                                <span>{employee.name} - {employee.department} - {employee.shift} - Attendance: {employee.attendance} - Payroll: ${employee.payroll ? employee.payroll.toFixed(2) : 'N/A'}</span>
                                <button onClick={() => removeEmployee(employee.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EmployeeManagement;
