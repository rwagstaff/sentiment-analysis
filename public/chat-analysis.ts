import {load, ToxicityClassifier} from '@tensorflow-models/toxicity'
import {IChatMessage, IPerson} from "./chat";
import {IChartData} from "./chart-utils";


const threshold = 0.5;
const chunkSize = 1000;



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


export function classifySentences(personName: string, messages: Array<IChatMessage>, model: ToxicityClassifier): void {
  const sentences = messages.map(message => message.sentence);
  const chunk = sentences.slice(0, chunkSize);
  model.classify(chunk).then(results => {
    const data = resultToData(results, personName);

  })


}

export async function loadModel(): Promise<ToxicityClassifier> {
  return load(threshold, undefined)
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

