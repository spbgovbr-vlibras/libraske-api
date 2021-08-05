export default (timesPlayed: number, sessionScore: number, bonusValue: number) => {

  return timesPlayed > 1 ? sessionScore + bonusValue : sessionScore;

}