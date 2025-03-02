import Cookies from 'js-cookie';

const SCORE_KEY = 'witch_game_highscore';

export class HighScoreManager {
  static getScore() {
    return Cookies.get(SCORE_KEY) || localStorage.getItem(SCORE_KEY) || '0';
  }

  static setScore(score: string) {
    const newHighScore = Math.max(+this.getScore(), +score).toString();

    Cookies.set(SCORE_KEY, newHighScore);
    localStorage.setItem(SCORE_KEY, newHighScore);
  }

  static hasScore() {
    return !!(Cookies.get(SCORE_KEY) || localStorage.getItem(SCORE_KEY));
  }

  static clearScore() {
    Cookies.remove(SCORE_KEY);
    localStorage.removeItem(SCORE_KEY);
  }
}
