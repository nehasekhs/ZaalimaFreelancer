 import "./Wallet.css";

const transactions = [
  { id: 1, date: "2025-09-01", amount: "$300", type: "Received" },
  { id: 2, date: "2025-09-10", amount: "$150", type: "Withdrawal" }
];

export default function Wallet() {
  return (
    <div className="wallet-page">
      <h1>Wallet</h1>
      <p>Check your balance, withdrawals and payment history.</p>
      <div className="balance-card">
        <h2>Current Balance: $450</h2>
        <button className="withdraw-btn">Withdraw Funds</button>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.amount}</td>
                <td>{t.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
