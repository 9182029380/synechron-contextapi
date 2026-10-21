
import { useMandi } from "../context/MandiContext";

export default function MarketTable() {
    const { records, loading, error, searched } = useMandi();

    if (loading) return <p>Loading mandi prices...</p>;
    if (error) return null;

    if (searched && records.length === 0) {
        return <p>No records found. Try changing the filters.</p>;
    }

    if (!records.length) {
        return <p>Enter a state and click Search Prices to load data.</p>;
    }

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>State</th>
                    <th>District</th>
                    <th>Market</th>
                    <th>Commodity</th>
                    <th>Variety</th>
                    <th>Grade</th>
                    <th>Arrival date</th>
                    <th>Min price</th>
                    <th>Max price</th>
                    <th>Modal price</th>
                </tr>
                </thead>

                <tbody>
                {records.map((row) => (
                    <tr key={row.id}>
                        <td>{row.state}</td>
                        <td>{row.district}</td>
                        <td>{row.market}</td>
                        <td>{row.commodity}</td>
                        <td>{row.variety}</td>
                        <td>{row.grade}</td>
                        <td>{row.arrival_date}</td>
                        <td>₹{Number(row.min_price).toLocaleString("en-IN")}</td>
                        <td>₹{Number(row.max_price).toLocaleString("en-IN")}</td>
                        <td>₹{Number(row.modal_price).toLocaleString("en-IN")}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
