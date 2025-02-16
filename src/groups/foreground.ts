import { BgLayers, CustomCursorKeys } from '@scenes/Game';
import { PlayerStates } from '@sprites/Player';

export class Foreground extends Phaser.GameObjects.Group {
  private layers: Phaser.GameObjects.TileSprite[];

  constructor(scene: Phaser.Scene) {
    super(scene, [], {});

    // x, y, width and height parameters for tileSprite
    const [x, y, w, h]: [number, number, number, number] = [
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 200,
      this.scene.scale.width,
      this.scene.scale.height + 70,
    ];

    this.layers = [this.scene.add.tileSprite(x, y, w, h, BgLayers.NINE)];

    this.addMultiple(this.layers);
    this.scaleXY(0.5, 0.5);
  }

  update(cursor: CustomCursorKeys) {
    if (this.scene.registry.get('playerState') === PlayerStates.IMMOVABLE) {
      return;
    }

    if (cursor.left.isDown) {
      this.layers[0].tilePositionX -=
        this.scene.registry.get('backgroundVelocityX') * 1.15;
    } else if (cursor.right.isDown) {
      this.layers[0].tilePositionX +=
        this.scene.registry.get('backgroundVelocityX') * 1.15;
    }
  }
}
