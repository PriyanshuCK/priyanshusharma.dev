import Image from "next/image";

export default function EmbededImageBlock({ src }) {
  return (
    <div className="flex justify-center">
      <div className="w-[calc(120rem/5)] h-[calc(67.5rem/5)] sm:w-[calc(120rem/4)] sm:h-[calc(67.5rem/4)] md:w-[calc(120rem/3)] md:h-[calc(67.5rem/3)] relative mb-10">
        <Image
          src={src}
          alt=""
          className="absolute rounded-lg shadow-lg object-contain"
          fill={true}
        />
      </div>
    </div>
  );
}
