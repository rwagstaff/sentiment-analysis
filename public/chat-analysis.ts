import {load} from '@tensorflow-models/toxicity'
import {IChatMessage, IPerson} from "./chat";
import {IChartData} from "./chart-utils";


const threshold = 0.9;


export interface IToxicityResult {
  label: string;
  results: {
    probabilities: Float32Array;
    match: boolean;
  }[]
}


export interface IPersonTotal extends IPerson {
  data: Array<IChartData>;
}


export async function classifySentences(sentences: string[]): Promise<IToxicityResult[]> {
  const model = await load(threshold, undefined)
  return await model.classify(sentences);
}

export async function classifyByPerson(chats: Map<string, IChatMessage[]>): Promise<IPersonTotal[]> {
  const promises: Promise<IPersonTotal>[] = [];

  chats.forEach((messages, personName) => {
    const sentences = messages.map(message => message.sentence);
    const promise = classifySentences(sentences).then(results => {
      return resultToData(results, personName)
    });
    promises.push(promise);
  })

  return await Promise.all(promises).then(value => value.flatMap(v => v))
}

function resultToData(toxicity: IToxicityResult[], personName: string): IPersonTotal {
  const data: IChartData[] = [];
  toxicity.forEach(category => {
    const matchingSentences = category.results.filter(sentence => sentence.match);
    if (matchingSentences.length > 0) {
      data.push({type: category.label, value: matchingSentences.length});
    }
  });

  return {personName, data};
}

export function totalPersonData(person: Array<IPersonTotal>): Array<IChartData> {
  return person.flatMap(person => person.data)
}

