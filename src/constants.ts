export const CONSTANTS = {
  GetIpInfoUrl: (ip: string = "") => `https://api.ipapi.is/?q=${ip}`,
} as const;
