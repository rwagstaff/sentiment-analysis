import {Temporal} from '@js-temporal/polyfill';

export interface IChatMessage {
  date: string;
  personName: string;
  sentence: string;
}

export function parseFileText(text: string): Array<IChatMessage> {
  return text.split('\n').map(line => parseLine(line));
}

export function parseLine(line: string): IChatMessage {
  const endOfDateIndex = line.indexOf(']');
  const date = parseDate(line.substring(1, endOfDateIndex));
  const nameAndSentence = line.substring(endOfDateIndex + 1).trim();
  const endOfPersonIndex = nameAndSentence.indexOf(':')
  const personName = nameAndSentence.substring(0, endOfPersonIndex);
  const sentence = nameAndSentence.substring(endOfPersonIndex + 1).trim();
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

