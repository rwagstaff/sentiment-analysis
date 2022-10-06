import {expect} from '@jest/globals';
import {IChatMessage, parseLine} from "../public/text-handler";


describe('text-handler', () => {

  it('should parse line of chat text', () => {
    const line = '[31/07/2014, 11:55:21] Mr Smith: Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.'
    const chatLine = parseLine(line);
    const expectedChat: IChatMessage = {
      date: '2014-07-31T11:55:21',
      personName: 'Mr Smith',
      sentence: 'Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.'
    };
    expect(chatLine).toEqual(expectedChat);
  });

});

