import { SceneKeys } from '@constants/game';
import { Game as MainGame } from '@scenes/Game';
import { Tutorial } from '@scenes/Tutorial';
import { AUTO, Game, Scale, Types } from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: '#028af8',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 500,
        x: 0,
      },
      debug: import.meta.env.DEV,
    },
  },
  scale: {
    parent: 'game-container',
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: [
    // new Tutorial({ key: SceneKeys.Tutorial }),
    new MainGame({ key: SceneKeys.GAME }),
  ],
};

const game = new Game(config);

export default game;
