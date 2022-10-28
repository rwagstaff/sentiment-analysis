import { Chart, Util } from '@antv/g2';

export interface IChartData {
  type: string;
  value: number;
}

export function initPieChart(data: Array<IChartData>, container: HTMLElement) {
  const chart = new Chart({
    container,
    autoFit: true,
    height: 500,
  });
  chart.data(data);

  chart.coordinate('theta', {
    radius: 0.75
  });
  chart.tooltip({
    showMarkers: false,
    showTitle: false,
  });

  chart
    .interval()
    .adjust('stack')
    .position('value')
    .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
    .style({opacity: 0.4})
    .state({
      active: {
        style: (element) => {
          const shape = element.shape;
          return {
            matrix: Util.zoom(shape, 1.1),
          }
        }
      }
    })
    .label('type', (val) => {
      return {
        offset: -30,
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 12,
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
        content: (obj) => {
          return obj.type + '\n' + obj.value + '%';
        },
      };
    });

  chart.interaction('element-single-selected');

  chart.render();
}

