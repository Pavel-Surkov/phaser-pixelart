import { EnemyStates } from '@constants/enemies';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
    super(scene, x, y, texture);

    this.setState(EnemyStates.ALIVE);
  }

  public die() {
    // TODO: play death animation
    this.destroy();
  }
}
