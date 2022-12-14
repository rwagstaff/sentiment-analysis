import {classifySentences} from "../public/chat-analysis";
import {IChatMessage} from "../public/chat";
import {Temporal} from "@js-temporal/polyfill";


describe('chat-analysis', () => {

  it('should classify by person', async () => {
    const personMessages = new Map<string, Array<IChatMessage>>();
    const addMessage = (personName: string, sentences: Array<string>) => {
      const messages = sentences.map(sentence => {
        return {date: Temporal.Now.plainDateTimeISO.toString(), personName, sentence};
      })
      if (personMessages.get(personName)) {
        personMessages.get(personName).concat(messages);
      } else {
        personMessages.set(personName, messages);
      }
    }

    addMessage('Friendly Bob', ['Hello', 'How are you', 'You look swell today'])
    addMessage('Unfriendly Steve', ['Shut up', 'I will kick you square in the balls', 'Go suck a lemon'])

    const results = classifyByPerson(personMessages);

    expect(results.length).toBe(2)
  })


});

