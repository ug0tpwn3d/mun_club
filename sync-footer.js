const fs = require('fs');
const path = require('path');

const footerTemplate = fs.readFileSync(path.join(__dirname, 'components', 'footer.html'), 'utf8').trim();
const footerRegex = /(?:[ \t]*<!--\s*Site Footer(?:\s*\(.*?\))?\s*-->\s*)*<footer class="site-footer">[\s\S]*?<\/footer>/;

const IGNORE_DIRS = new Set(['.git', '.agent', '.gemini', 'node_modules', 'components']);

let updatedCount = 0;

function getDepth(filePath) {
    const rel = path.relative(__dirname, filePath).replace(/\\/g, '/');
    const parts = rel.split('/');
    return parts.length - 1;
}

function getPrefix(depth) {
    if (depth === 0) return '';
    if (depth === 1) return '../';
    if (depth === 2) return '../../';
    throw new Error('Unexpected depth ' + depth);
}

function getFooterForFile(filePath) {
    const depth = getDepth(filePath);
    const prefix = getPrefix(depth);
    const isIndex = path.basename(filePath) === 'index.html' && depth === 0;
    const contactLink = isIndex ? '#communicate' : `${prefix}index.html#communicate`;

    return footerTemplate
        .replace(/{{ROOT}}/g, prefix)
        .replace(/{{CONTACT_LINK}}/g, contactLink);
}

function syncDir(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory()) {
            if (!IGNORE_DIRS.has(entry.name)) {
                syncDir(path.join(currentDir, entry.name));
            }
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            const filePath = path.join(currentDir, entry.name);
            const content = fs.readFileSync(filePath, 'utf8');

            if (footerRegex.test(content)) {
                const adaptedFooter = getFooterForFile(filePath);
                const updated = content.replace(footerRegex, adaptedFooter);
                if (updated !== content) {
                    fs.writeFileSync(filePath, updated, 'utf8');
                    const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
                    console.log(`✓ Synced: ${relPath}`);
                    updatedCount++;
                }
            }
        }
    }
}

syncDir(__dirname);
console.log(`\nDone! Successfully synced footer across ${updatedCount} HTML pages.`);
