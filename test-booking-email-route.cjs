const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

const server = spawn(process.execPath, ['server.cjs'], {
  cwd: path.join(__dirname),
  env: { ...process.env, PORT: '3101' },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let output = '';
server.stdout.on('data', (chunk) => {
  output += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  output += chunk.toString();
});

function waitForServer() {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const attempt = () => {
      const req = http.request({ host: '127.0.0.1', port: 3101, path: '/api/health' }, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - started > 10000) {
          reject(new Error(`Server did not start. Output:\n${output}`));
          return;
        }
        setTimeout(attempt, 200);
      });
      req.end();
    };
    attempt();
  });
}

async function main() {
  try {
    await waitForServer();

    const req = http.request({
      host: '127.0.0.1',
      port: 3101,
      path: '/api/send-booking-notification',
      method: 'OPTIONS',
    }, (res) => {
      const status = res.statusCode || 0;
      console.log(`OPTIONS /api/send-booking-notification -> ${status}`);
      server.kill();
      process.exit(status === 200 ? 0 : 1);
    });

    req.on('error', (err) => {
      console.error(err);
      server.kill();
      process.exit(1);
    });
    req.end();
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    server.kill();
    process.exit(1);
  }
}

main();
