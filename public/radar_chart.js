import 'plugins/radar_chart/radar_chart.less';
import mainTemplate from 'plugins/radar_chart/radar_chart.html';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { CATEGORY } from 'ui/vis/vis_category';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { vislibColorMaps } from 'ui/vislib/components/color/colormaps';
import { RadarChartComponent } from './radar_chart_controller';
import image from './images/radar-chart.svg';
// we need to load the css ourselves

// we also need to load the controller and used by the template

// register the provider with the visTypes registry 
VisTypesRegistryProvider.register(RadarChartProvider);

function RadarChartProvider(Private) {
  const Schemas = Private(VisSchemasProvider);
  const VisFactory = Private(VisFactoryProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.

  return VisFactory.createReactVisualization({
    name: 'health-metric',
    title: 'health-metric',
    image,
    description: 'Displays a metric with a color according to the planned state of health.',
    category: CATEGORY.DATA,
    visConfig: {
      component: RadarChartComponent,
      defaults: {
        addTooltip: true,
        addLegend: false,
        type: 'metric',
        metric: {
          percentageMode: false,
          colorsRange: [
            { from: 0, to: 10000 }
          ],
          labels: {
            show: true
          },
          style: {
            fontSize: 60,
            fontColor: 'black',
            invertScale: false,
            redThreshold: 0,
            yellowThreshold: 0,
            redColor: "#fd482f",
            yellowColor: "#ffa500",
            greenColor: "#6dc066"
          }
        }
      }
    },
    editorConfig: {
      collections: {
        metricColorMode: ['None', 'Labels', 'Background'],
        colorSchemas: Object.keys(vislibColorMaps)
      },
      optionsTemplate: mainTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          aggFilter: [
            '!std_dev', '!geo_centroid', '!percentiles', '!percentile_ranks',
            '!derivative', '!serial_diff', '!moving_avg', '!cumulative_sum', '!geo_bounds'],
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }, {
          group: 'buckets',
          name: 'group',
          title: 'Split Group',
          min: 0,
          max: 1,
          aggFilter: ['!geohash_grid', '!filter']
        }
      ])
    }
  });
}

export default RadarChartProvider;
