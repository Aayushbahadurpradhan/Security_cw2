// import React, { useEffect, useState } from 'react';
// import { getAuditLogsApi } from '../../apis/Api'; // Ensure this function is implemented correctly

// const AdminLogs = () => {
//     const [logs, setLogs] = useState([]);
//     const [loading, setLoading] = useState(true); // Add loading state
//     const [error, setError] = useState(null); // Add error state

//     useEffect(() => {
//         // Fetch logs with error handling
//         getAuditLogsApi()
//             .then((res) => {
//                 setLogs(res.data.logs);
//                 setLoading(false); // Set loading to false once data is fetched
//             })
//             .catch((err) => {
//                 console.error('Failed to fetch logs:', err);
//                 setError('Failed to load logs.'); // Set error message if the API call fails
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>; // Show loading message while data is being fetched
//     }

//     if (error) {
//         return <p>{error}</p>; // Show error message if there's an error
//     }

//     return (
//         <div className="audit-log">
//             <h2>Audit Log</h2>
//             {logs.length === 0 ? (
//                 <p>No logs available.</p> // Show message if there are no logs
//             ) : (
//                 <table className='table'>
//                     <thead>
//                         <tr>
//                             <th>Timestamp</th>
//                             <th>Action</th>
//                             <th>Details</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {logs.map((log) => (
//                             <tr key={log._id}>
//                                 <td>{new Date(log.timestamp).toLocaleString()}</td>
//                                 <td>{log.action}</td>
//                                 <td>{typeof log.details === 'object' ? JSON.stringify(log.details) : log.details}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default AdminLogs;
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
