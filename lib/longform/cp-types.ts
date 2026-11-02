// Local profile for one city: used by the city hub and the jobs-by-city page.
export type CityProfile={
  homes:string;   // how households live and what help they usually need
  work:string;    // where people work: sectors, markets, employers
  move:string;    // getting around, commuting
  season:string;  // seasons and timing
  family:string;  // advice for families and employers hiring here
  seeker:string;  // advice for job seekers here
  faq:[string,string];
};
