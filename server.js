const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// Serve semua file di folder app (HTML, lib, dll)
app.use(express.static(path.join(__dirname)));

// Route utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fungsi untuk mendapatkan IP lokal (IPv4, bukan 127.0.0.1)
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip IPv6 dan loopback
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

// Jalankan server
app.listen(PORT, '0.0.0.0', () => {
  const localIPs = getLocalIP();

  console.log('=====================================');
  console.log(' Dashboard Ma\'had Aly BERHASIL DIJALANKAN ');
  console.log('=====================================');
  console.log(`Local (di komputer ini): http://localhost:${PORT}`);
  
  if (localIPs.length > 0) {
    console.log('\nAkses dari HP/Laptop lain di jaringan yang sama:');
    localIPs.forEach(ip => {
      console.log(`   http://${ip}:${PORT}`);
    });
  } else {
    console.log('\nTidak dapat mendeteksi IP lokal. Coba cek koneksi WiFi/LAN.');
  }

  console.log('\nTekan Ctrl+C untuk menghentikan server');
  console.log('=====================================\n');

  // Otomatis buka browser di localhost
  const startCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  require('child_process').exec(`${startCommand} http://localhost:${PORT}`);
});