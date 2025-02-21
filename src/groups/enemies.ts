import { EnemyTypes } from '@constants/enemies';
import { Goblin } from '@sprites/enemies/Goblin';

export class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene);
  }

  addEnemy(type: EnemyTypes, x: number, y: number, collidesWith?: Phaser.GameObjects.GameObject[]) {
    let enemy: Goblin;

    if (type === EnemyTypes.GOBLIN) {
      enemy = new Goblin(this.scene, x, y);
    } else {
      // Default enemy sprite
      enemy = new Goblin(this.scene, x, y);
    }

    this.add(enemy);
    collidesWith?.forEach((obj) => this.scene.physics.add.collider(enemy, obj));
  }
}
