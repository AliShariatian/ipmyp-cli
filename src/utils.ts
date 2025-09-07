import ora from "ora";
import chalk from "chalk";
import figlet from "figlet";
import CliTable3 from "cli-table3";
import { cristal } from "gradient-string";

import type { IpInfo } from "./types.js";

export const welcome = () => {
  console.log("");

  console.log(
    cristal.multiline(
      figlet.textSync("IP MYP", {
        font: "ANSI Shadow",
      }),
    ),
  );
};

export const showData = (ipInfo: IpInfo) => {
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
    [chalk.greenBright("IP"), ipInfo.ip],
    [chalk.greenBright("TimeZone"), ipInfo.location.timezone],
    [
      chalk.greenBright("Country (Code)"),
      ipInfo.location.country + ` (${ipInfo.location.country_code})`,
    ],
    [chalk.greenBright("Region"), ipInfo.location.state],
    [chalk.greenBright("City"), ipInfo.location.city],
    [chalk.greenBright("ISP Name"), ipInfo.company.name],
    [chalk.greenBright("ISP Domain"), ipInfo.company.domain],
    [chalk.greenBright("Lat"), ipInfo.location.latitude],
    [chalk.greenBright("Long"), ipInfo.location.latitude],
    [chalk.greenBright("Proxy"), ipInfo.is_proxy ? "Yes" : "No"],
    [chalk.greenBright("VPN"), ipInfo.is_vpn ? "Yes" : "No"],
    [chalk.greenBright("Tor"), ipInfo.is_tor ? "Yes" : "No"],
    [chalk.greenBright("Datacenter"), ipInfo.is_datacenter ? "Yes" : "No"],
    [chalk.greenBright("Abuser"), ipInfo.is_abuser ? "Yes" : "No"],
  );

  console.log(table.toString());
};

export const fetcher = async <T>(
  url: string,
  { loadingText }: { loadingText?: string } = {},
): Promise<T> => {
  const spinner = ora({ text: loadingText }).start();

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Provider Error!");

    return (await response.json()) as T;
  } catch (err) {
    spinner.fail(err instanceof Error ? err.message : String(err));
    process.exit(1);
  } finally {
    spinner.stop();
  }
};
