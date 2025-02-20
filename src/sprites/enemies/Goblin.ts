import { GoblinAnims, GoblinSprites } from '@constants/enemies';
import { RegistryKeys } from '@constants/game';

// TODO: Add Enemy sprite to set up basic methods, collisions and values for enemies and extend Goblin from it
export class Goblin extends Phaser.Physics.Arcade.Sprite {
  public velocityX = 150;
  public initialPosition: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, GoblinSprites.IDLE);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.initialPosition = x;

    this.configureBody();
    this.createAnimations();

    this.anims.play(GoblinAnims.IDLE, true);
  }

  configureBody() {
    this.setSize(24, 36).setScale(1.6);
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
    const worldCoordX = this.scene.registry.get(RegistryKeys.WORLD_COORD_X);
    const playerRelativePosX = this.scene.scale.width / 2 + worldCoordX * 1.3 - this.x;

    const direction =
      Math.abs(playerRelativePosX) - 56 <= 0
        ? 'none'
        : playerRelativePosX > 0
          ? 'right'
          : 'left';

    this.setVelocityX(
      direction === 'right' ? this.velocityX : direction === 'left' ? -this.velocityX : 0
    );
  }
}
