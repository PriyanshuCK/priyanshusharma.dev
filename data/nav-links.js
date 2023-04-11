import {
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
export {
  ChatBubbleBottomCenterTextIcon,
  BookOpenIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const navLinks = {
  experiences: [
    {
      name: "Blog",
      description:
        "A detailed account of my happenings, activities, beliefs, and thoughts.",
      href: "/blog",
      icon: ChatBubbleBottomCenterTextIcon,
      type: ["blog", "journal"],
    },
    {
      name: "Journal",
      description:
        "An informal catalog of what I learn, do & observe everyday.",
      href: "/journal",
      icon: PencilSquareIcon,
      type: ["blog", "journal"],
    },
  ],
  learnings: [
    {
      name: "Articles",
      description: "Articles delineating some facts, ideas, or thoughts.",
      href: "/articles",
      icon: DocumentTextIcon,
      type: ["articles", "notes"],
    },
    {
      name: "Book Notes",
      description: "Summary and takeaways of the non-fiction books I've read.",
      href: "/notes",
      icon: BookOpenIcon,
      type: ["articles", "notes"],
    },
  ],
};

export default navLinks;
