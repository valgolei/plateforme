namespace SpriteKind {
    export const coin = SpriteKind.create()
    export const piques = SpriteKind.create()
    export const énemie_invincible = SpriteKind.create()
    export const StatusBar = SpriteKind.create()
}
function appel_destruction_enemies () {
    for (let enemie_normal2 of sprites.allOfKind(SpriteKind.Enemy)) {
        sprites.destroy(enemie_normal2)
    }
    for (let coin of sprites.allOfKind(SpriteKind.coin)) {
        sprites.destroy(coin)
    }
    for (let spike of sprites.allOfKind(SpriteKind.piques)) {
        sprites.destroy(spike)
    }
    for (let énemie_casqué2 of sprites.allOfKind(SpriteKind.énemie_invincible)) {
        sprites.destroy(énemie_casqué2)
    }
}
info.onScore(10, function () {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.setScore(0)
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.piques, function (sprite, otherSprite) {
    if (invincibilité == 0) {
        info.changeLifeBy(-1)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
        touché()
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (héros.isHittingTile(CollisionDirection.Bottom)) {
        héros.vy = -200
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.énemie_invincible, function (sprite, otherSprite) {
    if (invincibilité == 0) {
        if (info.life() == 1) {
            sprites.destroy(héros)
        }
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
        info.changeLifeBy(-1)
        touché()
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
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            . 8 f f f f f f f f f f f f 8 . 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            . f f f f f f f f f f f f f f . 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            . f f f f f f f f f f f f f f . 
            . 8 5 5 5 5 5 5 5 5 5 5 5 5 8 . 
            . f f f f f f f f f f f f f f . 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
            . 8 f f f f f f f f f f f f 8 . 
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
        animation.runImageAnimation(
        coin,
        [img`
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
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        300,
        true
        )
    }
    for (let valeur of tiles.getTilesByType(assets.tile`myTile1`)) {
        spike = sprites.create(img`
            . f . . . f . . . f . . . f . . 
            f f f . f f f . f f f . f f f . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            . f . . . f . . . f . . . f . . 
            f f f f f f f f f f f f f f f f 
            d d d d d d d d d d d d d d d d 
            f f f f f f f f f f f f f f f f 
            `, SpriteKind.piques)
        tiles.placeOnTile(spike, valeur)
        tiles.setTileAt(valeur, assets.tile`transparency16`)
    }
    for (let valeur of tiles.getTilesByType(assets.tile`myTile5`)) {
        énemie_casqué = sprites.create(img`
            . . . f . . f . . f . . f . . . 
            . . . f b b f b b f b b f . . . 
            . . b b b b b b b b b b b b . . 
            . b b b b 2 b b b b 2 b b b b . 
            . b b b b b b b b b b b b b b . 
            . . f f f f f f f f f f f f . . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . f f f f f f f f f f f f f f . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . . f f f f f f f f f f f f . . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . f f f f f f f f f f f f f f . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . . f f f f f f f f f f f f . . 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
            . f f f f f f f f f f f f f f . 
            `, SpriteKind.énemie_invincible)
        tiles.placeOnTile(énemie_casqué, valeur)
        tiles.setTileAt(valeur, assets.tile`transparency16`)
        énemie_casqué.ay = 500
        if (randint(0, 1) == 1) {
            énemie_casqué.vx = -60
        } else {
            énemie_casqué.vx = 60
        }
    }
}
function touché () {
    invincibilité = 1
    animation.runImageAnimation(
    héros,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
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
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
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
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
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
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
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
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
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
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
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
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
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
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
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
    invincibilité = 0
}
function niveau_suivant () {
    appel_destruction_enemies()
    if (progression == 0) {
        scene.setBackgroundColor(9)
        tiles.setCurrentTilemap(tilemap`monde1-1`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 8))
    }
    if (progression == 1) {
        scene.setBackgroundColor(9)
        tiles.setCurrentTilemap(tilemap`monde1-2`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 8))
    }
    if (progression == 2) {
        scene.setBackgroundColor(9)
        tiles.setCurrentTilemap(tilemap`monde1-3`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 8))
    }
    if (progression == 3) {
        scene.setBackgroundColor(6)
        tiles.setCurrentTilemap(tilemap`monde2-1`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 13))
    }
    if (progression == 4) {
        scene.setBackgroundColor(6)
        tiles.setCurrentTilemap(tilemap`monde2-2`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 48))
    }
    if (progression == 5) {
        game.gameOver(true)
    }
    création_enemie()
    pause(500)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y < otherSprite.top) {
        sprites.destroy(otherSprite)
        héros.vy = -100
        info.changeScoreBy(1)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    } else {
        if (invincibilité == 0) {
            if (info.life() == 1) {
                sprites.destroy(héros)
            }
            music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
            info.changeLifeBy(-1)
            touché()
        }
    }
})
let énemie_casqué: Sprite = null
let spike: Sprite = null
let coin: Sprite = null
let enemie_normal: Sprite = null
let invincibilité = 0
let héros: Sprite = null
let progression = 0
progression = 4
héros = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . f f f f f f f f . . . . 
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
controller.moveSprite(héros, 100, 0)
héros.ay = 500
info.setLife(3)
scene.cameraFollowSprite(héros)
niveau_suivant()
game.onUpdate(function () {
    for (let enemie_normal2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (enemie_normal2.isHittingTile(CollisionDirection.Left)) {
            enemie_normal2.vx = randint(30, 50)
        }
        if (enemie_normal2.isHittingTile(CollisionDirection.Right)) {
            enemie_normal2.vx = randint(-30, -50)
        }
        if (enemie_normal2.vx == 0) {
            enemie_normal2.vx = randint(-30, -50)
        }
    }
    for (let énemie_casqué2 of sprites.allOfKind(SpriteKind.énemie_invincible)) {
        if (énemie_casqué2.isHittingTile(CollisionDirection.Left)) {
            énemie_casqué2.vx = randint(50, 70)
        }
        if (énemie_casqué2.isHittingTile(CollisionDirection.Right)) {
            énemie_casqué2.vx = randint(-50, -70)
        }
        if (énemie_casqué2.vx == 0) {
            énemie_casqué2.vx = randint(-50, -70)
        }
    }
})
forever(function () {
    if (héros.tileKindAt(TileDirection.Center, sprites.dungeon.stairNorth) || héros.tileKindAt(TileDirection.Center, sprites.dungeon.stairLarge)) {
        progression += 1
        niveau_suivant()
    }
    if (héros.tileKindAt(TileDirection.Center, assets.tile`myTile6`)) {
        héros.vy = -300
    }
    if (héros.tileKindAt(TileDirection.Center, sprites.dungeon.hazardLava1)) {
        game.gameOver(false)
    }
})
