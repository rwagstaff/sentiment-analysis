export interface IPerson {
  personName: string;
}

export interface IChatMessage extends IPerson {
  date: string;
  sentence: string;
}

export interface IPersonChat extends IPerson {
  sentences: string[];
}

