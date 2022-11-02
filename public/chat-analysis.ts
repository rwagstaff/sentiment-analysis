import {load} from '@tensorflow-models/toxicity'
import {IChatMessage, IPerson} from "./chat";
import {IChartData} from "./chart-utils";


const threshold = 0.7;


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


export function classifySentences(sentences: string[]): void {
  load(threshold, undefined).then(model =>
    model.classify(sentences).then(results => {
      console.log(results);
    })
  )

}

export function classifyByPerson(personName: string, messages: Array<IChatMessage>): void {
    const sentences = messages.map(message => message.sentence);
     classifySentences(sentences)


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

