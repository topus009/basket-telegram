function sum(arr: number[] = []) {
  let total = 0;

  arr.forEach((num) => {
    total += num;
  });

  return total;
}

const concatPlayerGame = (game): number[] => Object.values(game).reduce((acc, it) => {
  acc = acc.concat(...it);
  return acc;
}, []);

const generateChart = (games) => {
  const dataMap: Point[] = [];

  try {
    games.forEach((game) => {
      const players = Object.keys(game).filter((key) => key !== 'id' && key !== 'updatedAt');

      players.forEach((name) => {
        const playerGame = game[name];
        const allPlayerPoints = concatPlayerGame(Object.values(playerGame || {}));
        const pointsCount = sum(allPlayerPoints);

        dataMap.push({
          game: +game.id,
          player: name,
          point: pointsCount,
        });
      });
    });

    return dataMap;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export default generateChart;
