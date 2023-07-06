import clsx from "clsx";
import styles from "./index.module.scss";

const Prefooter = () => {
  return (
    <div className={clsx(styles.prefooter, "prefooter")}>
      <div className="squares"></div>
      <div className="ds-container">
        <a href="/docs/getting-started">
          <svg
            width="56"
            height="50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1h16.2c2.86 0 5.61 1.12 7.64 3.12A10.6 10.6 0 0128 11.67V49c0-2.12-.85-4.16-2.37-5.66A8.15 8.15 0 0019.9 41H1V1zM55 1H38.8c-2.86 0-5.61 1.12-7.64 3.12A10.6 10.6 0 0028 11.67V49c0-2.12.85-4.16 2.37-5.66A8.15 8.15 0 0136.1 41H55V1z"
              stroke="#46B1FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h4>Installation Guide →</h4>
          <p>Install Capacitor and learn how to start building with it</p>
        </a>
        <a href="/docs/apis">
          <svg
            width="48"
            height="50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47 34.85v-19.7c0-.65-.18-1.28-.51-1.84a3.77 3.77 0 00-1.4-1.35L26.9 1.76a5.91 5.91 0 00-5.78 0L2.9 11.95c-.58.32-1.07.79-1.4 1.35-.33.56-.5 1.19-.51 1.84v19.7c0 .65.18 1.28.51 1.84s.81 1.02 1.4 1.35l18.2 10.2a5.92 5.92 0 005.78 0l18.2-10.2c.59-.33 1.07-.8 1.4-1.35.33-.56.51-1.2.51-1.84z"
              stroke="#46B1FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.6 13.23L24 25.93l22.4-12.7M24 49V25.92"
              stroke="#46B1FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="roqund"
            />
          </svg>
          <h4>Explore Native Plugins →</h4>
          <p>Explore Native Plugins that are available to all Capacitor apps</p>
        </a>
      </div>
    </div>
  );
};

export default Prefooter;
