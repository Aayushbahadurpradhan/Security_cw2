import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const AuditLogs = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 50;

    // Fetch all audit logs
    const fetchAuditLogs = async () => {
        try {
            const response = await fetch(SummaryApi.fetchAuditLogs.url, {
                method: SummaryApi.fetchAuditLogs.method,
                credentials: 'include',
            });

            const logsResponse = await response.json();

            if (logsResponse.success) {
                setAuditLogs(logsResponse.logs);
            } else {
                toast.error(logsResponse.message);
            }
        } catch (error) {
            toast.error('Failed to fetch audit logs. Please try again.');
        }
    };

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    // Calculate the index range for the current page
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = auditLogs.slice(indexOfFirstLog, indexOfLastLog);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Action</th>
                        <th>Details</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentLogs.map((log, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstLog + index + 1}</td>
                                <td>{log.action}</td>
                                <td>{JSON.stringify(log.details)}</td>
                                <td>{moment(log.timestamp).format('LLL')}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className='pagination flex justify-center mt-4'>
                {
                    Array.from({ length: Math.ceil(auditLogs.length / logsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`page-link mx-1 px-3 py-1 border rounded ${
                                currentPage === index + 1
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200 text-black hover:bg-gray-300'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default AuditLogs;
