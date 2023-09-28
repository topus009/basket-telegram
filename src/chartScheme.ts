export default {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  width: 500,
  height: 300,
  mark: {
    interpolate: 'monotone',
    type: 'line',
    strokeWidth: 3,
    point: true,
  },
  encoding: {
    x: {
      field: 'game',
    },
    y: {
      aggregate: 'mean',
      field: 'point',
      type: 'quantitative',
    },
    color: {
      field: 'player',
      type: 'nominal',
    },
  },
};
