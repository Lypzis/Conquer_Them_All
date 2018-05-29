/*
class UnityAnimations {
    // named parameters so it's easy to identify when creating instance of this
    constructor({ x = 0, y = 0, scale = 1, priority = 8, speed = 1, spriter = null }) {
      // store a reference to the spriter instance
      this.spriter = spriter
      // just storing the name, for referencing purpose
      this.name = spriter.entity.name
      // make sure we don't turn the unit upside down
      spriter.scale.set(scale, Math.abs(scale))
  
      // store starting position and scale, so we can restore them back to their original
      this.sx = x
      this.sy = y
      this.sscale = scale
  
      // keep track of where it is in the priority queue
      this.priority = priority
      // modifier that updates the priority of each unit after every scene
      this.speed = speed
  
      this.createPortrait()
    }
  
    createPortrait() {
      let spriter = this.spriter
  
      // create a bordered portrait
      // image head pulled from the spritesheet
      let portrait = game.add.image(0, 0, spriter.entity.name, 'head')
      let border = game.add.graphics(0, 0)
      border.lineStyle(10, 0xffffff)
      border.drawRect(0, 0, portrait.width, portrait.height)
      portrait.addChild(border)
      // scale down
      portrait.width = 70
      portrait.height = 70
  
      // we want to show their priority number
      // style the text with a translucent background fill
      let style = { font: "20px Arial", fill: "#ffffff", backgroundColor: "rgba(0, 0, 0, 0.8)" }
      let text = game.add.text(0, 0, this.priority, style)
      // don't scale with the portrait
      text.setScaleMinMax(1, 1);
      // and show it to the top left
      text.anchor.set(0)
      portrait.addChild(text)
  
      // storing references
      portrait.text = text
      this.portrait = portrait
    }
  
    attack() {
      let spriter = this.spriter
  
      // almost double up their size
      spriter.scale.x *= 1.75
      spriter.scale.y *= 1.75
      // start on the center of the game, offset (and some) by the width of the attacker
      spriter.x = game.world.centerX - spriter.width - 100
      // play a quick animation
      spriter.setAnimationSpeedPercent(200 / ANIM_SPEED)
      spriter.playAnimationByName('ATTACK')
    }
  
    hurt(blood) {
      let spriter = this.spriter
  
      // almost double up their size
      // note that we are not setting them, but instead multiplying them to the existing value
      spriter.scale.x *= 1.75
      spriter.scale.y *= 1.75
      // start on the center of the game, offset (and some) by the width of the attacker
      spriter.x = game.world.centerX - spriter.width - 100
  
      // wait for a bit for the attacker's ATTACK animation to play out a bit
      game.time.events.add(300 * ANIM_SPEED, () => {
        // and just about time the attack animation lands it's blow
        // we play the target's HURT animation
        spriter.setAnimationSpeedPercent(200 / ANIM_SPEED)
        spriter.playAnimationByName('HURT')
        // shake the camera
        game.juicy.shake(15)
  
        // using the spriter's position
        // we can more or less center the blood effect at the unit's body
        let x = spriter.x;
        let y = spriter.y
        blood.position.set(x, y)
        // show the blood effect once
        blood.visible = true
        blood.play('blood', 15 / ANIM_SPEED, false)
      })
    }
  
    restartIntro(introx, delay) {
      let spriter = this.spriter
      // set the starting position, which is outside the game extents
      spriter.position.set(introx, this.sy)
      // just some numbers so depending on how fast the unit is moving
      // the animation speed is proportion
      spriter.setAnimationSpeedPercent((350 - (delay / 200) * 40) / ANIM_SPEED)
      spriter.playAnimationByName('RUN')
  
      // fixed moving duration for everyone during intro scene
      let tween = game.add.tween(spriter).to( {  x: this.sx }, 1000 * ANIM_SPEED, Phaser.Easing.Linear.None, true, delay)
      tween.onComplete.add(() => {
        // random animatino speed for idle
        // so they don't move altogether the same on the game else they'll look funny
        spriter.setAnimationSpeedPercent(game.rnd.between(30, 70))
        spriter.playAnimationByName('IDLE')
      })
    }
  
    restoreOriginal() {
      let spriter = this.spriter
      // using the starting position and scale we stored in the constructor
      // we use them to restore the units back to their original position and size
      let duration = 300 * ANIM_SPEED
      game.add.tween(spriter).to( {  x: this.sx }, duration, Phaser.Easing.Linear.None, true)
      game.add.tween(spriter.scale).to( {  x: this.sscale, y: Math.abs(this.sscale) }, duration, Phaser.Easing.Linear.None, true)
  
      spriter.setAnimationSpeedPercent(game.rnd.between(30, 70))
      spriter.playAnimationByName('IDLE')
    }
  }
  */