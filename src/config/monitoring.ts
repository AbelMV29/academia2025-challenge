import client from 'prom-client';

export const register = client.register;

export const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total requests',
  labelNames: ['method', 'endpoint', 'status']
});

export const requestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Request duration in seconds',
  labelNames: ['method', 'endpoint'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5] // p50, p95, etc se calculan en Grafana
});
