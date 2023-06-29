"use client";
import { useRef, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import siteMetadata from "@/data/metadata";

const NewsletterForm = ({ title = "Subscribe to Thursday Thoughts" }) => {
  let [isOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);
  }
  const inputEl: any = useRef(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const subscribe = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (res.status != 200) {
      setError(true);
      return;
    }
    const state = error.subscription.state;
    inputEl.current.value = "";
    setError(false);
    if (state === "inactive") {
      setInactive(true);
    } else {
      setActive(true);
    }
  };

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </div>
      <form className="flex flex-col" onSubmit={subscribe}>
        <div>
          <label className="sr-only" htmlFor="email-input">
            Email address
          </label>
          <input
            autoComplete="email"
            className="w-[288px] rounded-md bg-inherit px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 md:w-[384px] lg:w-[448px]"
            id="email-input"
            name="email"
            placeholder={
              active || inactive
                ? "You're subscribed !  🎉"
                : "Enter your email"
            }
            ref={inputEl}
            required
            type="email"
            disabled={active || inactive || error}
          />
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm">
          <button
            className={`w-[288px] rounded-md bg-primary-100 py-2 px-4 font-medium text-primary-700 dark:bg-gray-700 dark:text-gray-200 md:w-[384px] lg:w-[448px] ${
              active || inactive || error
                ? "cursor-default"
                : "hover:bg-primary-200 dark:hover:bg-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:ring-offset-black dark:focus:ring-primary-400`}
            type="submit"
            disabled={active || inactive || error}
          >
            {(active || inactive) && <>Thank You!</>}
            {error && <>Please refresh & retry!</>}
            {!(active || inactive || error) && <>Sign up</>}
          </button>
        </div>
      </form>
      {(active || inactive) && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                    >
                      {active
                        ? "You're already subscribed!✨"
                        : "Successfull! 🎉 You're now subscribed"}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {inactive && (
                          <>
                            Please confirm your subscription by clicking on the
                            confirmation button in the confirmation mail sent to
                            your inbox.
                            <br />
                            Add{" "}
                            <a href="mailto:priyanshu@priyanshusharma.dev">
                              {" "}
                              priyanshu@priyanshusharma.dev{" "}
                            </a>{" "}
                            to your contacts so that you recieve the mails as
                            they arrive.
                          </>
                        )}
                        {active && (
                          <>
                            Thank you🤗 for being a valued member of Thursday
                            Thoughts! <br /> You&apos;re already an active
                            subscriber of Thursday Thoughts. You&apos;ll
                            continue to receive the weekly issues.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                        onClick={closeModal}
                      >
                        Ok!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      {error && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                    >
                      🖲️There was an error subscribing to the list!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please refresh the page and try again!
                        <br />
                        If the issue persists, kindly reach out to me at{" "}
                        <Link href="mailto:priyanshu@priyanshusharma.dev">
                          priyanshu@priyanshusharma.dev
                        </Link>
                        .<br />
                        I&apos;ll be more than happy to assist you in resolving
                        the problem and getting you subscribed.
                        <br />
                        Looking forward to welcome you into the community
                        soon✨.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                        onClick={closeModal}
                      >
                        Ok!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default NewsletterForm;

export const BlogNewsletterForm = (props: any) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={props.title} />
    </div>
  </div>
);
