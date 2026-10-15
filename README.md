# Nguyen Trong Phat — Portfolio & Technical Writing

A four-page personal site with an owner-only publishing studio. The public-facing sections are About / CV, Projects, Technical Writing, and Contact. English is the default language; the EN / VI control switches the interface and any translated posts.

Projects and writing start empty. The owner can add posts through `/admin`, with a draft/published state, an optional Vietnamese translation, tags, and up to five images per post. Content is stored in Cloudflare D1; images are stored in R2. The site uses the Sites platform's ChatGPT sign-in. The first editor claim should happen while the Site is owner-private; thereafter every write checks the claimed user ID on the server.

## Run locally

Requires Node.js 22.13+.

```bash
npm ci
npm run build
```

Apply the generated migration to the local D1 database once:

```bash
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_absurd_kronos.sql
```

Then start the development server:

```bash
npm run dev
```

For local editor access, visit `/signin-with-chatgpt?return_to=/admin`. The portable preview provides a mock signed-in user. Claim the editor from `/admin`, then create a draft or publish a post.

## Content model

- `project` and `blog` posts share the same editor and have separate public routes.
- English title, summary, and body are required. Vietnamese fields are optional and fall back to English.
- Drafts stay out of public feeds and detail routes.
- Public readers cannot create, update, or delete posts.

The hosted deployment uses the existing Site ID in `.openai/hosting.json`; `DB` and `BUCKET` are provisioned by Sites. There are no API keys in this repository.

## Links

- [Site preview](https://nguyen-trong-phat-portfolio.sandy-tang-4588.chatgpt.site) — currently owner-private
- [GitHub profile](https://github.com/phatnguyen196-solverboiz)
- [LinkedIn](https://www.linkedin.com/in/tr%E1%BB%8Dng-ph%C3%A1t-nguy%E1%BB%85n-6714412bb/)
- Email: phatnguyen1962005@gmail.com
