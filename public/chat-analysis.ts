import {load, ToxicityClassifier} from '@tensorflow-models/toxicity'
import {IPerson, ISentence} from "./chat";
import {engine} from "@tensorflow/tfjs-core";

export interface IToxicityResult {
    label: string;
    results: Array<IToxicityMatches>
}

export interface IToxicityMatches {
    probabilities: Float32Array;
    match: boolean;
}

export interface IMatchIndex {
    index: number;

    label: string;

    text: string;
}


export interface IPersonTotal extends IPerson {
    classifiedSentences: Array<ISentence>;
}


export async function classifySentences(sentences: Array<string>, model: ToxicityClassifier): Promise<Array<any>> {
    console.log('before model')
    console.log(engine().memory())

    const results = await model.classify(sentences);
    const a = filterToxicSentences(results, sentences);
    console.log('after model')
    console.log(engine().memory())
    // model['model'].dispose()
    // console.log('after model dispose')
    // console.log(engine().memory())
    return a;

}

export async function loadModel(): Promise<ToxicityClassifier> {
    return load(0.5, undefined)
}

function filterToxicSentences(toxicity: IToxicityResult[], sentences: Array<string>): Array<IMatchIndex> {
    const matches: Array<IMatchIndex> = [];
    for (let category of toxicity) {
        category.results.forEach((res, sentenceIndex) => {
            if (res.match) {
                matches.push({index: sentenceIndex, text: sentences[sentenceIndex], label: category.label})
            }
        })
    }
    return matches;
}

