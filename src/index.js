import 'phaser'
import BootScene from './Scenes/BootScene'
import ClickStart from './Scenes/ClickStart'
import TitleScene from './Scenes/TitleScene'
import GameScene from './Scenes/GameScene'

const config = {
  type: Phaser.WEBGL,
  parent: 'content',
  width: 480,
  height: 270,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 800}
    }
  },
  scene: [
    BootScene,
    ClickStart,
    TitleScene,
    GameScene
  ]
}

const game = new Phaser.Game(config)