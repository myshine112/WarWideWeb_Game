import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/table.css';

const History = () => {
    const { account } = useAuth();
    let transactions = '';

    if (account)
        transactions = account.history;
    return (
        <div className="table--responsive--md">
            <table className="table">
                <thead>
                    <tr>
                        <th>Transection Type</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            <td className="trx-type" data-label="Transection Type">{transaction.category}</td>
                            <td className="date" data-label="Date">{transaction.timestamp}</td>
                            <td className="amount" data-label="Amount">{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default History;