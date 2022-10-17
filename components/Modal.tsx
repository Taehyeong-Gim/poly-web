import React, {
  Children,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
} from "react";

const MODAL_SIGNITURE = "modal-signiture";

export default function Modal({
  children,
  isModalOpened,
  setIsModalOpened,
}: {
  children: ReactElement;
  isModalOpened: boolean;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}) {
  // add MODAL_SIGNITURE class at children to control open-close of modal
  const SignitureAttachedChildren: ReactElement[] = Children.map(
    children,
    (child) =>
      React.cloneElement(child, {
        className: `${child.props.className} ${MODAL_SIGNITURE}`,
      })
  );
  useEffect(() => {
    if (isModalOpened) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpened]);
  return (
    <div
      className={`fixed top-0 w-screen h-screen z-50 bg-gray-900 bg-opacity-30 overscroll-none ${
        isModalOpened ? "" : "hidden"
      }`}
      onClick={(e) => {
        if (e.target instanceof Element) {
          const isModalClicked = !!e.target.closest(`.${MODAL_SIGNITURE}`);
          if (isModalClicked) {
            return;
          }
        }
        document.body.classList.add("overflow-hidden");
        setIsModalOpened(false);
      }}
    >
      {SignitureAttachedChildren}
    </div>
  );
}
