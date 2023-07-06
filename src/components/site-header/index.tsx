import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import SiteHeaderDesktop from "./desktop";
import SiteHeaderMobile from "./mobile";
import { useIntersectionObserver, useWindowSize } from "usehooks-ts";

import styles from "./index.module.scss";

export default function SiteHeader({
  sticky = true,
  theme = "light",
  ...props
}) {
  const [isStuck, setIsStuck] = useState<boolean>(false);
  const [isOffset, setIsOffset] = useState<boolean>(true);

  const intersectionRef = useRef<HTMLDivElement>();
  const elRef = useRef<HTMLDivElement>();

  const { width, height } = useWindowSize();
  const { isIntersecting } = useIntersectionObserver(intersectionRef, {}) || {};

  useEffect(() => {
    if (typeof isIntersecting === "undefined" || !sticky) return;

    isIntersecting ? setIsStuck(false) : setIsStuck(true);
  }, [isIntersecting, sticky]);

  useEffect(() => {
    elRef.current && setIsOffset(elRef.current.scrollTop > 0);
  }, [width, height]);

  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.intersectionHelper, {
          [styles.intersectionHelperOffset]: isOffset,
        })}
        ref={intersectionRef}
      />
      <SiteHeaderDesktop
        {...props}
        theme={theme}
        ref={elRef}
        className={clsx(
          props.className,
          styles.header,
          `site-header--${theme}`,
          {
            "site-header--stuck": isStuck,
            [styles.headerSticky]: sticky,
            "site-header--sticky": sticky,
          }
        )}
      />
      <SiteHeaderMobile
        {...props}
        theme={theme}
        ref={elRef}
        className={clsx(
          props.className,
          styles.header,
          `site-header--${theme}`,
          {
            "site-header--stuck": isStuck,
            [styles.headerSticky]: sticky,
            "site-header--sticky": sticky,
          }
        )}
      />
    </div>
  );
}
