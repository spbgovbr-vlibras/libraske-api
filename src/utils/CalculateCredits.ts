export default (timesPlayed: number, sessionScore: number, bonusValue: number) => {

  return timesPlayed > 1 ? { score: sessionScore + bonusValue, bonusValue } : { score: sessionScore, bonusValue: 0 };

}