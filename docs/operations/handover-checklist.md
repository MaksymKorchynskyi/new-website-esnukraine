# Handover checklist

A checklist for handing over maintenance of the website from one volunteer to another. Volunteer terms are short, so plan the handover before the outgoing maintainer leaves, ideally with an overlap of a few weeks.

**Audience:** the outgoing maintainer, the incoming maintainer, and the board member who oversees IT.

## 1. Before the handover (outgoing maintainer)

- [ ] Update [Services and accounts](services-and-accounts.md): plans, owner roles and renewal dates. Fill in every "To confirm" you can answer.
- [ ] Give the successor **administrator** access:
  - [ ] GitHub repository (admin), or transfer it to an organisation;
  - [ ] Vercel team and project;
  - [ ] Sanity project (Administrator role);
  - [ ] Resend, Upstash and PostHog;
  - [ ] domain registrar and DNS;
  - [ ] the technical mailbox `web-master@esnukraine.org`.
- [ ] Move ownership away from **personal accounts** where possible, or add an organisational account as an owner.
- [ ] Share credentials and recovery codes through a **password manager**, never through chat or email.
- [ ] Tell the successor where Sanity backups are stored (see [Back up the Sanity dataset](../guides/maintenance-tasks.md#back-up-the-sanity-dataset)).
- [ ] Review open work: pull requests, branches worth keeping, GitHub issues and ideas.
- [ ] Introduce the successor to the content editors and to the board member responsible for communication.

## 2. Knowledge transfer session (about 90 minutes)

Walk through the website together, ideally with screen sharing:

| Time | Topic | Material |
|---|---|---|
| 15 min | Architecture and repository tour | [Architecture overview](../architecture/overview.md) |
| 15 min | Local setup on the successor's computer | [Getting started](../getting-started.md) |
| 20 min | A small change end to end: branch → pull request → Preview → merge → Production. Show where Instant Rollback is | [CONTRIBUTING.md](../../CONTRIBUTING.md), [Deployment and environments](../guides/deployment-and-environments.md) |
| 15 min | Sanity Studio and the publishing flow, including the webhook delivery log | [Content editing guide](../content-editing/README.md) |
| 15 min | Dashboards: Vercel logs, Sanity usage, Resend, PostHog | [Services and accounts](services-and-accounts.md) |
| 10 min | Recurring tasks and open topics | [Recurring maintenance tasks](../guides/maintenance-tasks.md) |

## 3. After the handover

- [ ] Remove the outgoing maintainer's administrator access, or reduce it, unless they stay involved.
- [ ] Make sure every service still has at least two administrators.
- [ ] [Rotate the secrets](../guides/deployment-and-environments.md#rotate-secrets) the outgoing maintainer knew.
- [ ] Update [Services and accounts](services-and-accounts.md).

## 4. First week of the new maintainer

- [ ] Follow the maintainer reading path in the [documentation home](../README.md#i-maintain-the-website-it-lead-or-webmaster).
- [ ] Run the project locally and run all checks.
- [ ] Practise the workflow with a small documentation pull request.
- [ ] Publish a small content change and confirm that the webhook delivery shows `200`.
- [ ] Find the runtime logs and the Instant Rollback option in Vercel. You do not need to run a rollback.
- [ ] Make a [backup of the Sanity dataset](../guides/maintenance-tasks.md#back-up-the-sanity-dataset).
- [ ] Put the [recurring tasks](../guides/maintenance-tasks.md) into your calendar.
- [ ] Note anything that was unclear, and improve the documentation.

## Related

- [Services and accounts](services-and-accounts.md)
- [Recurring maintenance tasks](../guides/maintenance-tasks.md)
- [Documentation home](../README.md)
