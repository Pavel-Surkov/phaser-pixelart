import { BgLayers } from '@scenes/Game';

export class Background extends Phaser.GameObjects.Group {
  private layers: Phaser.GameObjects.TileSprite[];

  constructor(scene: Phaser.Scene) {
    super(scene);

    // x, y, width and height parameters for tileSprite
    const [x, y, w, h]: [number, number, number, number] = [
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 200,
      this.scene.scale.width,
      this.scene.scale.height + 70,
    ];

    this.layers = [
      this.scene.add.tileSprite(x, y, w, h, BgLayers.ZERO),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.ONE),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.TWO),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.THREE),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.LIGHT_ONE),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.FOUR),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.FIVE),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.LIGHT_TWO),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.SIX),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.SEVEN),
      this.scene.add.tileSprite(x, y, w, h, BgLayers.EIGHT),
    ];

    this.addMultiple(this.layers);
    this.scaleXY(0.5, 0.5);
  }

  update(cursor: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (cursor.left.isDown) {
      this.layers[4].tilePositionX -=
        this.scene.registry.get('backgroundVelocityX') * 0.1;
      this.layers[5].tilePositionX -=
        this.scene.registry.get('backgroundVelocityX') * 0.4;
      this.layers[6].tilePositionX -=
        this.scene.registry.get('backgroundVelocityX') * 0.6;
      this.layers[7].tilePositionX -=
        this.scene.registry.get('backgroundVelocityX') * 0.7;
      this.layers[8].tilePositionX -=
        this.scene.registry.get('backgroundVelocityX') * 0.8;
      this.layers[9].tilePositionX -=
        this.scene.registry.get('backgroundVelocityX') * 0.9;
      this.layers[10].tilePositionX -= this.scene.registry.get(
        'backgroundVelocityX'
      );
    } else if (cursor.right.isDown) {
      this.layers[4].tilePositionX +=
        this.scene.registry.get('backgroundVelocityX') * 0.1;
      this.layers[5].tilePositionX +=
        this.scene.registry.get('backgroundVelocityX') * 0.4;
      this.layers[6].tilePositionX +=
        this.scene.registry.get('backgroundVelocityX') * 0.6;
      this.layers[7].tilePositionX +=
        this.scene.registry.get('backgroundVelocityX') * 0.7;
      this.layers[8].tilePositionX +=
        this.scene.registry.get('backgroundVelocityX') * 0.8;
      this.layers[9].tilePositionX +=
        this.scene.registry.get('backgroundVelocityX') * 0.9;
      this.layers[10].tilePositionX += this.scene.registry.get(
        'backgroundVelocityX'
      );
    }
  }
}
