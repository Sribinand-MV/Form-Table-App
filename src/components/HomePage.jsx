import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2

function HomePage({ data, setData }) {
  const handleEdit = async (index) => {
    // SweetAlert prompt for Name
    const { value: name } = await Swal.fire({
      title: 'Edit Name',
      input: 'text',
      inputLabel: 'New name',
      inputValue: data[index].name,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a name!';
        }
      }
    });

    if (!name) return;  // If the user canceled or didn't enter a valid name, exit

    // SweetAlert prompt for Email
    const { value: email } = await Swal.fire({
      title: 'Edit Email',
      input: 'email',
      inputLabel: 'New email',
      inputValue: data[index].email,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'You need to enter a valid email!';
        }
      }
    });

    if (!email) return;

    // SweetAlert prompt for Phone
    const { value: phone } = await Swal.fire({
      title: 'Edit Phone Number',
      input: 'tel',
      inputLabel: 'New phone number',
      inputValue: data[index].phone,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.length < 8 || value.length > 13) {
          return 'Phone number must be between 8 and 13 digits!';
        }
      }
    });

    if (!phone) return;

    // If all fields are valid, update the data
    const updatedData = [...data];
    updatedData[index] = { name, email, phone };
    setData(updatedData);

    Swal.fire({
      title: 'Updated!',
      text: 'The record has been successfully updated.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);

        Swal.fire(
          'Deleted!',
          'The record has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="home-container">
      <h2>Home Page</h2>
      <Link to="/form">
        <button>Go to Form</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td className="actions">
                <button onClick={() => handleEdit(index)} className="edit">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;