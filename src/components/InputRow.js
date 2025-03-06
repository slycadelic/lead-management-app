'use client'

import { useState, useEffect } from "react";
import Select from 'react-select';
import isEmail from 'validator/lib/isEmail';

const options = [
    { value: 'New', label: 'New' },
    { value: 'Engaged', label: 'Engaged' },
    { value: 'Proposal Sent', label: 'Proposal Sent' },
    { value: 'Closed-Won', label: 'Closed-Won' },
    { value: 'Closed-Lost', label: 'Closed-Lost' }
]

const InputRow = ({ handleSave }) => {

    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        status: options[0]
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSelect = (value) => {
        setData(prevState => ({
            ...prevState,
            status: value
        }));
    }

    const saveClick = async () => {
        if (data.name === '') {
            alert('Name is required!');
            return;
        } else if (data.email === '') {
            alert('Email ID is required!');
            return;
        } else if (!isEmail(data.email)) {
            alert('Invalid Email ID!');
            return;
        }
        try {
            setSaving(true);
            await handleSave(data);
            setData({
                name: '',
                email: '',
                status: options[0]
            })
            setAdding(false);
            setSaving(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setData({
            name: '',
            email: '',
            status: options[0]
        });
    }, [adding])

    if (!adding) {
        return (
            <tr onClick={() => setAdding(true)}>
                <td rowSpan={5} style={{ maxWidth: '100%' }}>
                    <button style={{ backgroundColor: 'green' }}>
                        Add New Lead
                    </button>
                </td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td />
                <td>
                    <input
                        name="name"
                        type="text"
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        name="email"
                        type="text"
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <Select
                        defaultValue={options[0]}
                        options={options}
                        value={data.status}
                        onChange={handleSelect}
                        className="dropdown"
                    />
                </td>
                <td>
                    <button onClick={() => setAdding(prev => !prev)} style={{ backgroundColor: 'red' }} disabled={saving}>
                        Cancel
                    </button>
                    <button onClick={() => saveClick()} style={{ backgroundColor: 'limegreen' }} disabled={saving}>
                        Save
                    </button>
                </td>
            </tr>
        )
    }
}

export default InputRow