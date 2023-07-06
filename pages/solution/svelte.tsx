import SolutionSveltePage from "@/src/pages/solution/svelte/index";

import { ComponentProps } from "react";

const SolutionSvelte = (props: ComponentProps<"div">) => (
  <SolutionSveltePage {...props} />
);

export default SolutionSvelte;
