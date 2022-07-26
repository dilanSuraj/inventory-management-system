import React, { useEffect, useState } from 'react';
import PrintButton from '../../components/buttons/PrintButton';
import Input from '../../components/form/Input';
import TableRow from '../../components/TableRow';
import SaveButton from '../../components/buttons/SaveButton';
import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';
import RefreshButton from '../../components/buttons/RefreshButton';
import DashboardPageHeading from '../../components/headings/DashboardPageHeading';
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Employees = () => {
    const tableHeadItems = ['SN', 'Name', 'Phone', 'Website', 'Email', 'Address', 'Creator', 'Created At', 'Updated By', 'Updated At', 'Actions'];

    const tableHead = <tr>
        {
            tableHeadItems?.map((tableHeadItem, index) => <th key={index} className='text-xs' >{tableHeadItem}</th>)
        }
    </tr>;

    const addEmployee = event => {
        event.preventDefault();

        const name = event?.target?.employeeName?.value;
        const phone = event?.target?.employeePhone?.value;
        const website = event?.target?.employeeWebsite?.value;
        const email = event?.target?.employeeEmail?.value;
        const address = event?.target?.employeeAddress?.value;
        const addedBy = 'admin';
        const addedTime = new Date();
        const updatedBy = 'admin';
        const updatedTime = new Date();

        const productDetails = { name, phone, website, email, address, addedBy, addedTime, updatedBy, updatedTime };

        // send data to server
        fetch('https://stringlab-ims-server.herokuapp.com/api/employees', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        })
            .then(res => res.json())
            .then(data => {
                toast(
                    <div className="p-2 rounded-lg flex items-center gap-x-3">
                        <BsFillArrowUpRightSquareFill className='text-success text-3xl' />
                        <p className='text-center text-black'>Added successfully.</p>
                    </div>
                );
            });
    };

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('https://stringlab-ims-server.herokuapp.com/api/employees')
            .then(res => res.json())
            .then(products => setEmployees(products));
    }, [employees]);

    return (
        <section className='p-4 mt-16'>
            <form onSubmit={addEmployee}>
                <DashboardPageHeading className='fixed top-0 left-0 right-0'
                    name='Employees'
                    value={employees.length}
                    buttons={[
                        <SaveButton />,
                        <RefreshButton />,
                        <PrintButton />
                    ]}
                />

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-x-4 gap-y-2 mt-4 mb-8'>
                    <Input title={'Employee Name'} name='employeeName' isRequired='required' type='text' />
                    <Input title={'Employee Phone'} name='employeePhone' isRequired='required' type='text' />
                    <Input title={'Employee Website'} name='employeeWebsite' isRequired='required' type='text' />
                    <Input title={'Employee Email'} name='employeeEmail' isRequired='required' type='email' />
                    <Input title={'Employee Address'} name='employeeAddress' isRequired='required' type='text' />
                </div>
            </form>

            <table className="table table-zebra table-compact w-full">
                <thead>
                    {
                        tableHead
                    }
                </thead>
                <tbody>
                    {
                        employees.map((employee, index) =>
                            <TableRow key={employee._id} tableRowsData={
                                [
                                    index + 1,
                                    employee.name,
                                    employee.phone,
                                    employee.website, employee.email,
                                    employee.address,
                                    employee.addedBy,
                                    employee?.addedTime?.slice(0, 10),
                                    employee.updatedBy,
                                    employee?.updatedTime?.slice(0, 10),
                                    <span className='flex items-center gap-x-1'>
                                        <EditButton />
                                        <DeleteButton deleteApiLink='https://stringlab-ims-server.herokuapp.com/api/employees/' itemId={employee._id} />
                                    </span>
                                ]
                            } />)
                    }
                </tbody>
            </table>
        </section>
    );
};

export default Employees;