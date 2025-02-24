import { EnemyTypes } from '@constants/enemies';
import { Enemy } from '@sprites/enemies/Enemy';
import { Goblin } from '@sprites/enemies/Goblin';
import { Mushroom } from '@sprites/enemies/Mushroom';
import { Skeleton } from '@sprites/enemies/Skeleton';
import { Player } from '@sprites/Player';

export class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene);

    this.setDepth(2);
  }

  addEnemy(
    type: EnemyTypes,
    x: number,
    y: number,
    attackTarget: Phaser.GameObjects.Sprite,
    collidesWith?: Phaser.GameObjects.GameObject[]
  ) {
    let enemy: Enemy;

    if (type === EnemyTypes.GOBLIN) {
      enemy = new Goblin(this.scene, x, y);
    } else if (type === EnemyTypes.SKELETON) {
      enemy = new Skeleton(this.scene, x, y);
    } else if (type === EnemyTypes.MUSHROOM) {
      enemy = new Mushroom(this.scene, x, y);
    } else {
      // Default enemy sprite
      enemy = new Goblin(this.scene, x, y);
    }

    // Bind enemy to attack Player
    if (attackTarget instanceof Player) {
      this.scene.physics.add.overlap(
        attackTarget,
        enemy.hitArea,
        (attackTarget) => (attackTarget as Player).die(),
        undefined,
        this
      );
    }

    this.add(enemy);
    collidesWith?.forEach((obj) => this.scene.physics.add.collider(enemy, obj));
  }
}
