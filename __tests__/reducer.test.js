const reducer = require('../src/helpers/reducer');

describe('Reducer', () => {
  it('should convert array object pair to key-value object', () => {
    const query = [
      { name: 'key', value: 'value' },
      { name: 'foo', value: 'bar' },
    ];

    const obj = query.reduce(reducer, {});

    expect(typeof obj).toBe('object');
    expect(obj).toStrictEqual({ key: 'value', foo: 'bar' });
  });

  it('should convert multi-dimensional arrays to key=[array] object', () => {
    const query = [
      { name: 'key', value: 'value' },
      { name: 'foo', value: 'bar1' },
      { name: 'foo', value: 'bar2' },
      { name: 'foo', value: 'bar3' },
    ];

    const obj = query.reduce(reducer, {});

    expect(typeof obj).toBe('object');
    expect(obj).toStrictEqual({ key: 'value', foo: ['bar1', 'bar2', 'bar3'] });
  });
});
