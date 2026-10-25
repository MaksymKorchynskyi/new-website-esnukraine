# Recurring maintenance tasks

Tasks that come back regularly in the life of the website, many of them tied to ESN's organisational calendar. Each needs a mix of Studio work (editors) and code changes (developers).

**Audience:** the webmaster or IT lead who plans the work, and developers who carry it out. Paths are relative to `esn-ukraine-web/`.

| Task | When | Who |
|---|---|---|
| [Annual board changeover](#annual-board-changeover) | At the start of each board term | Editor and developer |
| [Add a new ESN section](#add-a-new-esn-section) | When a section joins | Editor, developer, designer for the map |
| [Update the copyright year](#update-the-copyright-year) | Every January | Developer |
| [Back up the Sanity dataset](#back-up-the-sanity-dataset) | Quarterly and before major changes | Maintainer |
| [Update dependencies](#update-dependencies) | Monthly for minor updates; plan major upgrades | Developer |
| [Review usage and plans](#review-usage-and-plans) | Quarterly | Maintainer |
| [Review access](#review-access) | At every team change | Maintainer |
| [Review the legal pages](#review-the-legal-pages) | Yearly, and whenever data processing changes | Maintainer with the person responsible for data protection |
| [Content housekeeping](#content-housekeeping) | Monthly | Editors |
| [Clean up branches](#clean-up-branches) | After merging | Developer |

## Annual board changeover

When a new National Board starts its term:

1. **Archive the outgoing board.** In the Studio, open **Колишні борди (Former Boards)** and create a document:
   - **Назва**, for example `Board 2025/26`;
   - **Порядковий номер**: the start year, for example `2025`. Higher numbers are listed first;
   - **Члени борду**: name, position and photo of each member. You can select existing photos from the media library instead of uploading them again.
2. **Update the current board.** In **Члени Борду (Board Members)**, edit, add or delete documents. Set the category (Board, Board Support, or Audit Board & Advisory Council) and the order.
3. **Update the year in the code** in a pull request:
   - the `GROUPS` titles in `components/sections/BoardSection.client.tsx` (for example "The Board 2025-26");
   - the category list titles in `sanity/schemaTypes/boardMember.ts`.
4. **Check the built-in placeholder profiles** in `BoardSection.client.tsx` (`FALLBACK_BOARD_MEMBERS`). They are shown only when no board members exist in Sanity, but they contain names of a specific board.
5. **Hand over access** for outgoing volunteers. See the [Handover checklist](../operations/handover-checklist.md).

## Add a new ESN section

1. **Studio:** in **Секції ESN (Sections)**, create a document with name, city, logo, a short summary, the Instagram link and the order. Publish it. The card appears on `/our-sections`.
2. **Map:** the map on `/our-sections` is a static image, `public/ESN Ukraine section map.webp` (1536 × 1024 px, WebP). Have it updated with the new city and replace the file under the same name. If the dimensions change, update `width` and `height` in `components/ui/UkraineMap.tsx`.

   > [!NOTE]
   > **To confirm:** where the editable source file of the map is stored, and who can change it.

3. **Texts in code:**
   - the homepage intro lists the cities ("…sections in Kyiv, Lviv, Chernivtsi, and Odesa.") in `app/(website)/page.tsx`;
   - the "Local Sections" statistic on the About Us page is in `app/(website)/about-us/page.tsx`.
4. **Old URLs:** pages of sections on the previous website (`/esn-<name>`) already redirect to `/our-sections` through a wildcard rule. No change is needed.
5. Deploy, then check `/our-sections` and the homepage.

## Update the copyright year

The footer contains a hard-coded year: `© 2026 Erasmus Student Network Ukraine.` in `components/layout/Footer.tsx`. Update it every January. Alternatively, replace it with `new Date().getFullYear()`.

## Back up the Sanity dataset

Sanity keeps a history of each document, but a regular export protects against accidental deletions and account problems. You need a Sanity account with access to the project.

```bash
cd esn-ukraine-web
set -a; source .env.local; set +a        # makes the project ID and dataset available to the CLI (bash/zsh)
npx sanity login
mkdir -p ~/esn-backups
npx sanity dataset export "$NEXT_PUBLIC_SANITY_DATASET" ~/esn-backups/esn-ukraine-$(date +%F).tar.gz
```

- The export contains all documents, including drafts, and all images and files. Store it **outside the repository** in a private location, because it contains personal data such as board member details.
- To test a restore, import the export into a **new** dataset rather than the production dataset: `npx sanity dataset import <file> <new-dataset>`.

> [!NOTE]
> **To confirm:** where backups are stored and who has access to them.

## Update dependencies

1. Check for updates and known vulnerabilities in `esn-ukraine-web/`:

   ```bash
   npm outdated
   npm audit
   ```

2. **Patch and minor updates:** update in a branch, run `npm run lint`, `npx tsc --noEmit` and `npm run build`, open a pull request, and check the Preview deployment. Include `/studio` in the check.
3. **Major updates** (Next.js, React, Sanity, `next-sanity`, Tailwind CSS, ESLint): read the official upgrade guide, upgrade one major package per pull request, and test more thoroughly.
4. Keep these pairs on matching versions:
   - `next` with `eslint-config-next`;
   - `sanity` with `@sanity/vision`;
   - `next-sanity` with the supported `sanity` range.
5. Keep the Node.js version in Vercel within the supported range (20.19+ or 22.12+).
6. Some installed packages are not imported anywhere (see [Configuration](../reference/configuration.md#dependencies)). When you touch `package.json`, consider removing them.

## Review usage and plans

Check the usage pages of each service and compare them with the plan limits:

| Service | What to watch |
|---|---|
| Sanity | Documents, assets (storage), bandwidth, API requests |
| Vercel | Bandwidth, image optimisation, function invocations, build minutes |
| Resend | Number of contacts in the audience |
| Upstash | Daily commands |
| PostHog | Events per month |

Record plans, limits and renewal dates in [Services and accounts](../operations/services-and-accounts.md).

## Review access

At every board change, and whenever a volunteer leaves:

1. List who has access to GitHub, Vercel, Sanity, Resend, Upstash, PostHog, and the domain and DNS.
2. Remove people who no longer need access.
3. Make sure every service has **at least two** administrators from the current team.
4. Rotate secrets that departing people knew (see [Rotate secrets](deployment-and-environments.md#rotate-secrets)).

## Review the legal pages

Review the Privacy Policy and Cookie Policy at least once a year, and whenever you add or change analytics, forms, cookies or external services. See [Update the Privacy Policy or Cookie Policy](common-tasks.md#update-the-privacy-policy-or-cookie-policy).

## Content housekeeping

A checklist for editors:

- **Spotlight:** keep the homepage hero current, with at least one item.
- **Registration links:** remove the registration link from events that are over. The registration box is shown whenever a link is set, regardless of the date.
- **Placeholder pages:** Projects, Blog, Buddy System, Housing and Survival Guide show "under construction" or "coming soon" messages. They are linked from the menu and listed in the sitemap. Decide whether to fill them with content or hide them.

## Clean up branches

Delete branches on GitHub after their pull request is merged or the experiment is abandoned. A short branch list makes it easier to see what is in progress.

## Related

- [Deployment and environments](deployment-and-environments.md)
- [Handover checklist](../operations/handover-checklist.md)
- [Content editing guide](../content-editing/README.md)
