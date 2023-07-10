import { HighlightedCode } from "@ionic-internal/components-react";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { PrismTheme } from "prism-react-renderer";

const pixelize = (value: number) => `${value}px`;

import styles from "./index.module.scss";
import { useWindowSize } from "usehooks-ts";

const CodeTabs = ({
  data,
  theme,
}: {
  theme: PrismTheme;
  data: {
    tabs: string[];
    languages: string[];
    code: string[];
  };
}) => {
  const [activeTab, setActiveTab] = useState({
    index: 0,
    left: "0px",
    width: "0px",
  });

  const [codeLeft, setCodeLeft] = useState<string>();
  const tabs = useRef<HTMLButtonElement[]>([]);
  const elRef = useRef<HTMLDivElement>();
  const { width } = useWindowSize();

  useEffect(() => {
    if (!elRef.current) return;

    setCodeLeft(`-${pixelize(elRef.current.offsetWidth * activeTab.index)}`);
  }, [width]);

  const handleTabSelect = ({
    target,
    index,
  }: {
    target: EventTarget;
    index: number;
  }) => {
    if (!(target instanceof HTMLButtonElement)) return;

    setActiveTab({
      index,
      left: pixelize(target.offsetLeft),
      width: pixelize(target.offsetWidth),
    });

    if (!elRef.current) return;

    setCodeLeft(`-${pixelize(elRef.current.offsetWidth * index)}`);
  };

  const handleMount = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;

    elRef.current = el;
    setCodeLeft(`-${pixelize(el.offsetWidth * activeTab.index)}`);
  }, []);

  const handleTabMount = useCallback(
    ({ tabEl, i }: { tabEl: HTMLButtonElement; i: number }) => {
      if (tabs.current[i]) {
        return;
      } else {
        tabs.current[i] = tabEl;

        if (i === activeTab.index) {
          setActiveTab((cur) => ({
            ...cur,
            left: pixelize(tabEl.offsetLeft),
            width: pixelize(tabEl.offsetWidth),
          }));
        }
      }
    },
    []
  );

  return (
    <div
      ref={handleMount}
      className={clsx(styles.code, "code-tabs")}
      style={
        {
          "--tab-left": activeTab.left,
          "--tab-width": activeTab.width,
          "--code-left": codeLeft,
        } as Record<string, string>
      }
    >
      <nav>
        <div className="tabs-wrapper">
          {data.tabs.map((tab, i) => (
            <button
              className={clsx({
                active: activeTab.index === i,
              })}
              ref={(el) => el && handleTabMount({ tabEl: el, i })}
              onClick={({ target }) => handleTabSelect({ target, index: i })}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
      <div className="background">
        <div className="code-wrapper">
          {data.code.map((code, i) => (
            <article>
              <pre>
                <HighlightedCode
                  theme={theme}
                  language={
                    data.languages.length === 1
                      ? data.languages[0]
                      : data.languages[i]
                  }
                  code={code}
                />
              </pre>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeTabs;
