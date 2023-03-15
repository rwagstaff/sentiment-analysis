import {attr, css, customElement, FASTElement, html, observable, when} from "@microsoft/fast-element";
import {IChat, IChatMessage, removeStyleTag} from "./chat";
import {IChartData} from "./chart-utils";
import {calcMessageSummary} from "./chat-summary";
import {groupByPerson} from "./text-handler";
import {classifySentences, IPersonTotal, loadModel} from "./chat-analysis";
import {ToxicityClassifier} from "@tensorflow-models/toxicity";
import {engine} from "@tensorflow/tfjs-core"

const template = html<AnalysisComponent>`
    ${when(x => x.loading, html<AnalysisComponent>`
        <app-spinner></app-spinner>`)}
    <app-header></app-header>

    <main>
        ${when(x => x.ready, html<AnalysisComponent>`
                    <app-chat-summary noOfMessages="${x => x.noOfMessages}" groupName="${x => x.groupName}"
                                      groupDate="${x => x.groupDate}"


                `
        )}

    </main>
`;

const styles = removeStyleTag(`
<style>

.upload-toolbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
}


</style>
`)


@customElement({
    name: 'app-analysis',
    template,
    styles: css`${styles}`
})
export class AnalysisComponent extends FASTElement {

    @observable chats: Array<IChatMessage> = [];
    @attr ready: boolean = false;
    @attr groupName: string;
    @attr groupDate: string;
    @attr loading: boolean;

    noOfMessages: number;
    //chartData: Array<IChartData>;
    groupedData: Map<string, Array<IChatMessage>>;
    // personChartData: Array<IChartData>
    private model: ToxicityClassifier;
    private start = 0;

    connectedCallback() {
        super.connectedCallback();
        this.initModel();
        this.logMemory('Start')
        this.addEventListener('upload-file', async (e: CustomEvent) => {

            const chat = e.detail as IChat;
            this.chats = chat.messages;
            this.groupName = chat.groupMessage.personName;
            this.groupDate = chat.groupMessage.date;
            this.groupedData = groupByPerson(this.chats);
            this.noOfMessages = this.chats.length;
            this.ready = true;
            this.loading = false;
        }, false);

        this.addEventListener('uploading', () => {
            this.loading = true;
        });

        this.addEventListener('clear-results', () => {
            this.clearResults();
        })

        // this.addEventListener('chart-summary', () => {
        //     this.chartData = calcMessageSummary(this.groupedData, this.noOfMessages);
        // })

        const chunkSize = 200;
        const max = 200;
        this.addEventListener('classify', async () => {
            this.start = 0
            await this.classifySentences(this.start, chunkSize, max);
        })

        this.addEventListener('next', async () => {

            this.start += 100;
            await this.classifySentences(this.start, chunkSize, max);
        })


    }


    private initModel() {
        loadModel().then(model => {
            console.log('Model loaded successfully');
            this.model = model
        });
    }

    private async classifySentences(start: number, chunkSize: number, max: number) {
        this.logMemory('Before Classify')


        const [person] = this.groupedData.keys();
        console.log(`Sentences ${start} to ${start + max} for ${person}`)
        const sentences = this.groupedData.get(person).map(s => s.sentence).slice(start, start + max);
        for (let i = 0; i < sentences.length; i = i + chunkSize) {
            const chunk = sentences.slice(i, i + chunkSize);
            console.log(`Messages from ${i} to ${i + chunk.length} of ${sentences.length}`)
            try {
                const res = await classifySentences(chunk, this.model);
                console.log(res)

            } catch (e) {
                console.error(e);
                this.model['model'].dispose();
                engine().disposeVariables();
                engine().state.dispose();
                this.initModel();
            }
        }

        engine().state.dispose()
        engine().disposeVariables()
        this.logMemory('After Dispose')

    }

    clearResults() {
        this.chats = null;
        this.groupDate = null;
        this.groupName = null;
        this.noOfMessages = null;
        //this.chartData = null;
        this.loading = false;
        this.ready = false;
        //this.groupedData = null;
    }

    private logMemory(prefix: string) {
        console.log(prefix)
        console.log(engine().memory())
    }
}
