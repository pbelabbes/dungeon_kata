import { getMyTotemBeast } from '../src/main';

describe('Totem Beast', () => {
  it('should say my totem beast is a Kobolt', () => {
    const birthday = new Date('Dec 29, 1995');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Kobolt');
  });

  it('should say my totem beast is a Cockatrice', () => {
    const birthday = new Date('Dec 30, 1995');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Cockatrice');
  });

  it('should say my totem beast is a Harpy', () => {
    const birthday = new Date('Dec 31, 1995');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Harpy');
  });
  it('should say my totem beast is a Grick', () => {
    const birthday = new Date('Jan 1, 1992');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Grick');
  });
  it('should say my totem beast is a Minotaur', () => {
    const birthday = new Date('Jan 1, 1993');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Minotaur');
  });
  it('should say my totem beast is a Girallon', () => {
    const birthday = new Date('Jan 1, 1994');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Girallon');
  });
  it('should say my totem beast is a Wiverne', () => {
    const birthday = new Date('Jan 1, 1995');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Wiverne');
  });
  it('should say my totem beast is a Hydra', () => {
    const birthday = new Date('Jan 1, 1996');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Hydra');
  });
  it('should say my totem beast is a Green Dragon', () => {
    const birthday = new Date('Jan 1, 1997');
    const myTotemBeast = getMyTotemBeast(birthday);
    expect(myTotemBeast).toBe('Green Dragon');
  });
});
