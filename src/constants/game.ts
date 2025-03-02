// How many floor panels exists. Needs for calculating maximum delta x for enemies relative to Scene center
// Floor panel width is equal to Scene width

export const MAX_FLOOR_PANELS = 2;
export const KEYBOARD_SPRITE_KEY = 'keyboard_keys';
export const MIN_SCREEN_WIDTH = 1200;

export enum SceneKeys {
  GAME = 'game',
  TUTORIAL = 'tutorial',
  PRELOAD = 'preload',
  GAME_OVER = 'gameOver',
}

export enum RegistryKeys {
  WORLD_COORD_X = 'worldCoordinateX',
  GAME_OVER = 'gameOver',
}

export enum BgLayers {
  ZERO = 'background_0',
  ONE = 'background_1',
  TWO = 'background_2',
  THREE = 'background_3',
  FOUR = 'background_4',
  FIVE = 'background_5',
  SIX = 'background_6',
  SEVEN = 'background_7',
  EIGHT = 'background_8',
  NINE = 'background_9',
  LIGHT_ONE = 'background_lights_1',
  LIGHT_TWO = 'background_lights_2',
}

export enum GlobalEvents {
  SCORE_INC = 'score_inc',
  GAME_OVER = 'game_over',
}
