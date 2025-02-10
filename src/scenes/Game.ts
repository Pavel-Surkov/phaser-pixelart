import { Scene } from 'phaser';
import { Player } from '../sprites/Player';
import { Bombs } from '../groups/Bombs';

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  platforms: Phaser.Physics.Arcade.StaticGroup;
  player: Player;
  stars: Phaser.Physics.Arcade.Group;
  bombs: Bombs;
  light: Phaser.GameObjects.PointLight;

  scoreText: Phaser.GameObjects.Text;
  score = 0;
  gameOver = false;

  preload() {
    this.load.setPath('assets');

    this.load.image('background', 'bg.png');
    this.load.image('logo', 'logo.png');
    this.load.image('ground', 'platform.png');
    this.load.image('star', 'star.png');
    this.load.image('bomb', 'bomb.png');
    this.load.spritesheet('hero', 'dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(512, 384, 'background');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(450, 568, 'ground').setScale(3).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.cameras.main.setBounds(0, -500, 1024, 2048, true);

    const logoPlatform = this.physics.add.staticGroup();
    logoPlatform
      .create(512, 100, 'logo')
      .setDepth(100)
      .setScale(0.9)
      .refreshBody();

    this.player = new Player(this, 100, 450);

    this.light = this.lights.addPointLight(
      this.player.x,
      this.player.y,
      0xff0000,
      50,
      1,
      0.07
    );

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, logoPlatform);

    this.createStars();

    this.bombs = new Bombs(this.physics.world, this);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      undefined,
      this
    );

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '32px',
      color: '#000',
    });
  }

  hitBomb() {
    this.physics.pause();
    this.player.die();
    this.gameOver = true;
  }

  createStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 14,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((star) => {
      (star as Phaser.Types.Physics.Arcade.SpriteWithStaticBody).setBounceY(
        Phaser.Math.FloatBetween(0.4, 0.8)
      );
      return true;
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this
    );
  }

  collectStar(
    ...args: Parameters<Phaser.Types.Physics.Arcade.ArcadePhysicsCallback>
  ) {
    args[1].destroy();

    this.score += 1;
    this.scoreText.setText(`Score:${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.createStars();
      this.bombs.createBomb();
    }
  }

  update() {
    this.player.update();

    // Connect light position to player's position
    this.light.setPosition(this.player.x, this.player.y);
  }
}
