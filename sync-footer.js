const fs = require('fs');
const path = require('path');

const footerTemplate = fs.readFileSync(path.join(__dirname, 'components', 'footer.html'), 'utf8').trim();
const footerRegex = /(?:[ \t]*<!--\s*Site Footer(?:\s*\(.*?\))?\s*-->\s*)*<footer class="site-footer">[\s\S]*?<\/footer>/;

const IGNORE_DIRS = new Set(['.git', '.agent', '.gemini', 'node_modules', 'components']);

let updatedCount = 0;

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
                const updated = content.replace(footerRegex, footerTemplate);
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
