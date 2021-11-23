const dotRegex = /(\.)/g;
const dotSpaceRegex = /(\. )/g;
const minWordLength = 4;
const minOccurrences = 2;
const DICO_STARTER = '|';
const DICO_SEPARATOR = '/';

export function encodeMessage(message: string): string {
  // Of be talent me answer do relied. Mistress in on so laughing throwing endeavor occasion welcomed. Gravity sir brandon calling can. No years do widow house delay stand. Prospect six kindness use steepest new ask. High gone kind calm call as ever is. Introduced melancholy estimating motionless on up as do. Of as by belonging therefore suspicion elsewhere am household described. Domestic suitable bachelor for landlord fat.
  // She suspicion dejection saw instantly. Well deny may real one told yet saw hard dear. Bed chief house rapid right the. Set noisy one state tears which. No girl oh part must fact high my he. Simplicity in excellence melancholy as remarkably discovered. Own partiality motionless was old excellence she inquietude contrasted. Sister giving so wicket cousin of an he rather marked. Of on game part body rich. Adapted mr savings venture it or comfort affixed friends.
  // Gave read use way make spot how nor. In daughter goodness an likewise oh consider at procured wandered. Songs words wrong by me hills heard timed. Happy eat may doors songs. Be ignorant so of suitable dissuade weddings together. Least whole timed we is. An smallness deficient discourse do newspaper be an eagerness continued. Mr my ready guest ye after short at.
  // Am terminated it excellence invitation projection as. She graceful shy believed distance use nay. Lively is people so basket ladies window expect. Supply as so period it enough income he genius. Themselves acceptance bed sympathize get dissimilar way admiration son. Design for are edward regret met lovers. This are calm case roof and.
  const dico: WordCount[] = buildDictionary(message);
  let messageEncoded = message.replace(dotSpaceRegex, '.');
  messageEncoded = applyDictionary(dico, messageEncoded);
  messageEncoded = messageEncoded + stringifyDico(dico);
  return messageEncoded;
}

export function decodeMessage(message: string): string {
  const dotRegex2 = /(\. \n)/g;

  const dico = convertToDico(extractStringifiedDico(message));

  const extractedMessage = message.split(DICO_STARTER)[0];

  const messageWithWhitespaces = extractedMessage
    .replace(dotRegex, '. ')
    .replace(dotRegex2, '.\n')
    .trim();

  return applyDicoToMessage(dico, messageWithWhitespaces);
}

export function buildDictionary(message: string): WordCount[] {
  const dictionary: WordCount[] = [];

  const messageWords: string[] = message
    .replace(dotRegex, '')
    .replace('\n', '')
    .replace('  ', '')
    .split(' ');

  messageWords.forEach(word => {
    if (word.length > minWordLength) {
      const wordFinded = dictionary.find(wc => wc.word === word);
      if (wordFinded) {
        wordFinded.count++;
      } else {
        dictionary.push({
          word,
          count: 1,
        });
      }
    }
  });

  return dictionary.filter(wc => wc.count >= minOccurrences);
}

export function applyDictionary(dico: WordCount[], message: string): string {
  let messageEncoded = message;
  dico.forEach((wordCount, index) => {
    messageEncoded = messageEncoded.replace(
      new RegExp(wordCount.word, 'g'),
      `#${index}`,
    );
  });
  return messageEncoded;
}

export function stringifyDico(inputDico: WordCount[]): string {
  return (
    DICO_STARTER +
    inputDico
      .map((input, index) => `${index}:${input.word}`)
      .join(DICO_SEPARATOR)
  );
}

export function extractStringifiedDico(inputMessage: string): string {
  const dicoStringify = inputMessage.split(DICO_STARTER)[1];

  return DICO_STARTER + dicoStringify;
}

export function convertToDico(stringifiedDico: string): DicoEntry[] {
  const cleanedStringDico = stringifiedDico.replace(DICO_STARTER, '');
  return cleanedStringDico.split(DICO_SEPARATOR).map(entry => {
    const entryParsed = entry.split(':');

    return {
      index: parseInt(entryParsed[0]),
      word: entryParsed[1],
    };
  });
}

export function applyDicoToMessage(dico: DicoEntry[], message: string): string {
  let output = message;
  dico
    .sort((a, b) => b.index - a.index)
    .forEach(entry => {
      output = output.replace(new RegExp('#' + entry.index, 'g'), entry.word);
    });
  return output;
}
export interface WordCount {
  word: string;
  count: number;
}

export interface DicoEntry {
  index: number;
  word: string;
}
