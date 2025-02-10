export class Bombs extends Phaser.Physics.Arcade.Group {
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene);

    this.scene = scene;
  }

  createBomb() {
    const bomb = this.create(Phaser.Math.Between(0, 800), 16, 'bomb');

    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}
