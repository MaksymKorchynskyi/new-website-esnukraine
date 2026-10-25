# Security policy

The ESN Ukraine website is maintained by volunteers. We take the security of our visitors, subscribers and editors seriously and appreciate responsible disclosure.

## Supported versions

Only the current production website at <https://esnukraine.org>, built from the `main` branch, is supported. Older commits, other branches and Preview deployments receive no security fixes.

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues, pull requests or discussions.**

Email **<web-master@esnukraine.org>** with the subject line `Security: <short summary>` and include:

- a description of the vulnerability and its potential impact;
- the affected URL, API endpoint or file in this repository;
- step-by-step instructions to reproduce it, or a proof of concept;
- any suggestions for a fix, if you have them;
- how we can contact you for follow-up questions.

## What to expect

- We aim to acknowledge your report within 7 days.
- We will investigate and keep you informed about our progress. Fixes may take longer than in a commercial project because the team consists of volunteers.
- Once the issue is resolved, we are happy to credit you if you wish.

## Scope

**In scope:**

- the website at `esnukraine.org`, including its API routes under `/api/`;
- the source code in this repository.

**Out of scope:**

- vulnerabilities in third-party services used by the website, such as Sanity, Vercel, Resend, Upstash and PostHog. Please report those to the vendor;
- Sanity Studio authentication, which Sanity provides;
- denial-of-service and volumetric attacks;
- social engineering of ESN volunteers or partners.

## Good faith

When you research a vulnerability, please:

- only access, modify or delete data that belongs to you;
- avoid degrading the service for other visitors;
- give us reasonable time to fix the issue before you disclose it publicly.
