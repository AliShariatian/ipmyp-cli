#!/usr/bin/env node

import { CONSTANTS } from "./constants.js";
import { fetcher, showData, welcome } from "./utils.js";

import { type IpInfo } from "./types.js";

(async () => {
  console.clear();

  welcome();

  const ipInfo = await fetcher<IpInfo>(CONSTANTS.GetIpInfoUrl(), {
    loadingText: "Getting IP Information...",
  });

  showData(ipInfo);
})();
