export default {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  width: 500,
  height: 300,
  data: {
    name: 'table',
    values: [
      {
        game: 6,
        player: 'sergey',
        point: 11,
      },
      {
        game: 6,
        player: 'nastya',
        point: 10,
      },
      {
        game: 6,
        player: 'stepan',
        point: 11,
      },
      {
        game: 1,
        player: 'sergey',
        point: 3,
      },
      {
        game: 1,
        player: 'nastya',
        point: 13,
      },
      {
        game: 1,
        player: 'stepan',
        point: 9,
      },
      {
        game: 2,
        player: 'sergey',
        point: 10,
      },
      {
        game: 2,
        player: 'nastya',
        point: 13,
      },
      {
        game: 2,
        player: 'stepan',
        point: 7,
      },
      {
        game: 3,
        player: 'sergey',
        point: 8,
      },
      {
        game: 3,
        player: 'nastya',
        point: 10,
      },
      {
        game: 3,
        player: 'stepan',
        point: 7,
      },
      {
        game: 4,
        player: 'sergey',
        point: 12,
      },
      {
        game: 4,
        player: 'nastya',
        point: 14,
      },
      {
        game: 4,
        player: 'stepan',
        point: 11,
      },
      {
        game: 5,
        player: 'sergey',
        point: 14,
      },
      {
        game: 5,
        player: 'nastya',
        point: 6,
      },
      {
        game: 5,
        player: 'stepan',
        point: 7,
      },
    ],
  },
  mark: {
    interpolate: 'monotone',
    type: 'line',
    strokeWidth: 3,
    point: true,
  },
  encoding: {
    x: {
      field: 'game',
      scale: {
        zero: false,
      },
    },
    y: {
      aggregate: 'mean',
      field: 'point',
      type: 'quantitative',
      scale: {
        zero: false,
      },
    },
    color: {
      field: 'player',
      type: 'nominal',
    },
  },
};
