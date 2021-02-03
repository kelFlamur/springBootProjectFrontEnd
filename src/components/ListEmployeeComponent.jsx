import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployee().then((res) => {
            this.setState({employees: res.data});
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee');
    }

    editEmployee(id) {
        this.props.history.push(`/update-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee </button>
                </div>
                <div className = "row">
                    <table className = "table table-striped tabled-borded">
                        <thead>
                            <tr>
                                <th> Employee First Name</th>
                                <th> Employee Last Name</th>
                                <th> Employee Email Id</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key = {employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td><button onClick = {() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                        <button style={{marginLeft: "10px"}} onClick = {() => {if(window.confirm('Please Confirm Deletion!'))this.deleteEmployee(employee.id)}} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;