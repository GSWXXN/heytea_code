# HEYTEA Code Page

Static mobile-first code display page for Cloudflare Pages.

## Deploy with Git Integration

1. Push this repo to GitHub.
2. In Cloudflare Dashboard, open `Workers & Pages`.
3. Select `Create application` -> `Pages` -> `Connect to Git`.
4. Choose the `GSWXXN/heytea_code` repository.
5. Set the production branch to `main`.
6. Leave the build command empty.
7. Set the build output directory to `.`.
8. Deploy.

## Deploy with Wrangler

1. Log in with `npx wrangler login`.
2. Create the Pages project with `npx wrangler pages project create`.
3. Deploy the current folder with `npx wrangler pages deploy . --project-name=heytea-code`.

## Notes

- This project is a plain static site with no backend.
- `wrangler.toml` sets `pages_build_output_dir = "."`, so Cloudflare Pages serves files from the repo root.
