# GitHub Pages and Cloudflare runbook

The production site uses GitHub Pages as its origin and Cloudflare as its public edge. The canonical hostname is `pbcatx.org`; `www.pbcatx.org` must redirect to it.

## Required steady state

- `https://pbcatx.org/` returns `200` through Cloudflare.
- `https://www.pbcatx.org/anything?query=1` returns a Cloudflare edge redirect to `https://pbcatx.org/anything?query=1`.
- Every valid application route returns `200` after redirects.
- Unknown routes return `404` and contain `noindex` metadata.
- GitHub Pages reports the custom domain as verified and HTTPS enforcement as enabled when GitHub manages a valid origin certificate.

## Immediate `www` redirect

Create a Cloudflare Redirect Rule that runs before an origin request:

- Match: hostname equals `www.pbcatx.org`
- Target expression: `concat("https://pbcatx.org", http.request.uri.path)`
- Preserve query string: enabled
- Status: `301`

This rule is required even when the `www` DNS record is proxied. It also prevents Cloudflare from contacting GitHub with `www.pbcatx.org` as the origin name, which otherwise fails strict certificate validation.

## Provision or renew the GitHub origin certificate

Use a short maintenance window because DNS-only traffic can reach GitHub before its certificate is ready.

1. In Cloudflare DNS, make the records DNS-only temporarily.
2. Point the apex directly to the four current GitHub Pages IPv4 addresses documented by GitHub, or use Cloudflare CNAME flattening to `providencebaptist.github.io`.
3. Point `www` directly to `providencebaptist.github.io` with a CNAME. Remove conflicting records.
4. Keep `pbcatx.org` in the repository's **Settings > Pages > Custom domain** field. If the DNS check remains stuck after propagation, remove and save the domain, then add and save it again once.
5. Wait for the DNS check and certificate provisioning to complete, then enable **Enforce HTTPS**.
6. Verify both hostnames directly before restoring the Cloudflare proxy.
7. Re-enable the Cloudflare proxy for both hostnames, select **Full (strict)** SSL/TLS mode, keep **Always Use HTTPS** enabled, and keep the `www` redirect rule above.

Do not switch the entire zone to Flexible SSL as a permanent workaround. If a short zero-downtime workaround is required while GitHub provisions its certificate, use a narrowly scoped Cloudflare configuration for the affected hostname and remove it afterward.

## Verification

```sh
curl -I https://pbcatx.org/
curl -IL https://www.pbcatx.org/about
curl -IL https://pbcatx.org/about
curl -IL -A 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' https://pbcatx.org/about
gh api repos/providencebaptist/providencebaptist.github.io/pages
```

Expected results:

- Apex homepage: `200`
- `www`: `301` to the same path and query on the apex, followed by `200`
- Valid application routes: final status `200`
- GitHub Pages API: `https_enforced` is `true` after certificate provisioning

After deployment, purge Cloudflare's cache and use Meta's Sharing Debugger to request a fresh scrape of the affected URLs.
