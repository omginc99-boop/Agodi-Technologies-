type Props = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * Agodi Technologies logo mark — inline SVG approximation of the official mark.
 *
 *   - Purple ring  → global reach / digital ecosystems
 *   - White core   → clarity, intelligence, human-centered technology
 *   - Orange vertical diamond → Africa rising, forward movement, growth
 *
 * The official artwork should live at /agodi-logo.png (or .svg) for marketing
 * use. This inline mark is used in-app for crispness at any size and to keep
 * the component layout-friendly.
 */
export default function AgodiLogo({ size = 48, withWordmark = false, className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Agodi Technologies"
      >
        <defs>
          <linearGradient id="agodi-diamond" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#FFAB66" />
            <stop offset="100%" stopColor="#FF6A00" />
          </linearGradient>
        </defs>
        {/* Purple ring (drawn as a thick stroke around a white interior) */}
        <circle cx="32" cy="32" r="27" fill="#FAF7F2" stroke="#4A1AB0" strokeWidth="8" />
        {/* Vertical orange diamond — top + bottom points reach toward the ring */}
        <polygon points="32,7 50,32 32,57 14,32" fill="url(#agodi-diamond)" />
      </svg>
      {withWordmark && (
        <span className="font-display font-bold tracking-tight text-2xl">
          <span className="text-cream">Agodi</span>{" "}
          <span className="text-purple-soft">Technologies</span>
        </span>
      )}
    </span>
  );
}
