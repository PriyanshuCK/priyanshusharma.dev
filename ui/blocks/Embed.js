import Image from "next/image";

export default function EmbededImageBlock({ src }) {
  return (
    <div className="max-w-md h-80 relative">
      <Image
        src={src}
        alt="alt text"
        className="mb-[2px] rounded-lg shadow-lg object-contain"
        fill={true}
      />
    </div>
  );
}
