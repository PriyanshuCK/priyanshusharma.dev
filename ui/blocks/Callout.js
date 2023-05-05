import Paragraph from '@/ui/blocks/Paragraph'
export default function Callout({ emoji, rich_text, color, id }) {
  return (
    <div className="my-2 rounded-2xl border border-primary-500 p-6 shadow-md shadow-primary-100 ring-1 ring-black/5 prose-p:m-0 dark:bg-gray-800 dark:shadow-gray-800 dark:ring-white/10 sm:mx-auto sm:w-4/5">
      <div className="flex">
        <div className="mr-4">
          <div className="h-[60px] w-[60px] overflow-hidden rounded-full p-[5px] shadow-md shadow-primary-100 [background:linear-gradient(-45deg,rgba(0,0,0,.1),rgba(255,255,255,.3))] dark:shadow-gray-700">
            <span className="flex h-full w-full items-center overflow-hidden rounded-full bg-primary-100 p-[0.65rem] text-center text-white [box-shadow:inset_8px_8px_16px_0_rgb(0,0,0,0.2),inset_-8px_-8px_16px_0_rgb(255,255,255,0.4)] dark:bg-gray-800 dark:[box-shadow:inset_8px_8px_16px_0_rgb(0,0,0,0.2),inset_-8px_-8px_16px_0_rgb(255,255,255,0.2)] sm:p-2">
              <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full text-center text-xl sm:h-10 sm:w-10">
                {emoji}
              </span>
            </span>
          </div>
        </div>
        <Paragraph rich_text={rich_text} color={color} id={id} />
      </div>
    </div>
  )
}
