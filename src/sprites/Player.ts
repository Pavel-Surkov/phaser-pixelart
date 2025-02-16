import { CustomCursorKeys } from '@scenes/Game';
import Phaser from 'phaser';

export enum PlayerStates {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  IMMOVABLE = 'IMMOVABLE',
}

export enum PlayerSprites {
  IDLE = 'player_idle',
  RUN = 'player_run',
  DEATH = 'player_death',
  CHARGE = 'player_charge',
  ATTACK = 'player_attack',
  ICON = 'player_icon',
}

export enum PlayerAnims {
  IDLE = 'idle',
  RUN = 'run',
  CHARGE = 'charge',
  ATTACK = 'attack',
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private maxVelocityY = 320;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setCollideWorldBounds(true);
    this.setScale(2);
    this.scene.registry.set('playerState', PlayerStates.ALIVE);

    this.setBodySize(16, 32);

    this.createAnimations();

    scene.cameras.main.startFollow(this, false, 0.1, 0.1);
    scene.cameras.main.setDeadzone(0, 0);
    scene.cameras.main.setBounds(
      0,
      0,
      this.scene.scale.width,
      this.scene.scale.height,
      true
    );
  }

  createAnimations() {
    this.anims.create({
      key: PlayerAnims.RUN,
      frames: this.anims.generateFrameNames(PlayerSprites.RUN),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: PlayerAnims.IDLE,
      frames: this.anims.generateFrameNames(PlayerSprites.IDLE),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: PlayerAnims.CHARGE,
      frames: this.anims.generateFrameNames(PlayerSprites.CHARGE),
      frameRate: 10,
    });

    this.anims.create({
      key: PlayerAnims.ATTACK,
      frames: this.anims.generateFrameNames(PlayerSprites.ATTACK),
      frameRate: 12,
    });

    this.scene.anims.create({
      key: 'hero_icon',
      frames: this.anims.generateFrameNames(PlayerSprites.ICON),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.add
      .sprite(60, 60, 'hero_icon')
      .setScale(1.5)
      .setDepth(2)
      .play('hero_icon');

    this.on('animationstart', this.onAnimationStart, this);
    this.on('animationcomplete', this.onAnimationComplete, this);
  }

  onAnimationStart(animation: Phaser.Animations.Animation) {
    if (animation.key === PlayerAnims.CHARGE) {
      this.body?.setOffset(this.body.halfWidth, 10);
      this.scene.registry.set('playerState', PlayerStates.IMMOVABLE);
    } else if (animation.key === PlayerAnims.ATTACK) {
      // Change ofset & origin for the Witch to stay at one place
      if (this.flipX) {
        this.body?.setOffset(this.width - this.body.width + 4, 10);
        this.setOrigin(0.81, 0.5);
      } else {
        this.body?.setOffset(12, 10);
        this.setOrigin(0.19, 0.5);
      }
    } else {
      this.body?.setOffset(8, 10);
      this.scene.registry.set('playerState', PlayerStates.ALIVE);
    }
  }

  onAnimationComplete(animation: Phaser.Animations.Animation) {
    if (animation.key === PlayerAnims.CHARGE) {
      this.anims.play(PlayerAnims.ATTACK);
    }
    if (animation.key === PlayerAnims.ATTACK) {
      this.setOrigin(0.5, 0.5);
      this.scene.registry.set('playerState', PlayerStates.ALIVE);
    }
  }

  die() {
    this.scene.registry.set('playerState', PlayerStates.DEAD);

    this.anims.play(PlayerAnims.IDLE);
    this.anims.stop();

    this.setTint(0xff0000);
    this.setImmovable(true);

    this.scene.physics.world.disable(this);
  }

  update(cursor: CustomCursorKeys) {
    if (this.scene.registry.get('playerState') === PlayerStates.DEAD) {
      return;
    }

    if (
      cursor.attack.isDown &&
      this.body?.touching.down &&
      this.scene.registry.get('playerState') === PlayerStates.ALIVE
    ) {
      this.anims.play(PlayerAnims.CHARGE, true);
      this.scene.registry.set('playerState', PlayerStates.IMMOVABLE);
    }

    if (this.scene.registry.get('playerState') === PlayerStates.IMMOVABLE) {
      return;
    }

    if (cursor.left.isDown) {
      this.anims.play(PlayerAnims.RUN, true);
      this.setFlipX(true);
    } else if (cursor.right.isDown) {
      this.anims.play(PlayerAnims.RUN, true);
      this.setFlipX(false);
    } else {
      this.anims.play(PlayerAnims.IDLE, true);
    }

    if (cursor.up.isDown && this.body?.touching.down) {
      this.setVelocityY(-this.maxVelocityY);
    }
  }
}
