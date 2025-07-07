
# Deploying Your React App to cPanel

## Step 1: Build Your Project
Before uploading to cPanel, you need to build your React project:

```bash
npm run build
```

This creates a `dist` folder with all the compiled files.

## Step 2: Upload to cPanel
1. Go to your cPanel File Manager
2. Navigate to the `public_html` folder (or your domain's root folder)
3. Upload ALL contents from the `dist` folder (not the folder itself)
4. Make sure the `.htaccess` file is also uploaded

## Step 3: File Structure in cPanel
Your cPanel public_html should look like this:
```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other asset files]
└── [other files from dist folder]
```

## Step 4: Environment Variables
If you're using environment variables (like for Supabase), make sure to:
1. Create a `.env.production` file in your project root before building
2. Add your production environment variables there
3. Rebuild the project

## Important Notes:
- Never upload the source code (src folder, node_modules, etc.) to cPanel
- Only upload the built files from the `dist` folder
- The `.htaccess` file is crucial for React Router to work properly
- Make sure your domain points to the folder where you uploaded the files

## Troubleshooting:
- If you get 404 errors on page refresh, check if `.htaccess` is uploaded
- If CSS/JS files don't load, check the file paths in index.html
- If you see "Cannot GET /" error, make sure index.html is in the root directory
