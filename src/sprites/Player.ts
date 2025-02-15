enum PlayerStates {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}

export enum PlayerSprites {
  IDLE = 'player_idle',
  RUN = 'player_run',
  DEATH = 'player_death',
  CHARGE = 'player_charge',
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.scene = scene;

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setState(PlayerStates.ALIVE);

    this.setDepth(1);
    this.setCollideWorldBounds(true);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('player_run'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('player_idle'),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.cameras.main.startFollow(this, false, 0.1, 0.1);

    this.cursor = this.scene.input.keyboard!.createCursorKeys();
  }

  die() {
    this.setState(PlayerStates.DEAD);

    this.anims.play('player_idle');
    this.anims.stop();

    this.setTint(0xff0000);
    this.setImmovable(true);

    this.scene.physics.world.disable(this);
  }

  update() {
    if (this.state === PlayerStates.DEAD) {
      return;
    }

    if (this.cursor.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play('run', true);
      this.setFlipX(true);
    } else if (this.cursor.right.isDown) {
      this.setVelocityX(160);
      this.anims.play('run', true);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
      this.anims.play('idle');
    }

    if (this.cursor.up.isDown && this.body?.touching.down) {
      this.setVelocityY(-330);
    }
  }
}
