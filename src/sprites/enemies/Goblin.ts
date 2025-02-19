import { RegistryKeys } from '@constants/game';
import { GoblinAnims, GoblinSprites } from '@constants/enemies';

// TODO: Add Enemy sprite to set up basic methods, collisions and values for enemies and extend Goblin from it
export class Goblin extends Phaser.Physics.Arcade.Sprite {
  private initialPositionX: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, GoblinSprites.IDLE);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.initialPositionX =
      x - scene.registry.get(RegistryKeys.WORLD_COORD_X) * 1.6;

    this.configureBody();
    this.createAnimations();

    this.anims.play(GoblinAnims.IDLE, true);
  }

  configureBody() {
    this.setScale(1.6).setBodySize(24, 32);
    this.body?.setOffset(
      this.width / 2 - this.body.halfWidth,
      this.height / 2 - this.body.halfHeight + 10
    );
    this.refreshBody();
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
    // Multiply by 1.6 because of background group's scaleXY
    this.setX(
      this.initialPositionX -
        this.scene.registry.get(RegistryKeys.WORLD_COORD_X) * 1.6
    );
  }
}
