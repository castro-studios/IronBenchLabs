#!/usr/bin/env node
/*
 * IronBench Labs site builder — no dependencies.
 *
 *   node build.js
 *
 * Reads every page in src/pages/, expands includes from src/partials/, and
 * writes the finished page to the repo root (index.html, contact-me.html, ...).
 * The root .html files are what cPanel deploys, so commit them along with src/.
 *
 * Syntax (inside src/pages and src/partials):
 *   <!-- @include footer.html primaryLabel="Get In Touch" primaryHref="contact-me.html" -->
 *       Inserts src/partials/footer.html, indented to match the marker.
 *       Parameters fill {{name}} slots. Nested includes inherit the parent's
 *       parameters, and can override them.
 *   {{name}}
 *       Replaced by the parameter value ("" when not given).
 *   <!-- @if name --> ... <!-- @endif -->
 *       Kept only when parameter "name" is non-empty. Cannot be nested.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PAGES = path.join(ROOT, 'src', 'pages');
const PARTIALS = path.join(ROOT, 'src', 'partials');

const INCLUDE_RE = /^([ \t]*)<!--\s*@include\s+([\w.\-\/]+)((?:\s+[\w\-]+="[^"]*")*)\s*-->[ \t]*$/gm;
const PARAM_RE = /([\w\-]+)="([^"]*)"/g;
const IF_RE = /^[ \t]*<!--\s*@if\s+([\w\-]+)\s*-->[ \t]*\n([\s\S]*?)^[ \t]*<!--\s*@endif\s*-->[ \t]*\n/gm;
const SLOT_RE = /\{\{\s*([\w\-]+)\s*\}\}/g;

function parseParams(str) {
    const params = {};
    let m;
    PARAM_RE.lastIndex = 0;
    while ((m = PARAM_RE.exec(str))) params[m[1]] = m[2];
    return params;
}

function render(text, params, stack) {
    // Conditionals first, so a dropped block's includes are never expanded.
    text = text.replace(IF_RE, (_, name, body) => (params[name] ? body : ''));

    text = text.replace(INCLUDE_RE, (_, indent, file, rawParams) => {
        const full = path.join(PARTIALS, file);
        if (stack.includes(full)) {
            throw new Error('Include cycle: ' + stack.concat(full).map(p => path.basename(p)).join(' -> '));
        }
        if (!fs.existsSync(full)) {
            throw new Error('Missing partial: src/partials/' + file + ' (included from ' + path.basename(stack[stack.length - 1]) + ')');
        }
        const childParams = Object.assign({}, params, parseParams(rawParams));
        const body = render(fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n'), childParams, stack.concat(full));
        return body
            .replace(/\n$/, '')
            .split('\n')
            .map(line => (line ? indent + line : line))
            .join('\n');
    });

    return text.replace(SLOT_RE, (_, name) => (params[name] !== undefined ? params[name] : ''));
}

function build() {
    const pages = fs.readdirSync(PAGES).filter(f => f.endsWith('.html')).sort();
    if (!pages.length) throw new Error('No pages found in src/pages/');

    for (const page of pages) {
        const src = path.join(PAGES, page);
        let html = render(fs.readFileSync(src, 'utf8').replace(/\r\n/g, '\n'), {}, [src]);

        const leftover = html.match(/<!--\s*@(include|if|endif)\b[^>]*-->|\{\{\s*[\w\-]+\s*\}\}/);
        if (leftover) throw new Error(page + ': unexpanded marker ' + leftover[0]);

        const banner = '<!-- GENERATED FILE — do not edit. Edit src/pages/' + page + ' or src/partials/, then run: node build.js -->';
        html = html.replace(/^(<!doctype html>\n)/i, '$1' + banner + '\n');

        const out = path.join(ROOT, page);
        const before = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : null;
        if (before !== html) {
            fs.writeFileSync(out, html);
            console.log('wrote     ' + page);
        } else {
            console.log('unchanged ' + page);
        }
    }
}

try {
    build();
} catch (err) {
    console.error('build failed: ' + err.message);
    process.exit(1);
}
