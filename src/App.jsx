
import { MandiProvider } from "./context/MandiContext";
import Dashboard from "./pages/Dashboard";
import "./index.css";

export default function App() {
    return (
        <MandiProvider>
            <Dashboard />
        </MandiProvider>
    );
}
