import React, { useState } from 'react';

const FilterAuditLogs = ({ onClose, setFilterParams, applyFilter }) => {
    const [filterData, setFilterData] = useState({
        userId: "",
        action: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilterParams(filterData);
        applyFilter();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Filter Audit Logs</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">User ID:</label>
                        <input
                            type="text"
                            name="userId"
                            value={filterData.userId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Action:</label>
                        <input
                            type="text"
                            name="action"
                            value={filterData.action}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4 bg-gray-200 p-2 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                            Apply Filter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FilterAuditLogs;
