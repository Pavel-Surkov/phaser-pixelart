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

export enum PlayerAnims {
  IDLE = 'idle',
  RUN = 'run',
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private maxVelocityY = 320;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setState(PlayerStates.ALIVE);

    this.setCollideWorldBounds(true);
    this.setScale(2);

    this.body?.setSize(this.body.halfWidth, this.body.height);
    this.body?.setOffset(this.body.halfWidth, 10);

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

  die() {
    this.setState(PlayerStates.DEAD);

    this.anims.play(PlayerAnims.IDLE);
    this.anims.stop();

    this.setTint(0xff0000);
    this.setImmovable(true);

    this.scene.physics.world.disable(this);
  }

  update(cursor: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (this.state === PlayerStates.DEAD) {
      return;
    }

    if (cursor.left.isDown) {
      this.anims.play(PlayerAnims.RUN, true);
      this.setFlipX(true);
    } else if (cursor.right.isDown) {
      this.anims.play(PlayerAnims.RUN, true);
      this.setFlipX(false);
    } else if (this.body) {
      this.anims.play(PlayerAnims.IDLE, true);
    }

    if (cursor.up.isDown && this.body?.touching.down) {
      this.setVelocityY(-this.maxVelocityY);
    }
  }
}
