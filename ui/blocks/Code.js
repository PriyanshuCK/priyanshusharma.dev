import Pre from "@/ui/pre";
// Design taken from tailwindcss.com code blocks
export default function Code({ rich_text, language, caption }) {
  return (
    <>
      <div className="mt-5 mb-8 first:mt-0 last:mb-0 relative overflow-hidden rounded-2xl">
        <div
          className={`${
            caption ? "pt-2" : "pt-1"
          } bg-slate-800 shadow-lg group`}
        >
          {caption ? (
            <div className="flex text-slate-400 text-xs leading-6">
              <div className="flex-none text-[#7FDBCA] border-t border-b border-t-transparent border-b-[#7FDBCA] px-4 py-1 flex items-center">
                {caption}
              </div>
              <div class="flex-auto flex items-center bg-slate-700/50 border border-slate-500/30 rounded-tl"></div>
            </div>
          ) : (
            ""
          )}
          <Pre caption={caption}>{rich_text[0].text.content}</Pre>
        </div>
      </div>
    </>
  );
}
{
  /*  <div className="not-prose my-6">
      {caption ? (
        <span className="flex flex-row justify-between rounded-t-lg border-b-[1px] border-gray-600 bg-gray-800 px-4 py-3 text-[#7FDBCA]">
          <span className="text-sm">{caption}</span>
        </span>
      ) : (
        ""
      )}
      <span>
        <Pre caption={caption}>{rich_text[0].text.content}</Pre>
      </span>
    </div> */
}
