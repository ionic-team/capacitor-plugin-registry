import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

let options = {
  rootMargin: "0px",
  threshold: 1.0,
};

const EnterpriseSubnav = () => {
  const [visible, setVisible] = useState(false);
  const elRef = useRef<HTMLElement>(null);
  const observer = useRef<IntersectionObserver>();

  useLayoutEffect(() => {
    if (!elRef.current) return;

    observer.current = new IntersectionObserver((entries) => {
      setVisible(
        entries[0].target.getBoundingClientRect().top < 0 ? true : false
      );
    }, options);

    observer.current.observe(elRef.current);

    return () => observer.current.unobserve(elRef.current);
  }, []);

  return (
    <nav
      ref={elRef}
      className={clsx(styles.subnav, {
        [styles.subnavVisible]: visible,
      })}
    >
      <div className="wrapper heading-container">
        <div className="ds-container">
          <span className="title">Enterprise</span>
          <div className="cta-row">
            <a href="#demo" className="btn-primary">
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EnterpriseSubnav;
