
# Deploying Your React/Vite App to cPanel with Node.js

## Step 1: Build Your Project Locally
Before uploading to cPanel, build your React project:

```bash
npm run build
```

This creates a `dist` folder with all the compiled files.

## Step 2: Upload Project Files to cPanel
1. Go to your cPanel File Manager
2. Navigate to your domain's root folder (usually `public_html` or a subdirectory)
3. Upload your **entire project folder** including:
   - `package.json`
   - `server.js`
   - `dist/` folder (after building)
   - `src/` folder
   - All other project files
   - **DO NOT** upload `node_modules` folder

## Step 3: Setup Node.js App in cPanel
1. Go to cPanel → "Setup Node.js App" or "Node.js Selector"
2. Click "Create Application"
3. Configure the following:
   - **Node.js Version**: Select 16.x, 18.x, or 20.x (latest available)
   - **Application Mode**: Production
   - **Application Root**: Path to your uploaded project folder
   - **Application URL**: Your desired subdomain or path
   - **Application Startup File**: `server.js`
   - **Environment Variables**: Add any needed variables (like for Supabase)

## Step 4: Install Dependencies
1. In the Node.js App interface, look for "Terminal" or "Run NPM Install"
2. Or use the cPanel Terminal and navigate to your project folder:
   ```bash
   cd /home/yourusername/your-project-folder
   npm install --production
   ```

## Step 5: Start Your Application
1. In the Node.js App interface, click "Start App" or "Restart App"
2. Check the logs for any errors
3. Visit your application URL to test

## Environment Variables (if using Supabase)
Add these in the Node.js App environment variables section:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## Troubleshooting Common Issues:

### 1. "Cannot find module" errors
- Make sure you ran `npm install` in the cPanel terminal
- Check that your `package.json` is in the correct location

### 2. App won't start
- Check the Node.js app logs in cPanel
- Ensure `server.js` is specified as the startup file
- Verify Node.js version is 16+ in cPanel settings

### 3. 404 errors on page refresh
- The `server.js` file handles SPA routing automatically
- Make sure all routes redirect to `index.html`

### 4. Static files not loading
- Ensure the `dist` folder is uploaded and in the correct location
- Check file permissions (should be 644 for files, 755 for folders)

## File Structure in cPanel:
```
your-project-folder/
├── server.js (startup file)
├── package.json
├── dist/ (built React app)
│   ├── index.html
│   ├── assets/
│   └── ...
├── src/ (source files)
└── other project files
```

## Important Notes:
- The `server.js` file serves your built React app and handles routing
- Make sure to build your project locally before uploading
- Never upload `node_modules` - install dependencies on the server
- Use the Node.js App interface in cPanel, not regular web hosting
