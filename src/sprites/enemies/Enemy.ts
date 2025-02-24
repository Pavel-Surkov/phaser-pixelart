import { EnemyAnims, EnemyStates } from '@constants/enemies';
import { RegistryKeys } from '@constants/game';

type EnemySpriteKeys = {
  idle: string;
  run: string;
  attack: string;
  death: string;
};

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  public hitArea: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  public initialPosition: number;
  public attackRange = 60;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteKeys: EnemySpriteKeys) {
    super(scene, x, y, spriteKeys.idle);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.initialPosition = x;

    this.createAnimations(spriteKeys);
    this.setState(EnemyStates.ALIVE);
  }

  private createAnimations(keys: EnemySpriteKeys) {
    this.anims.create({
      key: EnemyAnims.IDLE,
      frames: this.anims.generateFrameNames(keys.idle),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: EnemyAnims.RUN,
      frames: this.anims.generateFrameNames(keys.run),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: EnemyAnims.ATTACK,
      frames: this.anims.generateFrameNames(keys.attack),
      frameRate: 10,
    });

    this.anims.create({
      key: EnemyAnims.DEATH,
      frames: this.anims.generateFrameNames(keys.death),
      frameRate: 5,
    });
  }

  addPhysicsAndHideHitArea() {
    this.scene.physics.world.enable(this.hitArea);
    this.hitArea.body.allowGravity = false;
    this.hitArea.body.enable = false;
    this.hitArea.visible = false;
    this.scene.physics.world.remove(this.hitArea.body);
  }

  startHit(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {
    if (frame.index < 6) {
      return;
    }

    this.off(Phaser.Animations.Events.ANIMATION_UPDATE, this.startHit);

    this.hitArea.body.enable = true;
    this.scene.physics.world.add(this.hitArea.body);
  }

  die() {
    this.setVelocityX(0).setState(EnemyStates.DEAD);
    this.hitArea.destroy();
    this.anims.play(EnemyAnims.DEATH);

    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (animation: Phaser.Animations.Animation) => {
      if (animation.key === EnemyAnims.DEATH) {
        this.destroy();
      }
    });
  }

  update(velocityX: number) {
    if (this.state !== EnemyStates.ALIVE) {
      return;
    }

    const worldCoordX = this.scene.registry.get(RegistryKeys.WORLD_COORD_X);
    const playerRelativePosX = this.scene.scale.width / 2 + worldCoordX * 1.3 - this.x;

    const lookDirection = playerRelativePosX > 0 ? 'right' : 'left';
    const runDirection =
      Math.abs(playerRelativePosX) - this.attackRange <= 0 ? 'none' : playerRelativePosX > 0 ? 'right' : 'left';
    this.setVelocityX(runDirection === 'right' ? velocityX : runDirection === 'left' ? -velocityX : 0);

    if (runDirection === 'none') {
      super.setState(EnemyStates.IMMOVABLE);
      this.anims.play(EnemyAnims.ATTACK);
    } else {
      this.calcMovement(runDirection, lookDirection);
    }
  }

  private calcMovement(runDirection: 'left' | 'right' | 'none', lookDirection: 'left' | 'right') {
    if (lookDirection === 'left') {
      this.flipX = true;
    } else {
      this.flipX = false;
    }

    if (runDirection === 'left') {
      this.anims.play(EnemyAnims.RUN, true);
      this.flipX = true;
    } else if (runDirection === 'right') {
      this.anims.play(EnemyAnims.RUN, true);
      this.flipX = false;
    }
  }
}
