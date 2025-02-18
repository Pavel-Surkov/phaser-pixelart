import { BgLayers, RegistryKeys } from '@constants/game';
import { PlayerStates } from '@constants/player';

export class Background extends Phaser.GameObjects.Group {
  private layers: Phaser.GameObjects.TileSprite[];

  constructor(scene: Phaser.Scene) {
    super(scene);

    // x, y, width and height parameters for tileSprite
    const [x, y, w, h]: [number, number, number, number] = [
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 230,
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
    this.scaleXY(0.6, 0.6);

    this.scene.data.set('firstBgLightDeltaX', 0);
    this.scene.data.set('secondBgLightDeltaX', 0);

    this.scene.events.on('updateWorldCoordX', this.updatePosition, this);
  }

  updatePosition() {
    this.scene.data.inc('firstBgLightDeltaX', 0.03);
    this.scene.data.inc('secondBgLightDeltaX', 0.05);

    if (
      this.scene.registry.get(RegistryKeys.PLAYER_STATE) ===
      PlayerStates.IMMOVABLE
    ) {
      return;
    }

    const currentWorldCoordX = this.scene.registry.get(
      RegistryKeys.WORLD_COORD_X
    );

    // Light layers have delta because these tiles are moving even if world coord doesn't change
    this.layers[4].tilePositionX =
      currentWorldCoordX * 0.2 + this.scene.data.get('firstBgLightDeltaX');
    this.layers[7].tilePositionX =
      currentWorldCoordX * 0.7 + this.scene.data.get('secondBgLightDeltaX');

    this.layers[3].tilePositionX = currentWorldCoordX * 0.1;
    this.layers[5].tilePositionX = currentWorldCoordX * 0.4;
    this.layers[6].tilePositionX = currentWorldCoordX * 0.6;
    this.layers[8].tilePositionX = currentWorldCoordX * 0.8;
    this.layers[9].tilePositionX = currentWorldCoordX * 0.9;
    this.layers[10].tilePositionX = currentWorldCoordX;
  }
}
