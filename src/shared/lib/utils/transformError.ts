export function transformError(status: string) {
  const statusNumber = Number(status);

  if (statusNumber > 499) {
    return 'Server error';
  }

  if (statusNumber > 399) {
    return 'Invalid request';
  }

  return 'Network error. Could not send request';
}
