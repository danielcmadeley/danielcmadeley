#!/usr/bin/env bun

const fs = require("fs");
const path = require("path");

/**
 * Cache-busting script for Pagefind files
 * Adds timestamp query parameters to Pagefind URLs to prevent CDN caching issues
 */

const PAGEFIND_DIR = path.join(__dirname, "../dist/pagefind");
const TIMESTAMP = Date.now();

console.log("🔄 Starting Pagefind cache-busting...");

function updatePagefindJS() {
  const pagefindJSPath = path.join(PAGEFIND_DIR, "pagefind.js");

  if (!fs.existsSync(pagefindJSPath)) {
    console.warn("⚠️  pagefind.js not found, skipping cache-busting");
    return;
  }

  let content = fs.readFileSync(pagefindJSPath, "utf8");

  // Add timestamp to pagefind-entry.json requests
  content = content.replace(
    /pagefind-entry\.json/g,
    `pagefind-entry.json?v=${TIMESTAMP}`,
  );

  // Add timestamp to other pagefind file requests
  content = content.replace(
    /(\w+\.pf_(?:meta|index|filter|fragment))/g,
    `$1?v=${TIMESTAMP}`,
  );

  // Add timestamp to WASM file requests
  content = content.replace(/(wasm\.\w+\.pagefind)/g, `$1?v=${TIMESTAMP}`);

  fs.writeFileSync(pagefindJSPath, content);
  console.log("✅ Updated pagefind.js with cache-busting parameters");
}

function updatePagefindUI() {
  const pagefindUIPath = path.join(PAGEFIND_DIR, "pagefind-ui.js");

  if (!fs.existsSync(pagefindUIPath)) {
    console.log("ℹ️  pagefind-ui.js not found, skipping");
    return;
  }

  let content = fs.readFileSync(pagefindUIPath, "utf8");

  // Add timestamp to pagefind-entry.json requests in UI
  content = content.replace(
    /pagefind-entry\.json/g,
    `pagefind-entry.json?v=${TIMESTAMP}`,
  );

  fs.writeFileSync(pagefindUIPath, content);
  console.log("✅ Updated pagefind-ui.js with cache-busting parameters");
}

function createCacheBustManifest() {
  const manifestPath = path.join(PAGEFIND_DIR, "cache-manifest.json");
  const manifest = {
    timestamp: TIMESTAMP,
    version: new Date().toISOString(),
    files: [],
  };

  // List all pagefind files for reference
  if (fs.existsSync(PAGEFIND_DIR)) {
    const files = fs.readdirSync(PAGEFIND_DIR, { recursive: true });
    manifest.files = files.filter(
      (file) =>
        typeof file === "string" &&
        (file.endsWith(".pf_meta") ||
          file.endsWith(".pf_index") ||
          file.endsWith(".pf_filter") ||
          file.endsWith(".pf_fragment") ||
          file.endsWith(".pagefind")),
    );
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Created cache manifest with timestamp: ${TIMESTAMP}`);
}

// Main execution
try {
  if (!fs.existsSync(PAGEFIND_DIR)) {
    console.error(
      "❌ Pagefind directory not found. Make sure pagefind has run first.",
    );
    process.exit(1);
  }

  updatePagefindJS();
  updatePagefindUI();
  createCacheBustManifest();

  console.log(`🎉 Cache-busting completed successfully!`);
  console.log(`📝 Cache version: ${TIMESTAMP}`);
  console.log(`🕒 Generated at: ${new Date().toISOString()}`);
} catch (error) {
  console.error("❌ Error during cache-busting:", error.message);
  process.exit(1);
}
