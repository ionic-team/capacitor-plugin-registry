import { Element, Component, h, Host, State } from "@stencil/core";

@Component({
  tag: "enterprise-subnav",
  styleUrl: "enterprise-subnav.scss",
  scoped: true,
})
export class EnterpriseSubnav {
  @Element() el: HTMLElement;
  @State() visible: boolean;

  private observer: IntersectionObserver;

  componentWillLoad() {
    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver((entries) => {
      this.visible =
        entries[0].target.getBoundingClientRect().top < 0 ? true : false;
    }, options);

    this.observer.observe(this.el);
  }

  disconnectedCallback() {
    this.observer.unobserve(this.el);
  }

  render() {
    return (
      <Host
        className={{
          visible: this.visible,
        }}
      >
        <div className="wrapper heading-container">
          <span className="title">Enterprise</span>
          <div className="cta-row">
            <a href="#demo" className="btn-primary">
              Talk to sales
            </a>
          </div>
        </div>
      </Host>
    );
  }
}
