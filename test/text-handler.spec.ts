import {expect} from '@jest/globals';
import {IChatMessage, parseFileText, parseLine} from "../public/text-handler";


function assertText(text: string, expectedChat: Array<IChatMessage>) {
  const chat = parseFileText(text);
  expect(expectedChat).toEqual(chat);
}

describe('text-handler', () => {

  it('should parse line of chat text', () => {
    const line = '31/07/2014, 11:55:21'
    const nameAndMessage = 'Mr Smith: Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.'
    const chatLine = parseLine(line, nameAndMessage);
    const expectedChat: IChatMessage = {
      date: '2014-07-31T11:55:21',
      personName: 'Mr Smith',
      sentence: 'Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.'
    };
    expect(chatLine).toEqual(expectedChat);
  });

  it('should handle multi line messages', () => {
    const text = `
    [19/11/2017, 21:10:34] Mr Smith: What time is it today?
    It is the afternoon
    [19/11/2017, 21:13:05] Mrs Jones: I think it is 17:00pm 
    It seems dark outside
    `.trim()

    const expectedChat: Array<IChatMessage> = [
      {
        date: '2017-11-19T21:10:34',
        personName: 'Mr Smith',
        sentence: `What time is it today?
    It is the afternoon`
      }, {
        date: '2017-11-19T21:13:05',
        personName: 'Mrs Jones',
        sentence: `I think it is 17:00pm 
    It seems dark outside`
      }
    ]

    assertText(text, expectedChat);
  })

  it('should handle square brackets in message', () => {
    const text = `
    [19/11/2017, 21:10:34] Mr Smith: Im going to use a special character
    [ in my message.
    [19/11/2017, 21:13:05] Mrs Jones: I should still parse
    `.trim()

    const expectedChat: Array<IChatMessage> = [
      {
        date: '2017-11-19T21:10:34',
        personName: 'Mr Smith',
        sentence: `Im going to use a special character
    [ in my message.`
      }, {
        date: '2017-11-19T21:13:05',
        personName: 'Mrs Jones',
        sentence: `I should still parse`
      }
    ]

    assertText(text, expectedChat);

  });

  it('should skip group messages', () => {
    const text = `
    [19/11/2017, 21:10:34] Mr Smith: Normal Message.
    [19/11/2017, 21:13:05] Mrs Jones: I should still parse
    [12/11/2017, 21:13:05] You are were added
    `.trim()

    const expectedChat: Array<IChatMessage> = [
      {
        date: '2017-11-19T21:10:34',
        personName: 'Mr Smith',
        sentence: 'Normal Message.'
      }, {
        date: '2017-11-19T21:13:05',
        personName: 'Mrs Jones',
        sentence: `I should still parse`
      }
    ]

    assertText(text, expectedChat);

  })

  it('should skip group creation message', function () {
    const text = `
    [19/11/2017, 21:10:34] Group: Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
    [19/11/2017, 21:10:34] Mr Smith: Normal Message.
    [19/11/2017, 21:13:05] Mrs Jones: I should still parse
    [12/11/2017, 21:13:05] You are were added
    `.trim()
    const expectedChat: Array<IChatMessage> = [
      {
        date: '2017-11-19T21:10:34',
        personName: 'Mr Smith',
        sentence: 'Normal Message.'
      }, {
        date: '2017-11-19T21:13:05',
        personName: 'Mrs Jones',
        sentence: `I should still parse`
      }
    ]

    const chat = parseFileText(text, 3);
    expect(expectedChat).toEqual(chat);
  });


});

