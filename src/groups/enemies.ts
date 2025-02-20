import { EnemyTypes } from '@constants/enemies';
import { Goblin } from '@sprites/enemies/Goblin';

export class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene);
  }

  addEnemy(
    type: EnemyTypes,
    x: number,
    y: number,
    collidesWith?: Phaser.GameObjects.GameObject[]
  ) {
    let enemy: Goblin;

    if (type === EnemyTypes.GOBLIN) {
      enemy = new Goblin(this.scene, x, y);
    } else {
      // Default enemy sprite
      enemy = new Goblin(this.scene, x, y);
    }

    this.add(enemy);

    // Set velocityX because it resets after adding to group
    // TODO: Uncomment when resolve the issue with setX that affects velocity
    // TODO: Remove collisions with Player and move enemies with setX
    // enemy.setVelocityX(enemy.velocityX);
    collidesWith?.forEach((obj) => this.scene.physics.add.collider(enemy, obj));
  }
}
