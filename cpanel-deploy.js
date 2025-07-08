
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing for cPanel deployment...');

// Check if dist folder exists
if (!fs.existsSync('./dist')) {
  console.error('❌ dist folder not found. Please run "npm run build" first.');
  process.exit(1);
}

// Check if server.js exists
if (!fs.existsSync('./server.js')) {
  console.error('❌ server.js not found. This file is required for cPanel deployment.');
  process.exit(1);
}

// Check if package.json has express dependency
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
if (!packageJson.dependencies || !packageJson.dependencies.express) {
  console.error('❌ Express dependency not found in package.json.');
  process.exit(1);
}

console.log('✅ dist folder found');
console.log('✅ server.js found');
console.log('✅ Express dependency found');
console.log('✅ Project is ready for cPanel deployment!');

console.log('\n📋 Next steps:');
console.log('1. Upload your project folder to cPanel (exclude node_modules)');
console.log('2. Create Node.js App in cPanel');
console.log('3. Set server.js as startup file');
console.log('4. Install dependencies with npm install');
console.log('5. Start your application');
