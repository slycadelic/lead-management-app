'use client'

import { useState, useEffect } from "react";
import API from "@/utlis/API";
import InputRow from "./InputRow";

const dateOptions = {
	month: "short", // Dec
	day: "2-digit", // 12
	year: "numeric", // 2024
	hour: "numeric", // 5
	minute: "2-digit", // 15
	hour12: true, // 5:15 PM format
	// timeZoneName: "short" // IST
};

const Table = () => {

    const [leads, setLeads] = useState([]);

    const refreshData = async () => {
        try {
            const res = await API.get('/leads');
            setLeads(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async (data) => {
        try {
            const res = await API.post('/lead', {...data, status: data.status.value });
            if (res.status === 201) {
                alert('Email id is already registered. Lead not saved!');
            } else {
                await refreshData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { refreshData() }, [])

    return (
        <tbody>
            {leads.map(lead => (
                <tr key={lead._id}>
                    <td style={{ width: '30px' }}><input type='checkbox' /></td>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.status}</td>
                    <td>{new Date(lead.createdAt).toLocaleDateString("en-US", dateOptions)}</td>
                </tr>
            ))}
            <InputRow handleSave={handleSave} />
        </tbody>
    )
}

export default Table