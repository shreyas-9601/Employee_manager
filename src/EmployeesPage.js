import React, { useState } from 'react';
import './EmployeesPage.css';

const initialEmployees = [
  { id: 1, name: 'John Doe', status: 'Active', position: 'Software Engineer', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St, City, Country', photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', status: 'Inactive', position: 'Product Manager', email: 'jane@example.com', phone: '987-654-3210', address: '456 Park Ave, City, Country', photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'Sam Wilson', status: 'Active', position: 'UI/UX Designer', email: 'sam@example.com', phone: '111-222-3333', address: '789 Elm St, City, Country', photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 4, name: 'Lisa Wong', status: 'Inactive', position: 'Data Scientist', email: 'lisa@example.com', phone: '444-555-6666', address: '1010 Oak Dr, City, Country', photo: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 5, name: 'Harry King', status: 'Active', position: 'Data analyst', email: 'harry@example.com', phone: '442-515-6789', address: '543 st, City, Country', photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 6, name: 'Ram Krishna', status: 'Active', position: 'Business analyst', email: 'ram@example.com', phone: '457-567-6124', address: '378 Dr, City, Country', photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: 7, name: 'Hugh Jackman', status: 'Inactive', position: 'Data engineer', email: 'hugh@example.com', phone: '444-555-6666', address: '811 Pt Dr, City, Country', photo: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: 8, name: 'Lisa Sthalekar', status: 'Active', position: 'Quality analyst', email: 'lisas@example.com', phone: '444-111-6666', address: '1112 Lak Dr, City, Country', photo: 'https://randomuser.me/api/portraits/women/3.jpg' }
];

const EmployeesPage = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    return (filter === 'All' || employee.status === filter) &&
           employee.name.toLowerCase().includes(search.toLowerCase());
  });

  const blockEmployee = (id) => {
    setEmployees(
      employees.map((employee) => 
        employee.id === id ? { ...employee, status: 'Inactive' } : employee
      )
    );
  };

  const showDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="employees-page">
      <header className="header">
        <h1 className="title">Employees</h1>
        <div className="filters">
          <button onClick={() => setFilter('All')}>All</button>
          <button onClick={() => setFilter('Active')}>Active</button>
          <button onClick={() => setFilter('Inactive')}>Inactive</button>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="employee-cards">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <div className="card-header">
              <img src={employee.photo} alt={employee.name} className="profile-photo" />
              <div className="employee-info">
                <h3>{employee.name}</h3>
                <p className="employee-position">{employee.position}</p>
              </div>
            </div>
            <p className="employee-email">{employee.email}</p>
            <div className="card-buttons">
              <button onClick={() => blockEmployee(employee.id)}>Block</button>
              <button onClick={() => showDetails(employee)}>Details</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>{selectedEmployee.name}</h2>
            <img src={selectedEmployee.photo} alt={selectedEmployee.name} className="modal-photo" />
            <p><strong>Position:</strong> {selectedEmployee.position}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
            <p><strong>Address:</strong> {selectedEmployee.address}</p>
            <p><strong>Status:</strong> {selectedEmployee.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
