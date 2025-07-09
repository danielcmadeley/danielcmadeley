#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Feed validation script for Daniel Madeley's website
 * Validates RSS feeds, JSON feeds, and sitemap files
 */

const DIST_DIR = path.join(__dirname, '../dist');
const BASE_URL = 'https://danielcmadeley.vercel.app';

class FeedValidator {
  constructor() {
    this.results = {
      rss: [],
      json: [],
      sitemap: [],
      errors: []
    };
  }

  /**
   * Validate RSS XML feed
   */
  validateRSSFeed(filePath, feedName) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Basic XML validation
      if (!content.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
        this.results.errors.push(`${feedName}: Invalid XML declaration`);
        return false;
      }

      // RSS structure validation
      const requiredElements = [
        '<rss version="2.0">',
        '<channel>',
        '<title>',
        '<description>',
        '<link>',
        '<language>',
        '<lastBuildDate>',
        '<item>',
        '<pubDate>'
      ];

      let valid = true;
      requiredElements.forEach(element => {
        if (!content.includes(element)) {
          this.results.errors.push(`${feedName}: Missing required element ${element}`);
          valid = false;
        }
      });

      // Check for XSL stylesheet
      if (!content.includes('<?xml-stylesheet href="/rss-styles.xsl"')) {
        this.results.errors.push(`${feedName}: Missing XSL stylesheet reference`);
      }

      // Count items
      const itemCount = (content.match(/<item>/g) || []).length;

      this.results.rss.push({
        name: feedName,
        path: filePath,
        valid: valid,
        itemCount: itemCount,
        size: content.length
      });

