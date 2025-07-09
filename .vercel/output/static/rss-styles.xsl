<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          .description {
            font-size: 1.1em;
            color: #7f8c8d;
            margin-bottom: 30px;
          }
          .info-box {
            background: #ecf0f1;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
          }
          .info-box h3 {
            margin-top: 0;
            color: #2c3e50;
          }
          .item {
            border-bottom: 1px solid #ecf0f1;
            padding: 20px 0;
            margin-bottom: 20px;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item h2 {
            margin: 0 0 10px 0;
            color: #2c3e50;
          }
          .item h2 a {
            color: #3498db;
            text-decoration: none;
          }
          .item h2 a:hover {
            text-decoration: underline;
          }
          .item-meta {
            font-size: 0.9em;
            color: #7f8c8d;
            margin-bottom: 10px;
          }
          .item-description {
            color: #555;
            line-height: 1.5;
          }
          .categories {
            margin-top: 10px;
          }
          .category {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            margin-right: 5px;
            margin-bottom: 5px;
          }
          .rss-link {
            display: inline-block;
            background: #e67e22;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
          }
          .rss-link:hover {
            background: #d35400;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📡 <xsl:value-of select="/rss/channel/title"/></h1>

          <div class="description">
            <xsl:value-of select="/rss/channel/description"/>
          </div>

          <div class="info-box">
            <h3>📖 What is this?</h3>
            <p>This is an RSS feed. RSS feeds allow you to stay up to date with websites you care about in a simple, standardized way.</p>
            <p>You can use RSS readers like <a href="https://feedly.com">Feedly</a>, <a href="https://www.inoreader.com">Inoreader</a>, or built-in browser features to subscribe to this feed.</p>
            <p><strong>Feed URL:</strong> <code><xsl:value-of select="/rss/channel/link"/>rss.xml</code></p>
            <a href="{/rss/channel/link}rss.xml" class="rss-link">🔗 Subscribe to RSS Feed</a>
          </div>

          <h2>📝 Recent Posts</h2>

          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2>
                <a href="{link}" target="_blank">
                  <xsl:value-of select="title"/>
                </a>
              </h2>

              <div class="item-meta">
                <span>📅 <xsl:value-of select="substring(pubDate, 1, 16)"/></span>
                <xsl:if test="author">
                  <span> • ✍️ <xsl:value-of select="author"/></span>
                </xsl:if>
              </div>

              <div class="item-description">
                <xsl:value-of select="description"/>
              </div>

              <xsl:if test="category">
                <div class="categories">
                  <xsl:for-each select="category">
                    <span class="category">
                      <xsl:value-of select="."/>
                    </span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>

          <div class="info-box">
            <h3>🔗 Links</h3>
            <p>
              <a href="{/rss/channel/link}">🏠 Visit Website</a> •
              <a href="{/rss/channel/link}blog/">📚 View All Posts</a> •
              <a href="{/rss/channel/link}rss.xml">📡 Raw RSS Feed</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
