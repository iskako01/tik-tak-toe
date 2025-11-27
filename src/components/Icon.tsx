interface IconPropsInterface {
  iconName: string;
  className?: string;
  width?: number;
  height?: number;
}

const staticFolder = process.env.NEXT_PUBLIC_STATIC_FOLDER;

export default function Icon({
  iconName,
  className,
  height = 12,
  width = 12,
}: IconPropsInterface) {
  return (
    <svg className={className} height={height} width={width}>
      <use
        xlinkHref={`${staticFolder}/icons.svg#${iconName}`}
        height={height}
        width={width}
      />
    </svg>
  );
}
