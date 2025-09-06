#!/usr/bin/env node

// Imports ########################################################################################

import ora from "ora";
import chalk from "chalk";
import CliTable3 from "cli-table3";

import type { IpInfo } from "./types/ip-info.type.ts";

// Constants ######################################################################################

const CONSTANTS = {
  GetIpInfoUrl: (ip: string = "") => `https://api.ipapi.is/?q=${ip}`,
} as const;

// Utils ##########################################################################################

const fetcher = async <T>(
  url: string,
  { loadingText }: { loadingText?: string } = {},
): Promise<T> => {
  const spinner = ora({ text: loadingText }).start();

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Provider Not Found!");

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) return (await response.json()) as T;

    return (await response.text()) as T;
  } catch (err) {
    spinner.fail(err instanceof Error ? err.message : String(err));
    process.exit(1);
  } finally {
    spinner.stop();
  }
};

// App ############################################################################################

(async () => {
  const ipInfo = await fetcher<IpInfo>(CONSTANTS.GetIpInfoUrl(), {
    loadingText: "Getting IP Information...",
  });

  const table = new CliTable3({
    chars: {
      middle: "",
      "top-mid": "",
      "bottom-mid": "",
      "mid-mid": "",
    },
    style: { "padding-left": 4, "padding-right": 4 },
  });

  table.push(
    // Title
    [{ content: chalk.bold.blueBright("IP Information"), colSpan: 1 }],

    // Content
    ["IP", chalk.greenBright(ipInfo.ip)],
    ["TimeZone", ipInfo.location.timezone],
    ["Country (Code)", ipInfo.location.country + ` (${ipInfo.location.country_code})`],
    ["Region", ipInfo.location.state],
    ["City", ipInfo.location.city],
    ["ISP Name", ipInfo.company.name],
    ["ISP Domain", ipInfo.company.domain],
    ["Lat", ipInfo.location.latitude],
    ["Long", ipInfo.location.latitude],
    ["Proxy", ipInfo.is_proxy ? "Yes" : "No"],
    ["VPN", ipInfo.is_vpn ? "Yes" : "No"],
    ["Tor", ipInfo.is_tor ? "Yes" : "No"],
    ["Datacenter", ipInfo.is_datacenter ? "Yes" : "No"],
    ["Abuser", ipInfo.is_abuser ? "Yes" : "No"],
  );

  console.log(table.toString());
})();
