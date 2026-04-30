export function formatINR(n) {
  if (n == null || isNaN(n)) return '₹0';
  if (Math.abs(n) >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (Math.abs(n) >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

export function formatPercent(n, decimals = 1) {
  if (n == null || isNaN(n)) return '0.0%';
  return `${n.toFixed(decimals)}%`;
}
