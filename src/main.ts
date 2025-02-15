import { GameData } from '@constants/game';
import { Game as MainGame } from '@scenes/Game';
import { AUTO, Game, Scale, Types } from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

enum SceneKeys {
  GAME = 'game',
}

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: GameData.width,
  height: GameData.height,
  parent: 'game-container',
  backgroundColor: '#028af8',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 500,
        x: 0,
      },
      debug: true,
    },
  },
  scale: {
    parent: 'game-container',
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [new MainGame({ key: SceneKeys.GAME })],
};

export default new Game(config);
