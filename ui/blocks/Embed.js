export default function EmbededImageBlock({ src }) {
  return (
    <div className="flex justify-center">
      <div className="not-prose flex max-w-md flex-col items-center">
        <picture>
          <img
            src={src}
            alt=""
            className="mb-[2px] max-h-80 rounded-lg shadow-lg"
          />
        </picture>
      </div>
    </div>
  );
}
