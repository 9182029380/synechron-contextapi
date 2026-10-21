
import { useMandi } from "../context/MandiContext";

export default function FilterPanel() {
    const {
        filters,
        options,
        loading,
        error,
        searched,
        updateFilter,
        fetchPrices,
        resetFilters
    } = useMandi();

    function renderSelect(field, label) {
        return (
            <label className="filter-field" key={field}>
                <span>{label}</span>

                <select
                    value={filters[field]}
                    onChange={(event) =>
                        updateFilter(field, event.target.value)
                    }
                >
                    <option value="">All {label.toLowerCase()}s</option>

                    {options[field].map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </label>
        );
    }

    return (
        <section className="filter-panel">
            <h2>Find Mandi Prices</h2>
            <p>Search wholesale crop prices using real API data.</p>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    fetchPrices();
                }}
            >
                <div className="filter-grid">
                    <label className="filter-field">
                        <span>State</span>

                        <input
                            type="text"
                            value={filters.state}
                            onChange={(event) =>
                                updateFilter("state", event.target.value)
                            }
                            placeholder="e.g. Maharashtra"
                        />
                    </label>

                    {renderSelect("district", "District")}
                    {renderSelect("market", "Market")}
                    {renderSelect("commodity", "Commodity")}
                    {renderSelect("variety", "Variety")}
                    {renderSelect("grade", "Grade")}
                    {renderSelect("arrival_date", "Arrival date")}
                </div>

                <div className="filter-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? "Loading prices..." : "Search Prices"}
                    </button>

                    <button type="button" onClick={resetFilters}>
                        Reset
                    </button>
                </div>
            </form>

            {error && <p className="error-message">{error}</p>}

            {searched && !loading && !error && (
                <p className="result-count">
                    Search completed. Select different filters to refine
                    the results.
                </p>
            )}
        </section>
    );
}
