import ScrollButtonsComponent from "@/ui/scroll-button-component";
import dynamic from "next/dynamic";

const ScrollComponent = dynamic(
  () => {
    return import("@/ui/scroll-button-component");
  },
  { ssr: false }
);

const ScrollButtons = () => {
  return (
    <>
      <ScrollButtonsComponent />
    </>
  );
};
export default ScrollButtons;
