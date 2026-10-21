
import { useMandi } from "../context/MandiContext.jsx";

export default function PriceSummary() {
    const { records } = useMandi();

    const prices = records
        .map((record) => Number(record.modal_price))
        .filter((price) => Number.isFinite(price) && price > 0);

    const average =
        prices.length > 0
            ? prices.reduce((sum, price) => sum + price, 0) /
            prices.length
            : 0;

    const highest = prices.length
        ? Math.max(...prices)
        : 0;

    const lowest = prices.length
        ? Math.min(...prices)
        : 0;

    const cards = [
        {
            label: "Market records",
            value: records.length
        },
        {
            label: "Average modal price",
            value: average
                ? `₹${average.toLocaleString("en-IN", {
                    maximumFractionDigits: 2
                })}`
                : "—"
        },
        {
            label: "Highest modal price",
            value: highest
                ? `₹${highest.toLocaleString("en-IN")}`
                : "—"
        },
        {
            label: "Lowest modal price",
            value: lowest
                ? `₹${lowest.toLocaleString("en-IN")}`
                : "—"
        }
    ];

    return (
        <section className="summary-grid">
            {cards.map((card) => (
                <article className="summary-card" key={card.label}>
                    <p>{card.label}</p>
                    <h3>{card.value}</h3>
                </article>
            ))}
        </section>
    );
}
