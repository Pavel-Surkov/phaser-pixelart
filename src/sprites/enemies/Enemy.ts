export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
    super(scene, x, y, texture);
  }

  public die() {
    // TODO: play death animation
    this.destroy();
  }
}
