import { z } from "zod";

export const preprocessStringNumber =
  (chain: z.ZodSchema) => (parameter: any) => {
    const parsedNumber = parseInt(chain.parse(parameter), 10);
    if (isNaN(parsedNumber)) {
      return parameter;
    }
    return parsedNumber;
  };

export const preprocessStringArray =
  (chain: z.ZodSchema) => (parameter: any) => {
    const value = chain.parse(parameter);
    if (typeof value === "string") {
      return value.split(",");
    }
    return parameter;
  };
