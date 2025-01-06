type ThumbNailProps = {
  thumbnailUrl: string;
};

export default function ThumbNail({ thumbnailUrl }: ThumbNailProps) {
  return (
    <div>
      <img
        src={thumbnailUrl}
        alt="Hex Image"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
