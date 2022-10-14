import {Temporal} from '@js-temporal/polyfill';

export const uploadFileId = "upload-file-input"

export interface IChatMessage {
  date: string;
  personName: string;
  sentence: string;
}

const dateRegex = /\[([0-9]{2}\/[0-9]{2}\/[0-9]{4}, [0-9]{2}:[0-9]{2}:[0-9]{2})\]/g

export function parseFileText(text: string): Array<IChatMessage> {

  const messages = text.split(dateRegex).slice(1);
  const chats: Array<IChatMessage> = [];
  for (let i = 0; i < messages.length; i = i + 2) {
    chats.push(parseLine(messages[i], messages[i + 1]));
  }

  return chats;
}

export function parseLine(dateString: string, nameAndMessage: string): IChatMessage {
  const date = parseDate(dateString);

  const endOfName = nameAndMessage.indexOf(':');
  const personName = nameAndMessage.substring(0, endOfName).trim()
  const sentence = nameAndMessage.substring(endOfName + 1).trim();
  return {date, personName, sentence};
}

/**
 * Convert dd/mm/yyyy to ISO 8601
 */
function parseDate(str: string): string {
  const dateAndTime = str.split(' ');
  const dateParts = dateAndTime[0].slice(0, -1).split("/");
  const timeParts = dateAndTime[1].split(':');
  const date = {
    year: +dateParts[2],
    month: +dateParts[1],
    day: +dateParts[0],
    hour: +timeParts[0],
    minute: +timeParts[1],
    second: +timeParts[2]
  };
  return Temporal.PlainDateTime.from(date).toString();
}

