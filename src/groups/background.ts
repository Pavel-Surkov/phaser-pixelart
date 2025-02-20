import { BgLayers, RegistryKeys } from '@constants/game';
import { PlayerStates } from '@constants/player';

export class Background extends Phaser.GameObjects.Group {
  private spriteLayers: Phaser.GameObjects.TileSprite[];

  constructor(scene: Phaser.Scene) {
    super(scene);

    // x, y, width and height parameters for tileSprite
    const [x, y, w, h]: [number, number, number, number] = [
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 230,
      this.scene.scale.width,
      this.scene.scale.height + 70,
    ];

    this.spriteLayers = [
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

    this.addMultiple(this.spriteLayers);
    this.scaleXY(0.6, 0.6);

    // TODO: Replace registry for all values that can only be used for the Game scene
    this.scene.data.set('firstBgLightDeltaX', 0.03);
    this.scene.data.set('secondBgLightDeltaX', 0.05);

    this.scene.events.on('update', this.updateLightsPosition, this);
    this.scene.events.on('updateWorldCoordX', this.updatePosition, this);
  }

  updateLightsPosition() {
    // Light layers have delta because these tiles are moving even if world coord doesn't change
    this.spriteLayers[4].tilePositionX += this.scene.data.get('firstBgLightDeltaX');
    this.spriteLayers[7].tilePositionX += this.scene.data.get('secondBgLightDeltaX');
  }

  updatePosition(isDeltaPositive: boolean) {
    if (this.scene.registry.get(RegistryKeys.PLAYER_STATE) === PlayerStates.IMMOVABLE) {
      return;
    }

    if (isDeltaPositive) {
      this.spriteLayers[2].tilePositionX -= 0.66;
      this.spriteLayers[3].tilePositionX -= 0.54;
      this.spriteLayers[5].tilePositionX -= 0.36;
      this.spriteLayers[6].tilePositionX -= 0.24;
      this.spriteLayers[8].tilePositionX -= 0.12;
      this.spriteLayers[9].tilePositionX -= 0.06;

      // Light
      this.spriteLayers[4].tilePositionX -= 0.42;
      this.spriteLayers[7].tilePositionX -= 0.12;
    } else {
      this.spriteLayers[2].tilePositionX += 0.66;
      this.spriteLayers[3].tilePositionX += 0.54;
      this.spriteLayers[5].tilePositionX += 0.36;
      this.spriteLayers[6].tilePositionX += 0.24;
      this.spriteLayers[8].tilePositionX += 0.12;
      this.spriteLayers[9].tilePositionX += 0.06;

      // Light
      this.spriteLayers[4].tilePositionX += 0.42;
      this.spriteLayers[7].tilePositionX += 0.12;
    }
  }
}
