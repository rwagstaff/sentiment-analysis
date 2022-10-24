import {Temporal} from '@js-temporal/polyfill';
import {IChatMessage} from "./chat";

export const uploadFileId = "upload-file-input"


const dateRegex = /\[([0-9]{2}\/[0-9]{2}\/[0-9]{4}, [0-9]{2}:[0-9]{2}:[0-9]{2})\]/g

export function parseFileText(text: string, ignoreLines: number = 1): IChatMessage[] {

  const messages = text.split(dateRegex).slice(ignoreLines);
  const chats: IChatMessage[] = [];
  for (let i = 0; i < messages.length; i = i + 2) {
    const nameAndMessage = messages[i + 1];
    if (nameAndMessage.indexOf(':') !== -1) {
      // Probably a WhatsApp generated message (ie You were added)
      chats.push(parseLine(messages[i], nameAndMessage));
    }
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

export function groupByPerson(lines: IChatMessage[]): Map<string, IChatMessage[]> {
  const map = new Map<string, IChatMessage[]>();
  lines.forEach(line => {
    if (map.get(line.personName)) {
      map.get(line.personName).push(line)
    } else {
      map.set(line.personName, [line]);
    }
  })
  return map;
}

