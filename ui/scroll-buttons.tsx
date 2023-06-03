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
      <ScrollComponent />
    </>
  );
};
export default ScrollButtons;
