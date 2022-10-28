import {IChatMessage} from "./chat";
import {IChartData} from "./chart-utils";


export function calcMessageSummary(messages: Map<string, Array<IChatMessage>>, totalMessage: number): Array<IChartData> {
  const chartData: Array<IChartData> = [];
  messages.forEach((arr, key) => {
    chartData.push({type: key, value: round(arr.length / totalMessage)})
  })
  return chartData;
}


function round(num: number) {
  return Math.round(num * 100)
}