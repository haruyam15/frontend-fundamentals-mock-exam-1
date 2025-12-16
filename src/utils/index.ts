export function formatCurrency(value: string | number): string {
  if (value === '') {
    return '';
  }
  if (typeof value === 'string') {
    const removedComma = removeComma(value);
    if (isNaN(Number(removedComma))) {
      return '';
    }
    return Number(removedComma).toLocaleString('ko-KR');
  }

  if (isNaN(Number(value))) {
    return '-';
  }

  return Number(value).toLocaleString('ko-KR');
}

export function removeComma(value: string): string {
  return value.replace(/,/g, '');
}
