import clsx from 'clsx';

export default function LogoIcon({
  className,
  classNameMark,
  classNameType,
}: {
  className?: string;
  classNameMark?: string;
  classNameType?: string;
}) {
  return (
    <svg
      className={className}
      width="65"
      height="58"
      viewBox="0 0 65 58"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={clsx(['fill-offBlack', classNameMark])}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60 16.2024L42.2484 25.7757H59.8314V30H5.20153V25.7757H23.0457C23.0469 25.7673 23.0481 25.7589 23.0494 25.7506L5 16.2115L7.19911 12.5285L24.7298 21.7935C24.9427 21.5154 25.1734 21.248 25.4214 20.993L15.3417 4.92989L19.2083 2.78233L29.1635 18.647C29.5117 18.529 29.8675 18.4304 30.2291 18.3517L30.2964 0L34.7865 0.0145666L34.719 18.413C35.1129 18.5101 35.4993 18.6312 35.8756 18.7752L45.768 2.79322L49.6482 4.919L39.5246 21.2745C39.7448 21.5212 39.9498 21.7782 40.1388 22.0442L57.767 12.5375L60 16.2024Z"
        fill="#3A3E3E"
      />
    </svg>
  );
}
