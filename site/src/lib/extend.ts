
export const extend = <T extends {}, U>(target: T, source: U): T & U => (
  Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(source)
  ) as any
);
