#!/usr/bin/env node

const os = require('os');

function getNetworkIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (localhost) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push({ name, address: iface.address });
      }
    }
  }

  return ips;
}

const ips = getNetworkIPs();

console.log('\n🌐 Network Access URLs:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  Local:    http://localhost:3000');

if (ips.length > 0) {
  ips.forEach(ip => {
    console.log(`  Network:  http://${ip.address}:3000 (${ip.name})`);
  });
} else {
  console.log('  Network:  No network interfaces found');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');