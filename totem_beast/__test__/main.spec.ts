import { getMyTotemBeast } from '../src/main';

describe('Totem Beast', () => {
  it('should say my totem beast is a Kobolt', () => {
    const birthdate = new Date('27/04/1963');
    const myTotemBeast = getMyTotemBeast(birthdate);
    expect(myTotemBeast).toBe('Kobolt');
  });
});
