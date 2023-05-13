export default async function newsletter() {
  return (
    <>
      <div className="lg:mx-auto lg:w-2/3 xl:divide-y-2 xl:divide-primary-200 xl:dark:divide-primary-400">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                Thursday Thoughts
              </h1>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center py-10">
          <p className="text-center">
            Subscribe to my newsletter where I share my learnings and valuable
            insights from the content I consume.
          </p>
          <iframe
            className="my-6 h-40 rounded-2xl  md:mx-auto md:w-1/2"
            src="https://priyanshuck.substack.com/embed"
          ></iframe>
          <p className="text-center">
            Each Thursday, you will receive an email from me featuring my
            learnings of the week on a variety of topics, including personal
            development, productivity, and self-improvement.
          </p>
        </div>
      </div>
    </>
  );
}
