import { RegistryKeys } from '@constants/game';
import { GoblinAnims, GoblinSprites } from '@constants/goblin';

export class Goblin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, GoblinSprites.IDLE);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setScale(1.6);
    this.setBodySize(24, 32);
    this.body?.setOffset(
      this.width / 2 - this.body.halfWidth,
      this.height / 2 - this.body.halfHeight + 10
    );

    this.createAnimations();

    this.anims.play(GoblinAnims.IDLE, true);
  }

  createAnimations() {
    this.anims.create({
      key: GoblinAnims.IDLE,
      frames: this.anims.generateFrameNames(GoblinSprites.IDLE),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: GoblinAnims.RUN,
      frames: this.anims.generateFrameNames(GoblinSprites.RUN),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: GoblinAnims.ATTACK,
      frames: this.anims.generateFrameNames(GoblinSprites.ATTACK),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    const currentWorldCoordX = this.scene.registry.get(
      RegistryKeys.WORLD_COORD_X
    );

    // Because of background group's scaleXY
    this.setX(-currentWorldCoordX * 1.6);
  }
}
