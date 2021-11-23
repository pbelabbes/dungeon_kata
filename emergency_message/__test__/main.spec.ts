import {
  applyDictionary,
  buildDictionary,
  convertToDico,
  decodeMessage,
  encodeMessage,
  extractStringifiedDico,
  stringifyDico,
  WordCount,
} from '../src/main';

describe('Encode message', () => {
  it('should encode message', () => {
    const messageToEncode = `Of be talent me answer do relied. Mistress in on so laughing throwing endeavor occasion welcomed. Gravity sir brandon calling can. No years do widow house delay stand. Prospect six kindness use steepest new ask. High gone kind calm call as ever is. Introduced melancholy estimating motionless on up as do. Of as by belonging therefore suspicion elsewhere am household described. Domestic suitable bachelor for landlord fat.
      She suspicion dejection saw instantly. Well deny may real one told yet saw hard dear. Bed chief house rapid right the. Set noisy one state tears which. No girl oh part must fact high my he. Simplicity in excellence melancholy as remarkably discovered. Own partiality motionless was old excellence she inquietude contrasted. Sister giving so wicket cousin of an he rather marked. Of on game part body rich. Adapted mr savings venture it or comfort affixed friends.
      Gave read use way make spot how nor. In daughter goodness an likewise oh consider at procured wandered. Songs words wrong by me hills heard timed. Happy eat may doors songs. Be ignorant so of suitable dissuade weddings together. Least whole timed we is. An smallness deficient discourse do newspaper be an eagerness continued. Mr my ready guest ye after short at.
      Am terminated it excellence invitation projection as. She graceful shy believed distance use nay. Lively is people so basket ladies window expect. Supply as so period it enough income he genius. Themselves acceptance bed sympathize get dissimilar way admiration son. Design for are edward regret met lovers. This are calm case roof and.`;
    const expectedMaxLength = messageToEncode.length;
    const encodedMessage: string = encodeMessage(messageToEncode);

    expect(encodedMessage.length).toBeLessThan(expectedMaxLength);
    const decodedMessage = decodeMessage(encodedMessage);
    expect(decodedMessage).toBe(messageToEncode);
  });

  it('should replace one word from dico', () => {
    const inputMessage =
      'Bonjour Bonjour je suis content Bonjour. Je vais bien.';
    const expectedMessage = '#0 #0 je suis content #0. Je vais bien.';

    const dico = buildDictionary(inputMessage);
    const output = applyDictionary(dico, inputMessage);
    expect(output).toBe(expectedMessage);
  });

  it('should replace multiple words from dico', () => {
    const inputMessage =
      'Bonjour Bonjour je suis content Bonjour. Je vais bien et je suis content.';
    const expectedMessage = '#0 #0 je suis #1 #0. Je vais bien et je suis #1.';

    const dico = buildDictionary(inputMessage);
    const output = applyDictionary(dico, inputMessage);
    expect(output).toBe(expectedMessage);
  });

  it('should build the toString of dictionary', () => {
    const inputDico: WordCount[] = [
      { word: 'Bonjour', count: 3 },
      { word: 'content', count: 4 },
    ];
    const expectedDico = '|0:Bonjour/1:content';

    const resDico: string = stringifyDico(inputDico);

    expect(resDico).toBe(expectedDico);
  });

  it('should be encoded with dico', () => {
    const inputMessage =
      'Bonjour Bonjour je suis content Bonjour. Je vais bien et je suis content.';
    const expectedMessage =
      '#0 #0 je suis #1 #0.Je vais bien et je suis #1.|0:Bonjour/1:content';

    const encodedMessage = encodeMessage(inputMessage);

    expect(encodedMessage).toBe(expectedMessage);
  });

  it('should return the stringified dico of encoded ', () => {
    const inputMessage =
      '#0 #0 je suis #1 #0.Je vais bien et je suis #1.|0:Bonjour/1:content';

    const expectedStringifiedDico = '|0:Bonjour/1:content';

    const resStringifiedDico = extractStringifiedDico(inputMessage);

    expect(resStringifiedDico).toBe(expectedStringifiedDico);
  });

  it('should return the dico of stringified dico ', () => {
    const inputStringifiedDico = '|0:Bonjour/1:content';
    const expectedDico = [
      {
        index: 0,
        word: 'Bonjour',
      },
      {
        index: 1,
        word: 'content',
      },
    ];

    const resDico = convertToDico(inputStringifiedDico);

    expect(resDico).toEqual(expectedDico);
  });

  it('should be decoded', () => {
    const expectedMessage =
      'Bonjour Bonjour je suis content Bonjour. Je vais bien et je suis content.';
    const inputMessage =
      '#0 #0 je suis #1 #0.Je vais bien et je suis #1.|0:Bonjour/1:content';

    const decodedMessage = decodeMessage(inputMessage);

    expect(decodedMessage).toBe(expectedMessage);
  });
  it('should be decoded with an index >= 10', () => {
    const expectedMessage =
      'Bonjour Bonjour je suis content Bonjour. Je vais bien et je suis content.';
    const inputMessage =
      '#10 #10 je suis #1 #10.Je vais bien et je suis #1.|1:content/10:Bonjour';

    const decodedMessage = decodeMessage(inputMessage);

    expect(decodedMessage).toBe(expectedMessage);
  });
});
