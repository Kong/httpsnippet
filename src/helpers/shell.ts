import { format } from 'util';

/**
 * Use 'strong quoting' using single quotes so that we only need to deal with nested single quote characters.
 * see: http://wiki.bash-hackers.org/syntax/quoting#strong_quoting
 */
export const quote = (value: string) => {
  const safe = /^[a-z0-9-_/.@%^=:]+$/i;

  const isShellSafe = safe.test(value);

  if (isShellSafe) {
    return value;
  }

  // if the value is not shell safe, then quote it
  return format("'%s'", value.replace(/'/g, "'\\''"));
};

export const escape = (value: string) => value
  .replace(/\r/g, '\\r')
  .replace(/\n/g, '\\n');
