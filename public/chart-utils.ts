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

export function initBarChart(data: Array<IChartData>, container: HTMLElement) {

  const chart = new Chart({
    container: 'container',
    autoFit: true,
    height: 500,
  });
  chart.data(data);
  chart.scale('value', {
    alias: '金额(元)'
  });
  chart.axis('time', {
    tickLine: null,
  });

  chart.axis('value', {
    label: {
      formatter: text => {
        return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      }
    },
    title: {
      offset: 80,
      style: {
        fill: '#aaaaaa'
      },
    }
  });
  chart.legend({
    position: 'right',
  });

  chart.tooltip({
    shared: true,
    showMarkers: false,
  });
  chart.interaction('active-region');

  chart
    .interval()
    .adjust('stack')
    .position('time*value')
    .color('type', ['#40a9ff', '#1890ff', '#096dd9', '#0050b3']);

  chart.render();

}

