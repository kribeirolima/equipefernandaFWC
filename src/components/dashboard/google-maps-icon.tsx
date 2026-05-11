export function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2C7.589 2 4 5.589 4 9.995C4 14.49 8.5 19.5 11.293 22.293a1 1 0 0 0 1.414 0C15.5 19.5 20 14.49 20 9.995C20 5.589 16.411 2 12 2Z"
        fill="#EA4335"
      />
      <circle cx="12" cy="9.995" r="3.5" fill="#fff" />
      <circle cx="12" cy="9.995" r="2" fill="#1A73E8" />
    </svg>
  );
}
