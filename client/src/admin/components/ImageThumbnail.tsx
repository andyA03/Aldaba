type ThumbProps = {
  src: string;
  alt: string;
};

export default function ImageThumbnail({ src, alt }: ThumbProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="table-thumb"
      onError={e => {
        (e.target as HTMLImageElement).src = "/images/aldaba-card.svg";
      }}
    />
  );
}
