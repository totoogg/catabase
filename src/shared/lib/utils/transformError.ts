export function transformError(status: number) {
  if (status > 499) {
    return 'Server error';
  }

  if (status > 399) {
    return 'Invalid request';
  }

  return 'Network error. Could not send request';
}
