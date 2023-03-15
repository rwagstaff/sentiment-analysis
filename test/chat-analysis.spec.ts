import {classifySentences, loadModel} from "../public/chat-analysis";
import {Temporal} from "@js-temporal/polyfill";
import {ISentence} from "../public/chat";


describe('chat-analysis', () => {

    it('should classify by person', async () => {

        const name = 'Friendly Person'


        const model = await loadModel();

        const personMessages = createMessages(name, ['Hello', 'How are you', 'You look swell today', 'Shut up', 'I will kick you square in the balls', 'Go suck a lemon'])
        const results = await classifySentences(name, personMessages, model);
        const expected: Array<ISentence> = [{text: personMessages[3].sentence, labels: []}]
        expect(results.classifiedSentences).toEqual(expected)
    })

    function createMessages(personName: string, sentences: Array<string>) {
        return sentences.map(sentence => {
            return {date: Temporal.Now.plainDateTimeISO.toString(), personName, sentence};
        })

    }


});

