export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index + 1 <= Math.round(rating);
          return (
            <svg
              key={index}
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-4 w-4 ${filled ? "text-accent-bright" : "text-border-strong"}`}
            >
              <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.79L10 14.77l-5.21 2.74 1-5.79-4.21-4.1 5.82-.85L10 1.5z" />
            </svg>
          );
        })}
      </div>
      <span className="text-sm font-medium text-text-secondary">{rating.toFixed(1)}</span>
    </div>
  );
}
