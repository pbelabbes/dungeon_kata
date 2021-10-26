export function getMyTotemBeast(birthday: Date): string {
  const day = birthday.getDate();
  const month = birthday.getMonth();
  const year = birthday.getFullYear();

  let calcArray = (day + '')
    .split('')
    .concat((month + '').split(''))
    .concat((year + '').split(''));

  while (calcArray.length > 1) {
    const arraySum = calcArray.reduce((acc, cell) => {
      return +cell + acc;
    }, 0);

    calcArray = (arraySum + '').split('');
  }

  switch (+calcArray[0]) {
    case 1:
      return 'Kobolt';
    case 2:
      return 'Cockatrice';
    case 3:
      return 'Harpy';
    case 4:
      return 'Grick';
    case 5:
      return 'Minotaur';
    case 6:
      return 'Girallon';
    case 7:
      return 'Wiverne';
    case 8:
      return 'Hydra';
    case 9:
      return 'Green Dragon';
  }
  return 'You got no totem beast !';
}
