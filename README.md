# IronBench Labs — Website

Static marketing site for IronBench Labs (parent studio behind **BenchBoard**).
Hosted on Namecheap/cPanel, deployed from this GitHub repo.

---

## ⚠️ Deploying changes — DON'T FORGET THE LAST STEP

Pushing to GitHub does **NOT** publish the site. Pushing only updates the repo.
After every `git push origin master`, you must finish the deploy in cPanel:

1. Log into **cPanel → Git™ Version Control → IronBenchLabs → Pull or Deploy** tab
2. Click **Update from Remote**  (pulls the latest commit into `/home/ironogis/repositories/IronBenchLabs`)
3. Click **Deploy HEAD Commit**  (runs `.cpanel.yml`, copies files into `public_html`)

Confirm the **Last Deployed SHA** matches your latest commit, then hard-refresh
the live site (Ctrl+F5) to bust the cache.

> How it works: `.cpanel.yml` copies `index.html`, `contact-me.html`, `privacy.html`,
> `terms.html`, `sms-policy.html`, `.htaccess`, and the `assets/` folder into
> `public_html`. It only overwrites those items and never deletes anything else in
> `public_html`. **If you add a new top-level `.html` page, you must add a
> `/bin/cp` line for it in `.cpanel.yml` or it will never deploy.**

---

## Contact form

The form on **`contact-me.html`** is submitted to a third-party form processor
(**Web3Forms** — `https://api.web3forms.com/submit`). The submission is what emails
the contact request.

- The **account/access key is hardcoded in `contact-me.html`** (the hidden
  `access_key` input near the top of the `<form>`). If contact emails stop
  arriving, check that key first — it ties the form to the receiving email account.
- The key is tied to a free Web3Forms account; regenerate/replace it at
  https://web3forms.com if needed.

---

## Repo notes

- Branch: `master` (deploy branch)
- Editor state (`.vs/`, `.claude/`) is gitignored — don't commit it.
- `.gitattributes` normalizes line endings (LF) so cPanel deploys stay clean.
