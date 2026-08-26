#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Chatbot UI with network access...\n');

// Detect network IP
const detectScript = path.join(__dirname, 'detect-network-ip.js');
const networkIP = execSync(`node "${detectScript}"`, { encoding: 'utf-8' }).trim();

console.log('🌐 Network Configuration:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  Detected IP: ${networkIP}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Create dynamic environment file (Next.js will auto-load .env.development.local in dev mode)
const envDynamicPath = path.join(__dirname, '..', '.env.development.local');
const envContent = `# Auto-generated dynamic environment variables
# This file is created automatically at startup - DO NOT EDIT MANUALLY
# Generated on: ${new Date().toISOString()}
NEXT_PUBLIC_SUPABASE_URL=http://${networkIP}:54321
`;

fs.writeFileSync(envDynamicPath, envContent);
console.log('✅ Created dynamic environment configuration\n');

// Start Supabase
console.log('📦 Starting Supabase...');
try {
  execSync('supabase start', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to start Supabase');
  process.exit(1);
}

// Generate database types
console.log('\n📝 Generating database types...');
try {
  execSync('npm run db-types', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to generate database types');
  process.exit(1);
}

// Display network URLs
console.log('\n🌐 Network Access URLs:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  Local:        http://localhost:3000');
console.log(`  Network:      http://${networkIP}:3000`);
console.log(`  Supabase API: http://${networkIP}:54321`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Start Next.js dev server
console.log('🎯 Starting Next.js development server...\n');
try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to start Next.js');
  process.exit(1);
}