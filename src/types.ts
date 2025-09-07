export interface IpInfo {
  ip: string;
  rir: string;
  is_bogon: boolean;
  is_mobile: boolean;
  is_satellite: boolean;
  is_crawler: boolean;
  is_datacenter: boolean;
  is_tor: boolean;
  is_proxy: boolean;
  is_vpn: boolean;
  is_abuser: boolean;
  company: Company;
  abuse: Abuse;
  asn: Asn;
  location: Location;
  elapsed_ms: number;
}

interface Company {
  name: string;
  abuser_score: string;
  domain: string;
  type: string;
  network: string;
  whois: string;
}

interface Abuse {
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface Asn {
  asn: number;
  abuser_score: string;
  route: string;
  descr: string;
  country: string;
  active: boolean;
  org: string;
  domain: string;
  abuse: string;
  type: string;
  created: string;
  updated: string;
  rir: string;
  whois: string;
}

interface Location {
  is_eu_member: boolean;
  calling_code: string;
  currency_code: string;
  continent: string;
  country: string;
  country_code: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  zip: string;
  timezone: string;
  local_time: string;
  local_time_unix: number;
  is_dst: boolean;
}
