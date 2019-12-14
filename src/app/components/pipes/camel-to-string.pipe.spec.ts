import { CamelToStringPipe } from './camel-to-string.pipe';

describe('CamelToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
