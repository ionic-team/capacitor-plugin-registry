import { Component, h } from "@stencil/core";
import { ResponsiveContainer, Button } from "@ionic-internal/ionic-ds";

import Parallax from "parallax-js";

import Capacitor3Rainbow from "../assets/capacitor-3-rainbow.svg";
import { Background } from "../assets/bg-3-only.svg";
// import { Background } from '../assets/bg-boxes.svg';

@Component({
  tag: "top-parallax",
  styleUrl: "top-parallax.scss",
  scoped: true,
})
export class LandingPage {
  $shapes!: HTMLDivElement;
  libID = "parallax-lib";
  parallaxInstance: Parallax;

  disconnectedCallback() {
    this.parallaxInstance.distroy();
  }

  componentDidLoad() {
    this.parallaxInstance = new Parallax(this.$shapes, {
      invertX: false,
      invertY: false,
      scalarX: 3,
      scalarY: 3,
    });
  }

  render() {
    return (
      <section id="top">
        <div className="ds-container">
          <div id="shapes" ref={(el) => (this.$shapes = el as HTMLDivElement)}>
            <div id="circle-1" data-depth="0.8" />
            <div id="circle-2" data-depth="0.3" />
            <div id="circle-3" data-depth="0.6" />
            <div id="square-1" data-depth="0.7" />
            <div id="square-2" data-depth="0.7" />
            <div id="square-3" data-depth="0.6" />
            <div id="square-4" data-depth="0.3" />
            <div id="square-5" data-depth="0.1" />
            <div id="square-6" data-depth="0.2" />
            <div id="square-7" data-depth="0.3" />
            <div id="square-8" data-depth="0.5" />
            <Background id="bg" data-depth="0.3" />
          </div>
          <Capacitor3Rainbow />
          <h1>
            <span className="reveal">Faster.</span>
            <span className="reveal">Smaller.</span>
            <span className="reveal">Simpler.</span>
          </h1>
          <p className="reveal">
            A brand new approach to building native apps with the Web — now even
            faster, more modular, and more enjoyable to build with than ever.
          </p>
          <div className="btns">
            <Button
              className="reveal"
              kind="round"
              color="indigo"
              variation="light"
              href="/docs/getting-started"
              anchor={true}
            >
              Try Capacitor 3 <span>{"→"}</span>
            </Button>
            <Button
              className="reveal"
              kind="round"
              color="indigo"
              href="https://ionic.io/blog/announcing-capacitor-3-0/"
              anchor={true}
            >
              Read the Blog post <span>{"→"}</span>
            </Button>
          </div>
        </ResponsiveContainer>
      </section>
    );
  }
}
