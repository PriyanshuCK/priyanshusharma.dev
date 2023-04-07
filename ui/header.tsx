"use client";

import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  EnvelopeOpenIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Icon from "@/ui/icon";
import ColorSwitch from "@/ui/color-theme-switch";
import navLinks from "@/data/nav-links";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}

export default function Header(props: any) {
  const [isShowing1, setIsShowing1] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);
  const [isShowing3, setIsShowing3] = useState(false);
  const [show, setShow] = useState(false);

  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 25) setShow(true);
      else setShow(false);
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);
  return (
    <>
      <Popover>
        <div className="relative z-10">
          <div
            className={`fixed mx-auto w-full bg-white/50 px-4 backdrop-blur-md backdrop-filter transition-all duration-300 dark:bg-slate-900/50 dark:shadow-slate-800 sm:px-8 ${
              show ? "shadow-md dark:shadow-sm" : ""
            } ${scrollDirection === "down" ? "-top-24" : "top-0"}`}
          >
            <div className="flex items-center justify-between py-2 md:justify-start md:space-x-10">
              <div className="flex justify-start md:grow lg:w-0 lg:flex-1">
                <Link href="/" aria-label="Priyanshu Sharma">
                  <div className="flex items-center justify-between">
                    <div className="mr-3 py-1">
                      <Icon />
                    </div>
                    <div className="hidden h-6 text-xl font-semibold lg:block text-slate-900 dark:text-white">
                      Priyanshu Sharma
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex flex-row space-x-3 justify-center items-center md:items-start md:flex-row-reverse">
                <ColorSwitch
                  getColor={props.getColor}
                  scrollDirection={scrollDirection}
                />
                <div className="md:hidden">
                  <Popover.Button className="inline-flex scale-[0.8] items-center justify-center rounded-full border border-primary-400 p-2 text-primary-400 transition-all duration-300 hover:bg-primary-400 hover:text-white focus:outline-none dark:border-primary-300 dark:text-primary-300 dark:hover:border-slate-500 dark:hover:bg-slate-500 dark:hover:text-primary-400">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <Popover.Group
                  as="nav"
                  className="hidden space-x-6 align-middle md:flex md:!mr-3"
                >
                  <Popover className="relative translate-y-2">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-slate-500" : "text-slate-500",
                            "group inline-flex items-center rounded-md text-base font-medium hover:text-primary-500 focus:outline-none  dark:text-slate-200 dark:hover:text-primary-400"
                          )}
                          onMouseEnter={() => setIsShowing1(true)}
                          onMouseLeave={() => setIsShowing1(false)}
                        >
                          <span>Learnings</span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                          show={isShowing1}
                        >
                          <Popover.Panel
                            className="absolute z-10 mt-2 w-screen max-w-md transform px-2 sm:px-0 left-1/2 ml-0 -translate-x-1/2"
                            onMouseEnter={() => setIsShowing1(true)}
                            onMouseLeave={() => setIsShowing1(false)}
                          >
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-800">
                              <div className="relative grid gap-6 bg-white px-5 py-6 dark:bg-slate-900 sm:gap-8 sm:p-8">
                                {navLinks.learnings.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-primary-50 dark:hover:bg-slate-800"
                                  >
                                    <item.icon
                                      className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-slate-900 dark:text-slate-200">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <div className="bg-primary-50 p-4 dark:bg-slate-800">
                                <Link
                                  href="/posts"
                                  className="flex items-start rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-primary-100 focus:outline-none dark:hover:bg-slate-700"
                                >
                                  <NewspaperIcon
                                    className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-slate-900 dark:text-slate-200">
                                      All Posts
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                      Browse through all the posts at one place.
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>

                  <Popover className="relative translate-y-2">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-slate-500" : "text-slate-500",
                            "group inline-flex items-center rounded-md text-base font-medium hover:text-primary-500 focus:outline-none dark:text-slate-200 dark:hover:text-primary-400"
                          )}
                          onMouseEnter={() => setIsShowing2(true)}
                          onMouseLeave={() => setIsShowing2(false)}
                        >
                          <span>Newsletter</span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                          show={isShowing2}
                        >
                          <Popover.Panel
                            className="absolute z-10 mt-2 w-screen max-w-md transform px-2 sm:px-0 left-1/2 ml-0 -translate-x-1/2"
                            onMouseEnter={() => setIsShowing2(true)}
                            onMouseLeave={() => setIsShowing2(false)}
                          >
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-800">
                              <div className="relative grid gap-6 bg-white px-5 py-6 dark:bg-slate-900 sm:gap-8 sm:p-8">
                                <Link
                                  href="/newsletter"
                                  className="-m-3 flex items-start rounded-lg p-3 hover:bg-primary-50 dark:hover:bg-slate-800"
                                >
                                  <EnvelopeOpenIcon
                                    className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-slate-900 dark:text-slate-200">
                                      Thursday Thoughts
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                      Subscribe to my newsletter where I share
                                      my learnings and valuable insights from
                                      the content I consume
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>

                  <Popover className="relative translate-y-2">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-slate-500" : "text-slate-500",
                            "group inline-flex items-center rounded-md text-base font-medium hover:text-primary-500 focus:outline-none dark:text-slate-200 dark:hover:text-primary-400"
                          )}
                          onMouseEnter={() => setIsShowing3(true)}
                          onMouseLeave={() => setIsShowing3(false)}
                        >
                          <span>Experiences</span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                          show={isShowing3}
                        >
                          <Popover.Panel
                            className="absolute z-10 -ml-80 mt-2 w-screen max-w-md transform px-2 sm:px-0"
                            onMouseEnter={() => setIsShowing3(true)}
                            onMouseLeave={() => setIsShowing3(false)}
                          >
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-800">
                              <div className="relative grid gap-6 bg-white px-5 py-6 dark:bg-slate-900 sm:gap-8 sm:p-8">
                                {navLinks.experiences.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-primary-50 dark:hover:bg-slate-800"
                                  >
                                    <item.icon
                                      className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-slate-900 dark:text-slate-200">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <div className="bg-primary-50 p-4 dark:bg-slate-800">
                                <Link
                                  href="/posts"
                                  className="flex items-start rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-primary-100 focus:outline-none dark:hover:bg-slate-700"
                                >
                                  <NewspaperIcon
                                    className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-slate-900 dark:text-slate-200">
                                      All Posts
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                      Browse through all the posts at one place.
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[20]">
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel className="fixed inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
              <div className="divide-y-2 divide-slate-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:divide-slate-800 dark:bg-slate-900 dark:ring-slate-800">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link href="/" aria-label="Priyanshu Sharma">
                        <Icon />
                      </Link>
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex scale-[0.8] items-center justify-center rounded-full border border-primary-400 p-2 text-primary-400 transition-all duration-300 hover:bg-primary-400 hover:text-white focus:outline-none dark:border-primary-300 dark:text-primary-300 dark:hover:border-slate-500 dark:hover:bg-slate-500 dark:hover:text-primary-400">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {navLinks.experiences.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50 dark:hover:bg-slate-800"
                        >
                          <item.icon
                            className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-slate-900 dark:text-slate-200">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                      {navLinks.learnings.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50 dark:hover:bg-slate-800"
                        >
                          <item.icon
                            className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-slate-900 dark:text-slate-200">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                      <Link
                        key="newsletter"
                        href="/newsletter"
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50 dark:hover:bg-slate-800"
                      >
                        <EnvelopeOpenIcon
                          className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-slate-900 dark:text-slate-200">
                          Thursday Thoughts
                        </span>
                      </Link>
                      <Link
                        key="posts"
                        href="/posts"
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-primary-50 dark:hover:bg-slate-800"
                      >
                        <NewspaperIcon
                          className="h-6 w-6 flex-shrink-0 text-primary-600 dark:text-primary-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-slate-900 dark:text-slate-200">
                          All Posts
                        </span>
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      </Popover>
    </>
  );
}
