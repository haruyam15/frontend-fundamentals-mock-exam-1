export function formatCurrency(value: number | string): string {
  const num = Number(value);

  if (isNaN(num)) {
    return '0';
  }

  return num.toLocaleString('ko-KR');
}
