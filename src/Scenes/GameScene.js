export default class GameScene extends Phaser.Scene {
  constructor (config) {
    super({
      key: 'GameScene'
    })
  }

  preload () {

  }

  create () {
    this.add.bitmapText(20, 20, 'font', 'start coding!')
  }

  clearKeys () {

  }
}