export interface IPerson {
  personName: string;
}

export interface IChat {
  groupMessage: IChatMessage;
  messages: Array<IChatMessage>
}

export interface IChatMessage extends IPerson {
  date: string;
  sentence: string;
}

export interface ISentence {
  text: string;
  labels: Array<string>;
}


export function removeStyleTag(s: string) {
  return s.replace('<style>', '').replace('</style>', '')
}


