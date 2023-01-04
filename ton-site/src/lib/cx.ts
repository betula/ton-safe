
export const cx = (...classes: (string | undefined | null)[]) => {
  return classes
    .map(cls => (cls || '').trim())
    .filter(cls => cls)
    .join(' ');
}
