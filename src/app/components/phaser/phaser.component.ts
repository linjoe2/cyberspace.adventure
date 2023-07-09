import { Component, OnInit } from '@angular/core';
import { thrasos } from 'blockly';
import Phaser from 'phaser';

@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
  styleUrls: ['./phaser.component.css']
})

export class PhaserComponent  implements OnInit {
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;  constructor() {
    this.config = {
      type: Phaser.AUTO,
        width: 512,
        height: 512,
        // Sets game scaling
        scale: {
            // Fit to window
            mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
            parent: 'gameContainer',
            // Center vertically and horizontally
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 },
          debug: true
        }
      }
    };
  }  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}




class MainScene extends Phaser.Scene 
  {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private fauna?: Phaser.Physics.Arcade.Sprite;

    constructor()
    {
      super()
    }
  
    preload()
  {
    // // load the PNG file
    this.load.image('base_tiles', 'assets/tilesets/TileMap_SF/tileset_sf.png')
    this.load.atlas("fauna", 'assets/character/fauna.png', 'assets/character/fauna.json')
    // // load the JSON file
    this.load.tilemapTiledJSON('tilemap', 'assets/tilemaps/level1.json')

    this.cursors = this.input.keyboard?.createCursorKeys();
  }
  
  create()
  {
    // create the Tilemap
    // this.add.image(0, 0, 'base_tiles')
 
    const map = this.make.tilemap({ key: 'tilemap' })

    // add the tileset image we are using
    const tileset = map.addTilesetImage('tileset_sf', 'base_tiles')|| ""
    
    // create the layers we want in the right order
    const belowLayer = map.createLayer("ground", tileset, 0, 0);
  
    // "Ground" layer will be on top of "Background" layer
    const worldLayer = map.createLayer("walls", tileset, 0, 0);

    this.fauna = this.physics.add.sprite(246,346, "fauna", "run-down-1.png")

    this.anims.create({
      key: "fauna-idle-down",
      frames: [{key:"fauna", frame: "walk-down-3.png"},]
    })

    this.anims.create({
      key: "fauna-idle-up",
      frames: [{key:"fauna", frame: "walk-up-3.png"},]
    })

    this.anims.create({
      key: "fauna-idle-side",
      frames: [{key:"fauna", frame: "walk-side-3.png"},]
    })

    this.anims.create({
      key: "fauna-run-down",
      frames: this.anims.generateFrameNames("fauna", {start: 1, end: 8, prefix: "run-down-" , suffix: ".png"}),
      repeat: -1,
      frameRate: 15
    })

    this.anims.create({
      key: "fauna-run-up",
      frames: this.anims.generateFrameNames("fauna", {start: 1, end: 8, prefix: "run-up-" , suffix: ".png"}),
      repeat: -1,
      frameRate: 15
    })

    this.anims.create({
      key: "fauna-run-side",
      frames: this.anims.generateFrameNames("fauna", {start: 1, end: 8, prefix: "run-side-" , suffix: ".png"}),
      repeat: -1,
      frameRate: 15
    })



    this.fauna.anims.play("fauna-idle-down")


    //colision detection
    worldLayer!.setCollisionByProperty({ colides: true})
    this.physics.add.collider(worldLayer!, this.fauna, ()=>{console.log('test')})
    // stay within boundaries of the playing world
    this.fauna.setCollideWorldBounds(true)
    // bounce on reaching end
    this.fauna.setBounce(1)
    

    // const objectsLayer = map.createLayer("Objects", tileset, 0, 0);



  }

  override update( t: number, dt: number)
  {
    if(!this.cursors || !this.fauna)
    {
      return
    }

    const speed = 100

    if(this.cursors.left?.isDown){
      this.fauna.anims.play("fauna-run-side", true)
      this.fauna.setVelocity(-speed, 0)
      this.fauna.scaleX = -1
      this.fauna.setOffset(32,0)
      // this.fauna.setX(this.fauna.x -5)
    } else if(this.cursors.right?.isDown){
      this.fauna.anims.play("fauna-run-side", true)
      this.fauna.setVelocity(speed, 0)
      this.fauna.scaleX = 1
      this.fauna.setOffset(0,0)
      // this.fauna.setX(this.fauna.x + 5)
    }else if(this.cursors.up?.isDown){
      this.fauna.anims.play("fauna-idle-up", true)
      this.fauna.setVelocity(0, -speed)
      // this.fauna.setY(this.fauna.y - 5)
    }else if(this.cursors.down?.isDown){
      this.fauna.anims.play("fauna-idle-down", true)
      this.fauna.setVelocity(0, speed)
      // this.fauna.setY(this.fauna.y + 5)
    }else {
      this.fauna.setVelocity(0, 0)
      this.fauna.anims.play("fauna-idle-down")
    }

  }

  
}
