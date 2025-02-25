import { BgLayers } from '@constants/game';
import { EyeSprites, GoblinSprites, MushroomSprites, SkeletonSprites } from '@constants/enemies';
import { PlayerSprites } from '@constants/player';

export function loadAssets(scene: Phaser.Scene) {
  const { load } = scene;

  load.setPath('assets');

  // Load audio
  load.audio('loop', '/audio/loop.ogg');

  // Load fonts
  load.font('silver', '/fonts/Silver.woff2', 'woff2');

  // Load background assets
  load.image(BgLayers.ZERO, '/background/Layer_0011_0.png');
  load.image(BgLayers.ONE, '/background/Layer_0010_1.png');
  load.image(BgLayers.TWO, '/background/Layer_0009_2.png');
  load.image(BgLayers.THREE, '/background/Layer_0008_3.png');
  load.image(BgLayers.LIGHT_ONE, '/background/Layer_0007_Lights.png');
  load.image(BgLayers.FOUR, '/background/Layer_0006_4.png');
  load.image(BgLayers.FIVE, '/background/Layer_0005_5.png');
  load.image(BgLayers.LIGHT_TWO, '/background/Layer_0004_Lights.png');
  load.image(BgLayers.SIX, '/background/Layer_0003_6.png');
  load.image(BgLayers.SEVEN, '/background/Layer_0002_7.png');
  load.image(BgLayers.EIGHT, '/background/Layer_0001_8.png');
  load.image(BgLayers.NINE, '/background/Layer_0000_9.png');

  // Load Player sprites
  load.spritesheet(PlayerSprites.IDLE, '/witch/B_witch_idle.png', {
    frameWidth: 32,
    frameHeight: 48,
  });
  load.spritesheet(PlayerSprites.RUN, '/witch/B_witch_run.png', {
    frameWidth: 32,
    frameHeight: 48,
  });
  load.spritesheet(PlayerSprites.CHARGE, '/witch/B_witch_charge.png', {
    frameWidth: 48,
    frameHeight: 48,
  });
  load.spritesheet(PlayerSprites.ATTACK, '/witch/B_witch_attack.png', {
    frameWidth: 104,
    frameHeight: 46,
  });
  load.spritesheet(PlayerSprites.DEATH, '/witch/B_witch_death.png', {
    frameWidth: 32,
    frameHeight: 32,
  });
  // load.spritesheet(PlayerSprites.ICON, '/witch/B_witch_icon.webp', {
  //   frameWidth: 50,
  //   frameHeight: 50,
  // });

  // Load Enemy sprites
  load.spritesheet(GoblinSprites.IDLE, '/enemies/goblin/Idle.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(GoblinSprites.RUN, '/enemies/goblin/Run.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(GoblinSprites.ATTACK, '/enemies/goblin/Attack.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(GoblinSprites.DEATH, '/enemies/goblin/Death.png', {
    frameWidth: 150,
    frameHeight: 150,
  });

  load.spritesheet(SkeletonSprites.IDLE, '/enemies/skeleton/Idle.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(SkeletonSprites.RUN, '/enemies/skeleton/Walk.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(SkeletonSprites.ATTACK, '/enemies/skeleton/Attack.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(SkeletonSprites.DEATH, '/enemies/skeleton/Death.png', {
    frameWidth: 150,
    frameHeight: 150,
  });

  load.spritesheet(MushroomSprites.IDLE, '/enemies/mushroom/Idle.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(MushroomSprites.RUN, '/enemies/mushroom/Run.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(MushroomSprites.ATTACK, '/enemies/mushroom/Attack.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(MushroomSprites.DEATH, '/enemies/mushroom/Death.png', {
    frameWidth: 150,
    frameHeight: 150,
  });

  load.spritesheet(EyeSprites.RUN, '/enemies/flying-eye/Flight.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(EyeSprites.ATTACK, '/enemies/flying-eye/Attack.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  load.spritesheet(EyeSprites.DEATH, '/enemies/flying-eye/Death.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
}
