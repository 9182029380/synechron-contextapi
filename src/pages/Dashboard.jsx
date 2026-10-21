
import FilterPanel from "../components/FilterPanel";
import MarketTable from "../components/MarketTable";

export default function Dashboard() {
    return (
        <main className="dashboard">
            <header className="dashboard-header">
                <p className="eyebrow">Wholesale agriculture market</p>
                <h1>Mandi Price Dashboard</h1>
                <p>Explore reported crop prices across markets.</p>
            </header>

            <FilterPanel />
            <MarketTable />
        </main>
    );
}
