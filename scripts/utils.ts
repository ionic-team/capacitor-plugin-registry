import fetch from "cross-fetch";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { NpmInfo } from "./types/npm-data-schema";

export function patchConsole() {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    originalConsoleError(chalk.red(...args));
  };
  const originalConsoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (process.env.DATA_SCRIPTS_LOG_LEVEL !== "debug") return;
    originalConsoleWarn(chalk.yellow(...args));
  };
  const originalConsoleLog = console.log;
  console.log = (...args: any[]) => {
    originalConsoleLog(...args);
  };
  const originalConsoleInfo = console.info;
  console.info = (...args: any[]) => {
    if (process.env.DATA_SCRIPTS_LOG_LEVEL !== "debug") return;
    originalConsoleInfo(chalk.blue(...args));
  };
}

export function log(message: string) {
  console.log(chalk.blue(message));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * This method should lowercase all the strings, trim them, and remove duplicates
 */
export function normalizeStringArray(arr?: string[]) {
  if (!arr || !Array.isArray(arr)) return [];
  return Array.from(new Set(arr.map((s) => s.toLowerCase().trim())));
}

export function normalizeAuthor(author: NpmInfo["author"]) {
  return typeof author === "string" ? { name: author } : author;
}

export function normalizeLicense(license: NpmInfo["license"]) {
  return typeof license === "string" ? { type: license } : license;
}

export function createDataDirectoryIfNotExists() {
  const dir = path.join("data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

export async function httpGet(url: string, opts: any): Promise<any> {
  const response = await fetch(url, opts);
  try {
    const data = await response.json();
    if (rateLimited(data)) {
      console.log(`The api call ${url} was rate limited.`);
    }
    return data;
  } catch (error) {
    throw new Error(
      `Error: get ${url}: ${response.status} ${response.statusText}`
    );
  }
}

export function rateLimited(a: any): boolean {
  return (
    (a as any).message?.startsWith("API rate limit exceeded") ||
    (a as any).message?.startsWith("You have exceeded a secondary rate limit")
  );
}
