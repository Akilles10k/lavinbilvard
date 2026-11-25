type LogoIconProps = {
  className?: string;
  size?: number;
};

export default function LogoIcon({ className = "site-logo", size = 48 }: LogoIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden
    >
      <rect width="64" height="64" rx="14" fill="#9a231e" />
      <path
        d="M12 40.5h40M16 40.5l3.2-8.2c.6-1.5 2-2.5 3.6-2.5h8.4l3.2-5.2c.6-1 1.7-1.6 2.9-1.6h6.2c1.5 0 2.9.8 3.6 2.1l2.4 4.7h2.5"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="23" cy="40.5" r="3.2" stroke="#fff" strokeWidth="2.2" fill="none" />
      <circle cx="45" cy="40.5" r="3.2" stroke="#fff" strokeWidth="2.2" fill="none" />
    </svg>
  );
}