      return valid;
    } catch (error) {
      this.results.errors.push(`${feedName}: Error reading file - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate JSON feed
   */
  validateJSONFeed(filePath, feedName) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const feed = JSON.parse(content);

      // JSON Feed 1.1 validation
      const requiredFields = [
        'version',
        'title',
        'home_page_url',
        'feed_url',
        'description',
        'items'
      ];

      let valid = true;
      requiredFields.forEach(field => {
        if (!feed[field]) {
          this.results.errors.push(`${feedName}: Missing required field ${field}`);
          valid = false;
        }
      });

      // Validate version
      if (feed.version !== 'https://jsonfeed.org/version/1.1') {
        this.results.errors.push(`${feedName}: Invalid JSON Feed version`);
        valid = false;
      }

      // Validate items
      if (feed.items && Array.isArray(feed.items)) {
        feed.items.forEach((item, index) => {
          const requiredItemFields = ['id', 'url', 'title', 'date_published'];
          requiredItemFields.forEach(field => {
            if (!item[field]) {
              this.results.errors.push(`${feedName}: Item ${index + 1} missing ${field}`);
              valid = false;
            }
          });
        });
      }

      this.results.json.push({
        name: feedName,
        path: filePath,
        valid: valid,
        itemCount: feed.items ? feed.items.length : 0,
        size: content.length
      });

      return valid;
    } catch (error) {
      this.results.errors.push(`${feedName}: Error parsing JSON - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate sitemap XML
   */
  validateSitemap(filePath, sitemapName) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Basic XML validation
      if (!content.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
        this.results.errors.push(`${sitemapName}: Invalid XML declaration`);
        return false;
      }

      let valid = true;
      let urlCount = 0;

      if (sitemapName.includes('index')) {
        // Validate sitemap index
        if (!content.includes('<sitemapindex')) {
          this.results.errors.push(`${sitemapName}: Missing sitemapindex element`);
          valid = false;
        }
        urlCount = (content.match(/<sitemap>/g) || []).length;
      } else {
        // Validate URL set
        if (!content.includes('<urlset')) {
          this.results.errors.push(`${sitemapName}: Missing urlset element`);
          valid = false;
        }
        urlCount = (content.match(/<url>/g) || []).length;

        // Check for required URL elements
        const urls = content.match(/<url>.*?<\/url>/gs) || [];
        urls.forEach((url, index) => {
          if (!url.includes('<loc>')) {
            this.results.errors.push(`${sitemapName}: URL ${index + 1} missing <loc> element`);
            valid = false;
          }
        });
      }

      this.results.sitemap.push({
        name: sitemapName,
        path: filePath,
        valid: valid,
        urlCount: urlCount,
        size: content.length
      });

      return valid;
    } catch (error) {
      this.results.errors.push(`${sitemapName}: Error reading file - ${error.message}`);
      return false;
    }
  }

  /**
   * Run all validations
   */
  async validate() {
    console.log('🔍 Validating RSS feeds, JSON feeds, and sitemaps...\n');

    // Validate main RSS feed
    const mainRSSPath = path.join(DIST_DIR, 'rss.xml');
    if (fs.existsSync(mainRSSPath)) {
      this.validateRSSFeed(mainRSSPath, 'Main RSS Feed');
    }

    // Validate JSON feed
    const jsonFeedPath = path.join(DIST_DIR, 'feed.json');
    if (fs.existsSync(jsonFeedPath)) {
      this.validateJSONFeed(jsonFeedPath, 'JSON Feed');
    }

    // Validate category RSS feeds
    const rssDir = path.join(DIST_DIR, 'rss');
    if (fs.existsSync(rssDir)) {
      const rssFiles = fs.readdirSync(rssDir).filter(file => file.endsWith('.xml'));
      rssFiles.forEach(file => {
        const category = file.replace('.xml', '');
        this.validateRSSFeed(path.join(rssDir, file), `RSS Feed (${category})`);
      });
    }

    // Validate sitemaps
    const sitemapFiles = fs.readdirSync(DIST_DIR).filter(file => file.includes('sitemap'));
    sitemapFiles.forEach(file => {
      this.validateSitemap(path.join(DIST_DIR, file), file);
    });

    // Validate XSL stylesheet exists
    const xslPath = path.join(DIST_DIR, 'rss-styles.xsl');
    if (!fs.existsSync(xslPath)) {
      this.results.errors.push('XSL stylesheet (rss-styles.xsl) not found');
    }

    this.printResults();
  }

  /**
   * Print validation results
   */
  printResults() {
    console.log('📊 Validation Results\n');
    console.log('=' .repeat(50));

    // RSS Feeds
    if (this.results.rss.length > 0) {
      console.log('\n📡 RSS Feeds:');
      this.results.rss.forEach(feed => {
        const status = feed.valid ? '✅' : '❌';
        console.log(`  ${status} ${feed.name}`);
        console.log(`     Items: ${feed.itemCount} | Size: ${(feed.size / 1024).toFixed(2)}KB`);
      });
    }

    // JSON Feeds
    if (this.results.json.length > 0) {
      console.log('\n📄 JSON Feeds:');
      this.results.json.forEach(feed => {
        const status = feed.valid ? '✅' : '❌';
        console.log(`  ${status} ${feed.name}`);
        console.log(`     Items: ${feed.itemCount} | Size: ${(feed.size / 1024).toFixed(2)}KB`);
      });
    }

    // Sitemaps
    if (this.results.sitemap.length > 0) {
      console.log('\n🗺️  Sitemaps:');
      this.results.sitemap.forEach(sitemap => {
        const status = sitemap.valid ? '✅' : '❌';
        console.log(`  ${status} ${sitemap.name}`);
        console.log(`     URLs: ${sitemap.urlCount} | Size: ${(sitemap.size / 1024).toFixed(2)}KB`);
      });
    }

    // Errors
    if (this.results.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.results.errors.forEach(error => {
        console.log(`  • ${error}`);
      });
    }

    // Summary
    const totalFeeds = this.results.rss.length + this.results.json.length;
    const validFeeds = this.results.rss.filter(f => f.valid).length +
                      this.results.json.filter(f => f.valid).length;
    const totalSitemaps = this.results.sitemap.length;
    const validSitemaps = this.results.sitemap.filter(s => s.valid).length;

    console.log('\n' + '=' .repeat(50));
    console.log('📈 Summary:');
    console.log(`  Feeds: ${validFeeds}/${totalFeeds} valid`);
    console.log(`  Sitemaps: ${validSitemaps}/${totalSitemaps} valid`);
    console.log(`  Errors: ${this.results.errors.length}`);

    if (this.results.errors.length === 0) {
      console.log('\n🎉 All feeds and sitemaps are valid!');
    } else {
      console.log('\n⚠️  Some issues found. Please review the errors above.');
      process.exit(1);
    }
  }
}

// Run validation
const validator = new FeedValidator();
validator.validate();
