import { clsx } from "clsx";
import {
  Children,
  HTMLAttributes,
  cloneElement,
  isValidElement,
  useCallback,
  useState,
} from "react";

import UpArrow from "../../../assets/icon-up-carrot.svg";
import DownArrow from "../../../assets/icon-down-carrot.svg";
// import { useScreenWidth } from "@utils/customHooks";

import styles from "./index.module.scss";

const MenuItemExpander = (props: HTMLAttributes<HTMLElement>) => {
  const [expanded, setExpanded] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  // const width = useScreenWidth(50);

  const callbackRef = useCallback(
    (e: HTMLElement) => {
      if (!e) return;
      setDropdownHeight(e.offsetHeight);
    },
    [
      setDropdownHeight,
      // width
    ]
  );

  return (
    <div
      {...props}
      className={clsx("menu-item-expander", styles.expander, {
        [styles.expanderExpanded]: expanded,
      })}
      style={
        { ...props.style, "--h-dropdown": `${dropdownHeight}px` } as Record<
          string,
          string
        >
      }
    >
      {Children.map(props.children, (child, i) => {
        if (!child || !isValidElement(child)) return child;

        if (i === 0) {
          return (
            <button
              aria-label={`${expanded ? "close" : "open"} menu item`}
              onClick={() => setExpanded(!expanded)}
              className="menu-item-expander__expand-button"
            >
              {cloneElement(child, {
                ...child.props,
                className: clsx({
                  [child.props.className]: Boolean(child.props.className),
                  "menu-item-expander__title": true,
                }),
              })}
              {expanded ? <UpArrow /> : <DownArrow />}
            </button>
          );
        } else {
          return (
            <div className="menu-item-expander__dropdown-wrapper">
              {cloneElement(child, {
                ...child.props,
                ref: callbackRef,
                className: clsx({
                  [child.props.className]: Boolean(child.props.className),
                  "menu-item-expander__dropdown": true,
                }),
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

export default MenuItemExpander;
