
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from "react";

const MandiContext = createContext(null);

const API_URL = "http://localhost:5000/api/mandi";

const INITIAL_FILTERS = {
    state: "Maharashtra",
    district: "",
    market: "",
    commodity: "",
    variety: "",
    grade: "",
    arrival_date: ""
};

function getUniqueValues(records, field) {
    return [
        ...new Set(
            records
                .map((record) => String(record[field] ?? "").trim())
                .filter(Boolean)
        )
    ].sort((a, b) => a.localeCompare(b));
}

export function MandiProvider({ children }) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    const updateFilter = useCallback((name, value) => {
        setFilters((previous) => ({
            ...previous,
            [name]: value
        }));

        // Clear dependent filters when the state changes.
        if (name === "state") {
            setFilters((previous) => ({
                ...previous,
                state: value,
                district: "",
                market: "",
                commodity: "",
                variety: "",
                grade: "",
                arrival_date: ""
            }));

            setRecords([]);
            setSearched(false);
            setError("");
            return;
        }

        setRecords([]);
        setSearched(false);
        setError("");
    }, []);

    const fetchPrices = useCallback(async () => {
        if (!filters.state.trim() && !filters.commodity.trim()) {
            setError("Enter a state or commodity to search.");
            return;
        }

        setLoading(true);
        setError("");
        setSearched(true);

        try {
            const params = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value.trim()) {
                    params.set(key, value.trim());
                }
            });

            const response = await fetch(`${API_URL}?${params.toString()}`);
            const body = await response.json();

            if (!response.ok || body.success !== true) {
                throw new Error(body.message || "Unable to load prices.");
            }

            setRecords(body.records ?? []);
        } catch (err) {
            setRecords([]);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const resetFilters = useCallback(() => {
        setFilters({ ...INITIAL_FILTERS });
        setRecords([]);
        setError("");
        setSearched(false);
    }, []);

    // Dynamic dropdown options from the records returned by the API.
    const options = useMemo(
        () => ({
            district: getUniqueValues(records, "district"),
            market: getUniqueValues(records, "market"),
            commodity: getUniqueValues(records, "commodity"),
            variety: getUniqueValues(records, "variety"),
            grade: getUniqueValues(records, "grade"),
            arrival_date: getUniqueValues(records, "arrival_date")
        }),
        [records]
    );

    return (
        <MandiContext.Provider
            value={{
                filters,
                options,
                records,
                loading,
                error,
                searched,
                updateFilter,
                fetchPrices,
                resetFilters
            }}
        >
            {children}
        </MandiContext.Provider>
    );
}

export function useMandi() {
    const context = useContext(MandiContext);

    if (!context) {
        throw new Error("useMandi must be used inside MandiProvider");
    }

    return context;
}
