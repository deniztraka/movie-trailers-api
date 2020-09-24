# movie-trailers-api
This api lists movie trailers by gathering informations from IMDb and Youtube.

[TOCM]

## Features
- Using Node.js with Express
- Secured with [Okta](https://www.okta.com "Okta") OAuth 2.0
- Using AWS ElastiCache to cache collected data to speed up response time
- Using [helmet](https://www.npmjs.com/package/helmet "helmet") package to enhance api security
- Using [morgan](https://www.npmjs.com/package/morgan "morgan") package as a request logger middleware
- Currently hosted on AWS EC2 instance for demonstration

http://ec2-13-48-6-117.eu-north-1.compute.amazonaws.com:3000