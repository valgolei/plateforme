namespace SpriteKind {
    export const coin = SpriteKind.create()
}
info.onScore(10, function () {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.setScore(0)
    info.changeLifeBy(1)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (héros.isHittingTile(CollisionDirection.Bottom)) {
        héros.vy = -200
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
})
function création_enemie () {
    for (let valeur of tiles.getTilesByType(assets.tile`portail`)) {
        enemie_normal = sprites.create(img`
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . 2 2 f f f f 2 2 . . . . 
            . . . f f f f f f f f f f . . . 
            . . f f f 5 f f f f 5 f f f . . 
            . f f f f f f f f f f f f f f . 
            . f f f f f f f f f f f f f f . 
            8 5 5 5 5 5 5 5 5 5 5 5 5 5 5 8 
            . 8 f f f f f f f f f f f f 8 . 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            8 f f f f f f f f f f f f f f 8 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            8 f f f f f f f f f f f f f f 8 
            . 8 5 5 5 5 5 5 5 5 5 5 5 5 8 . 
            8 f f f f f f f f f f f f f f 8 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            f 8 f f f f f f f f f f f f 8 f 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(enemie_normal, valeur)
        tiles.setTileAt(valeur, assets.tile`transparency16`)
        enemie_normal.ay = 500
        if (randint(0, 1) == 1) {
            enemie_normal.vx = -40
        } else {
            enemie_normal.vx = 40
        }
    }
    for (let valeur of tiles.getTilesByType(assets.tile`myTile2`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . 5 5 5 5 5 5 . . . . . 
            . . . . 5 5 5 . . . 5 5 . . . . 
            . . . . 5 5 . 5 5 5 5 5 . . . . 
            . . . 5 5 5 . 5 5 5 5 5 5 . . . 
            . . . 5 5 5 . 5 5 5 5 5 5 . . . 
            . . . . 5 5 . 5 5 5 5 5 . . . . 
            . . . . 5 5 5 . . . 5 5 . . . . 
            . . . . . 5 5 5 5 5 5 . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.coin)
        tiles.placeOnTile(coin, valeur)
        tiles.setTileAt(valeur, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y < otherSprite.top) {
        sprites.destroy(otherSprite)
        héros.vy = -100
        info.changeScoreBy(1)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    } else {
        if (info.life() == 1) {
            sprites.destroy(héros)
        }
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
        info.changeLifeBy(-1)
        animation.runImageAnimation(
        héros,
        [img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f 2 2 2 2 2 2 f f f . . 
            . . f f 2 2 2 2 2 2 2 2 2 f . . 
            . . f 2 2 f f f f f f 2 2 f . . 
            . . f f f f 2 2 2 2 f f f f . . 
            . f f 2 f 2 f 2 2 f 2 f 2 f f . 
            . f 2 2 2 2 f 2 2 f 2 2 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f 2 2 2 2 2 2 f f f . . 
            . . f f 2 2 2 2 2 2 2 2 2 f . . 
            . . f 2 2 f f f f f f 2 2 f . . 
            . . f f f f 2 2 2 2 f f f f . . 
            . f f 2 f 2 f 2 2 f 2 f 2 f f . 
            . f 2 2 2 2 f 2 2 f 2 2 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f 2 2 2 2 2 2 f f f . . 
            . . f f 2 2 2 2 2 2 2 2 2 f . . 
            . . f 2 2 f f f f f f 2 2 f . . 
            . . f f f f 2 2 2 2 f f f f . . 
            . f f 2 f 2 f 2 2 f 2 f 2 f f . 
            . f 2 2 2 2 f 2 2 f 2 2 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f 2 2 2 2 2 2 f f f . . 
            . . f f 2 2 2 2 2 2 2 2 2 f . . 
            . . f 2 2 f f f f f f 2 2 f . . 
            . . f f f f 2 2 2 2 f f f f . . 
            . f f 2 f 2 f 2 2 f 2 f 2 f f . 
            . f 2 2 2 2 f 2 2 f 2 2 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . 2 2 f 2 2 2 2 2 2 f 2 2 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `],
        100,
        false
        )
        pause(800)
    }
})
let coin: Sprite = null
let enemie_normal: Sprite = null
let héros: Sprite = null
scene.setBackgroundColor(9)
héros = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`niveau2`)
tiles.placeOnTile(héros, tiles.getTileLocation(0, 8))
scene.cameraFollowSprite(héros)
controller.moveSprite(héros, 100, 0)
héros.ay = 500
info.setLife(3)
création_enemie()
game.onUpdate(function () {
    for (let enemie_normal2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (enemie_normal2.isHittingTile(CollisionDirection.Left)) {
            enemie_normal2.vx = randint(30, 50)
        }
        if (enemie_normal2.isHittingTile(CollisionDirection.Right)) {
            enemie_normal2.vx = randint(-30, -50)
        }
    }
})
forever(function () {
    if (héros.tileKindAt(TileDirection.Center, assets.tile`myTile1`)) {
        game.gameOver(false)
    }
    if (héros.tileKindAt(TileDirection.Center, sprites.dungeon.stairNorth)) {
        game.gameOver(true)
    }
})
