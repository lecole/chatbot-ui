#!/usr/bin/env node

const os = require('os');

/**
 * Gets the primary network IP address (non-internal, IPv4)
 * Prefers common interface names (en0, eth0, etc.)
 */
function getPrimaryNetworkIP() {
  const interfaces = os.networkInterfaces();

  // Preferred interface names (WiFi/Ethernet on macOS/Linux)
  const preferredNames = ['en0', 'en1', 'eth0', 'eth1', 'wlan0'];

  // First, try preferred interfaces
  for (const name of preferredNames) {
    if (interfaces[name]) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }

  // Fallback: find any non-internal IPv4 address
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  // Ultimate fallback
  return 'localhost';
}

const ip = getPrimaryNetworkIP();
console.log(ip);
