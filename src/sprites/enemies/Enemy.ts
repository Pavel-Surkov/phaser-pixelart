import { EnemyStates } from '@constants/enemies';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  public hitArea: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
    super(scene, x, y, texture);

    this.setState(EnemyStates.ALIVE);
  }

  die() {
    // TODO: play death animation
    this.destroy();
  }
}
