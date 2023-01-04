
export const textFormat = (text: string) => {
  const lines = text
    .replace(/\.\.\./g, '…')
    .split(/\n/g)
    .map(s => s.trim())
    .filter(s => s);
  const ret = [] as { tag?: string; text?: string; lines?: string[] }[];
  for (const line of lines) {
    if (line.slice(0, 2) === '##') {
      const t = line.slice(3).split(/:::/g);
      ret.push({
        tag: 'h2',
        text: line.slice(3),
        lines: t.length > 1 ? t : void 0,
      });
    } else if (line.slice(0, 1) === '#') {
      const t = line.slice(2).split(/:::/g);
      ret.push({
        tag: 'h1',
        text: line.slice(2),
        lines: t.length > 1 ? t : void 0,
      });
    } else if (line.slice(0, 1) === '*' || line.slice(0, 1) === '-') {
      let last = ret[ret.length - 1];
      if (last?.tag !== 'ul') {
        ret.push(
          (last = {
            tag: 'ul',
            lines: [],
          })
        );
      }
      last.lines?.push(line.slice(2));
    } else {
      ret.push({
        text: line,
      });
    }
  }
  return ret;
}
