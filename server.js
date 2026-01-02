// Lightweight server with Express if available, otherwise fallback to Node http
const path = require('path');
const fs = require('fs');
let useExpress = false;
let app, PORT;

try {
  const express = require('express');
  const cors = require('cors');
  require('dotenv').config();
  const viewRoutes = require('./src/routes/viewRoutes');

  app = express();
  PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Serve static files from 'public'
  app.use(express.static(path.join(__dirname, 'public')));

  // Use Routes
  app.use('/', viewRoutes);

  // Add Appwrite-powered ratings API
  const { Client, Databases, ID } = require('appwrite');
  app.post('/api/ratings', async (req, res) => {
    try {
      const {
        company_id,
        branch_id,
        stars,
        comment,
        product_tags,
        location,
        order_id,
        customer_id
      } = req.body || {};

      if (!stars || !company_id) {
        return res.status(400).json({ error: 'Missing required fields: stars, company_id' });
      }

      const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_PROJECT_ID || '68b17582003582da69c8')
        .setKey(process.env.APPWRITE_API_KEY);

      const databases = new Databases(client);
      const ratingId = (Math.random().toString(36).slice(2, 10) + Date.now().toString(36)).slice(0, 20);

      const payload = {
        rating_id: ratingId,
        company_id,
        branch_id: branch_id || '',
        order_id: order_id || null,
        customer_id: customer_id || null,
        stars,
        comment: comment || '',
        created_at: new Date().toISOString(),
        location: location || '',
        product_tags: Array.isArray(product_tags) ? product_tags : []
      };

      const created = await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID || '68b1b7590035346a3be9',
        process.env.APPWRITE_RATINGS_TABLE || 'ratings',
        ID.unique(),
        payload
      );

      return res.status(201).json({ success: true, document: created });
    } catch (err) {
      console.error('Error saving rating:', err);
      const message = process.env.APPWRITE_API_KEY ? 'Failed to save rating' : 'Missing APPWRITE_API_KEY env';
      return res.status(500).json({ error: message });
    }
  });

  // Fallback for 404 -> serve index.html from public
  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  useExpress = true;
} catch (e) {
  // Express not available; use http fallback
  PORT = process.env.PORT || 3000;
}

if (useExpress) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} else {
  // http fallback server
  const http = require('http');
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
  };

  const routeMap = {
    '/': 'index.html',
    '/sign-up': 'signup.html',
    '/sign-in': 'signin.html',
    '/homepage': 'home.html',
    '/profile': 'profile.html',
    '/schedule': 'schedule.html',
    '/menu': 'menu.html',
    '/about': 'about.html',
    '/terms': 'terms.html',
    '/privacy': 'privacy.html',
    '/report': 'report.html',
    '/newsletter': 'newsletter.html',
    '/disclaimer': 'disclaimer.html'
  };

  function serveFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }

  const server = http.createServer((req, res) => {
    try {
      let urlPath = req.url.split('?')[0];

      // Route mapping for pretty paths
      if (routeMap[urlPath]) {
        const filePath = path.join(__dirname, 'public', routeMap[urlPath]);
        return serveFile(res, filePath);
      }

      // Static file serving
      const staticCandidate = path.join(__dirname, 'public', urlPath);
      if (fs.existsSync(staticCandidate) && fs.statSync(staticCandidate).isFile()) {
        return serveFile(res, staticCandidate);
      }

      // If no extension and not a known route, default to index.html
      if (!path.extname(urlPath)) {
        const filePath = path.join(__dirname, 'public', 'index.html');
        return serveFile(res, filePath);
      }

      // Otherwise 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    }
  });

  server.listen(PORT, () => {
    console.log(`Fallback server running on http://localhost:${PORT}`);
  });
}
