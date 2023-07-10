import SolutionVuePage from "@pages/solution/vue/index";

import { ComponentProps } from "react";

const SolutionVue = (props: ComponentProps<"div">) => (
  <SolutionVuePage {...props} />
);

export default SolutionVue;
