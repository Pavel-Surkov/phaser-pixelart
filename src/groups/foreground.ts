import { BgLayers, RegistryKeys } from '@constants/game';

export class Foreground extends Phaser.GameObjects.Group {
  private spriteLayers: Phaser.GameObjects.TileSprite[];

  constructor(scene: Phaser.Scene) {
    super(scene);

    // x, y, width and height parameters for tileSprite
    const [x, y, w, h]: [number, number, number, number] = [
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 226,
      this.scene.scale.width,
      this.scene.scale.height + 70,
    ];

    this.spriteLayers = [this.scene.add.tileSprite(x, y, w, h, BgLayers.NINE)];

    this.addMultiple(this.spriteLayers);
    this.scaleXY(0.6, 0.6).setDepth(2);

    this.scene.events.on('updateWorldCoordX', this.updatePosition, this);
  }

  updatePosition() {
    this.spriteLayers[0].tilePositionX = this.scene.registry.get(RegistryKeys.WORLD_COORD_X) * 1.1;
  }
}
