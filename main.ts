namespace SpriteKind {
    export const coin = SpriteKind.create()
    export const piques = SpriteKind.create()
    export const énemie_invincible = SpriteKind.create()
    export const mur = SpriteKind.create()
    export const shuriken = SpriteKind.create()
    export const Boss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.piques, function (sprite, otherSprite) {
    if (invincibilité == 0) {
        info.changeLifeBy(-1)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
        touché()
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (progression > 6 && progression < 10) {
        héros.vy = -100
    } else {
        if (héros.isHittingTile(CollisionDirection.Bottom)) {
            héros.vy = -200
        }
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    sprites.destroy(Boss, effects.ashes, 2000)
    pause(2000)
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.énemie_invincible, function (sprite, otherSprite) {
    if (invincibilité == 0) {
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
        if (progression == 6) {
            tiles.setTileAt(valeur, sprites.dungeon.floorLight4)
        } else {
            tiles.setTileAt(valeur, assets.tile`transparency16`)
        }
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
    for (let valeur of tiles.getTilesByType(assets.tile`myTile7`)) {
        spike = sprites.create(img`
            f f f f f f f f f f f f f f f f 
            d d d d d d d d d d d d d d d d 
            f f f f f f f f f f f f f f f f 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . . f . . . f . . . f . . . f . 
            . f f f . f f f . f f f . f f f 
            . . f . . . f . . . f . . . f . 
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
        . . f 2 f 2 f 2 2 f 2 f 2 f . . 
        . . f 2 2 2 f 2 2 f 2 2 2 f . . 
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
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
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
        . . f 2 f 2 f 2 2 f 2 f 2 f . . 
        . . f 2 2 2 f 2 2 f 2 2 2 f . . 
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
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
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
        . . f 2 f 2 f 2 2 f 2 f 2 f . . 
        . . f 2 2 2 f 2 2 f 2 2 2 f . . 
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
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
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
        . . f 2 f 2 f 2 2 f 2 f 2 f . . 
        . . f 2 2 2 f 2 2 f 2 2 2 f . . 
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
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
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
info.onLifeZero(function () {
    if (progression < 11) {
        sprites.destroy(héros)
        game.setGameOverPlayable(false, music.melodyPlayable(music.sonar), false)
        progression = 20
        music.stopAllSounds()
        game.gameOver(false)
    } else {
        game.showLongText("game over", DialogLayout.Bottom)
        niveau_suivant()
        info.setLife(3)
        info.setScore(0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.mur, function (sprite, otherSprite) {
    if (invincibilité == 0) {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
        info.changeLifeBy(-1)
        touché()
    }
})
function niveau_suivant () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.coin)
    sprites.destroyAllSpritesOfKind(SpriteKind.piques)
    sprites.destroyAllSpritesOfKind(SpriteKind.énemie_invincible)
    if (progression == 0) {
        scene.setBackgroundColor(1)
        tiles.setCurrentTilemap(tilemap`monde0`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 8))
    }
    if (progression == 1) {
        info.setScore(0)
        info.setLife(3)
        scene.setBackgroundColor(9)
        tiles.setCurrentTilemap(tilemap`monde1-1`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 8))
    }
    if (progression == 2) {
        scene.setBackgroundColor(9)
        tiles.setCurrentTilemap(tilemap`monde1-2`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 8))
    }
    if (progression == 3) {
        scene.setBackgroundColor(9)
        tiles.setCurrentTilemap(tilemap`monde1-3`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 8))
    }
    if (progression == 4) {
        music.stopAllSounds()
        scene.setBackgroundColor(6)
        tiles.setCurrentTilemap(tilemap`monde2-1`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 13))
    }
    if (progression == 5) {
        scene.setBackgroundColor(6)
        tiles.setCurrentTilemap(tilemap`monde2-2`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 48))
    }
    if (progression == 6) {
        scene.setBackgroundColor(6)
        tiles.setCurrentTilemap(tilemap`monde2-3`)
        grand_mur = sprites.create(img`
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......f.
            `, SpriteKind.mur)
        tiles.placeOnTile(grand_mur, tiles.getTileLocation(-10, 3))
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 8))
        grand_mur.vx = 30
        création_enemie()
        game.showLongText("Attention, un mur armé de piques avance en même temps que vous dans ce niveau", DialogLayout.Bottom)
    }
    if (progression == 7) {
        scene.setBackgroundColor(8)
        tiles.setCurrentTilemap(tilemap`monde3-1`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 16))
        création_enemie()
        héros.ay = 200
        game.showLongText("Vous allez maintenant évoluer dans un monde aquatique dans lequel vous pouvez nager", DialogLayout.Bottom)
    }
    if (progression == 8) {
        scene.setBackgroundColor(8)
        tiles.setCurrentTilemap(tilemap`monde3-2`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 9))
    }
    if (progression == 9) {
        scene.setBackgroundColor(8)
        tiles.setCurrentTilemap(tilemap`monde3-3`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 38))
        héros.ay = 200
    }
    if (progression == 10) {
        scene.setBackgroundColor(2)
        tiles.setCurrentTilemap(tilemap`Boss`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 18))
        héros.ay = 500
        game.showLongText("vous arrivez au boss", DialogLayout.Bottom)
        Boss = sprites.create(img`
            ....................555555555555555555555555....................
            ....................555555555555555555555555....................
            ..............555555555555555555555555555555555555..............
            ..............555555555555555555555555555555555555..............
            ..............555555555555555555555555555555555555..............
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            5555555555555555555555555555555555555555555555555555555555555555
            2222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222
            4444444444444444444444444fffff7777fffff4444444444444444444444444
            4444444444444444444444444fffff7777fffff4444444444444444444444444
            4444444444444444444444444fffff7777fffff4444444444444444444444444
            4444444444444444444444444fffff7777fffff4444444444444444444444444
            4444444444444444444444444fffff7777fffff4444444444444444444444444
            7777777777777777777744444777777777777774444477777777777777777777
            7777777777777777777744444777777777777774444477777777777777777777
            7777777777777777777744444777777777777774444477777777777777777777
            7777777777777777777744444777777777777774444477777777777777777777
            7777777777777777777777777777777777777774444477777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777fffff77777777777777fffff77777777777777777777
            77777777777777777777fffff77777777777777fffff77777777777777777777
            77777777777777777777fffff77777777777777fffff77777777777777777777
            77777777777777777777fffff77777777777777fffff77777777777777777777
            77777777777777777777fffff77777777777777fffff77777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            77777777777777777777dddddddddddddddddddddddd77777777777777777777
            77777777777777777777dddddddddddddddddddddddd77777777777777777777
            77777777777777777777dddddddddddddddddddddddd77777777777777777777
            77777777777777777777dddddddddddddddddddddddd77777777777777777777
            77777777777777777777dddddddddddddddddddddddd77777777777777777777
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            9999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            8888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ..............fffffffffffffffeeeeefffffffffffffff...............
            ..............fffffffffffffffeeeeefffffffffffffff...............
            ..............fffffffffffffffeeeeefffffffffffffff...............
            ..............fffffffffffffffeeeeefffffffffffffff...............
            ..............fffffffffffffffeeeeefffffffffffffff...............
            ..............fffffffffffffffffffffffffffffffffff...............
            ..............fffffffffffffffffffffffffffffffffff...............
            ..............fffffffffffffffffffffffffffffffffff...............
            ..............fffffffffffffffffffffffffffffffffff...............
            ..............fffffffffffffffffffffffffffffffffff...............
            ...................fffff...............fffff....................
            ...................fffff...............fffff....................
            ...................fffff...............fffff....................
            `, SpriteKind.Boss)
        tiles.placeOnTile(Boss, tiles.getTileLocation(21, 12))
        Boss.ay = 500
        statusbar = statusbars.create(10, 4, StatusBarKind.Health)
        statusbar.setPosition(13, 15)
        statusbar.setColor(7, 15)
        scene.cameraFollowSprite(Boss)
        pause(1000)
        scene.cameraFollowSprite(héros)
    }
    if (progression == 11) {
        scene.setBackgroundColor(13)
        tiles.setCurrentTilemap(tilemap`tuto1`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 9))
        pause(100)
        game.showLongText("bienvenu dans le tutoriel !", DialogLayout.Bottom)
        game.showLongText("je vais t'enseigner tous les points clés de ce jeu", DialogLayout.Bottom)
        game.showLongText("c'est parti !", DialogLayout.Bottom)
        game.showLongText("essaye de sauter de tuiles en tuiles pour atteindre l'escalier en bas à droite", DialogLayout.Bottom)
    }
    if (progression == 12) {
        scene.setBackgroundColor(13)
        tiles.setCurrentTilemap(tilemap`tuto2`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 8))
        pause(100)
        game.showLongText("tu peux attraper les pièces", DialogLayout.Bottom)
        game.showLongText("elles augmentent ton score et permettent de gagner une vie quand tu en as 10", DialogLayout.Bottom)
    }
    if (progression == 13) {
        scene.setBackgroundColor(13)
        tiles.setCurrentTilemap(tilemap`tuto3`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 9))
        pause(100)
        game.showLongText("il va maintenant y avoir des enemis", DialogLayout.Bottom)
        game.showLongText("il est possible de tuer les enemis jaunes en leur sautant dessus ", DialogLayout.Bottom)
    }
    if (progression == 14) {
        scene.setBackgroundColor(13)
        tiles.setCurrentTilemap(tilemap`tuto4`)
        tiles.placeOnTile(héros, tiles.getTileLocation(0, 9))
        pause(100)
        game.showLongText("en revanche, il est impossible de tuer les enemis rouges", DialogLayout.Bottom)
    }
    if (progression == 15) {
        scene.setBackgroundColor(13)
        tiles.setCurrentTilemap(tilemap`niveau18`)
        tiles.placeOnTile(héros, tiles.getTileLocation(1, 14))
        pause(100)
        game.showLongText("tu peux aussi rencontrer des trampolines, ils te permettrons de sauter plus haut", DialogLayout.Bottom)
        game.showLongText("mais attentions au piques qui te blessent", DialogLayout.Bottom)
    }
    if (progression == 16) {
        game.showLongText("bien joué, tu as terminé le tutoriel !", DialogLayout.Bottom)
        progression = 0
        info.setScore(0)
        info.setLife(3)
        niveau_suivant()
    }
    création_enemie()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y < otherSprite.top) {
        sprites.destroy(otherSprite)
        héros.vy = -100
        info.changeScoreBy(1)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    } else {
        if (invincibilité == 0) {
            music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
            info.changeLifeBy(-1)
            touché()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.shuriken, function (sprite, otherSprite) {
    if (invincibilité == 0) {
        sprites.destroy(otherSprite)
        info.changeLifeBy(-1)
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
        touché()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (sprite.y < otherSprite.top) {
        héros.vy = -200
        statusbar.value += -20
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        pause(200)
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
let couteau: Sprite = null
let statusbar: StatusBarSprite = null
let grand_mur: Sprite = null
let énemie_casqué: Sprite = null
let spike: Sprite = null
let coin: Sprite = null
let enemie_normal: Sprite = null
let Boss: Sprite = null
let invincibilité = 0
let héros: Sprite = null
let progression = 0
let limitescore = 9
progression = 0
héros = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . f f f f f f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . . f e f b f 4 4 f b f e f . . 
    . . f e 4 1 f d d f 1 4 e f . . 
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
    for (let Boss of sprites.allOfKind(SpriteKind.Boss)) {
        if (Boss.isHittingTile(CollisionDirection.Left)) {
            Boss.vx = randint(30, 50)
        }
        if (Boss.isHittingTile(CollisionDirection.Right)) {
            Boss.vx = randint(-30, -50)
        }
        if (Boss.vx == 0) {
            Boss.vx = randint(-30, -50)
        }
    }
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
    if (info.score() > limitescore) {
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
        limitescore += 10
        info.changeLifeBy(1)
    }
})
game.onUpdateInterval(1000, function () {
    for (let valeur of sprites.allOfKind(SpriteKind.Boss)) {
        couteau = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . f . . . . . f f f f . . . 
            . . . f f f f . . . . . f . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.shuriken)
        animation.runImageAnimation(
        couteau,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . 2 . . . . . . . . 
            . . . . f . . d d 2 f f . . . . 
            . . . . f f 2 d d . . f . . . . 
            . . . . . . . . 2 . . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . . . . . . . . 
            . . . . . f . . . . f f . . . . 
            . . . . . . 2 . . 2 . . . . . . 
            . . . . . . . d d . . . . . . . 
            . . . . . . . d d . . . . . . . 
            . . . . . . 2 . . 2 . . . . . . 
            . . . . f f . . . . f . . . . . 
            . . . . . . . . . . f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        couteau.setPosition(Boss.x, Boss.y)
        couteau.follow(héros, 20)
    }
})
forever(function () {
    pauseUntil(() => progression == 1)
    while (progression < 4) {
        music.play(music.createSong(hex`00c8000408190200001c00010a006400f401640000040000000000000000000000000005000004e0040000080004191d202508000c0004181d20240c0010000416191e22100014000414191d201400180003121b1e18001c00041114191d1c002000040f14181b20004000040d11141940004c0004191d20254c00500004181d20245000540004191d20255400580004181d202458005c0004191d20255c006000041b202427600080000614191d20252980008c0005181e24272a8c00900005191d2225299000940005181e24272a9400980005191d22252998009c0005181e24272a9c00a000041922252aa000ac0006191d2025292cac00b000041d202529b000c000061114191d2025c000cc000714181b2024272acc00d0000714181b2024272ad000d4000714181b2024272ad400d8000714181b2024272ad800dc000614181d202429dc00e0000614181b202427e000f800070d1114191d2025f800000108080d1114191d2025000104010614181b2024270401080105111419202508010c01061114181d20240c011001050d16191e2210011401060d1114191d20140118010412181b1e18011c0106080d1114191d1c0120010314181b20014001040d11141940014401071114191d20252944014801071114191d20252948014c01071114191d2025294c015001071114191d20252950015401071114191d202529540158010320242758015c01031d20255c01600103202529600180010614192025292c80018c01051b1e24272a8c019001041d20252990019401041b20242794019801041d20252998019c01041e24272a9c01a001042025292ca001ac01071114191d202529ac01b001061114191d2025b001bc01051114191d20bc01c00105080d142025c001c4010614181b202427c401c8010614181b202427c801cc010614181b202427cc01d0010614181b202427d001d4010614181b202427d401d8010614181b202427d801dc010614191d202529dc01e0010614181b202427e001f801070d1114191d2025f8010002070d1114191d202500020402070d11141d2025290402080207080c0f1b20242708020c02070d1114191d20250c02100207080d11191d20251002140207080c0f181b202414021802070a0d1216191e2218021c0206080c0f1b20241c02200208060a0d1216191e222002240207080d1114191d202402280207060a0d16191e2228022c020705080d14191d202c02300207080c0f12181b1e3002340207080d1114191d203402380207080c0f12181b1e38023c0206080d1116191d3c02400207080c0f1216191e400244020705080d1114191d4402480206080c0f14181b48024c0206080d1114191d4c02500206080c0f14181b500254020605080d1114195402580206080c0f14181b58025c020605080d1114195c02600205080c0f12186002800205080d111419800284020416191d228402880204191d202588028c0204181b20248c02900204191d202590029402041d20252994029802042025292c98029c02041d2025299c02a00204191d2025a002a402041d202529a402a80204191d2025a802ac02041b202427ac02b00204181b2024b002b4020414181b20b402b802031e242ab802bc02031d2029bc02c002031b2027c002c4020614191d202529c402c8020614181b202427c802cc02061418191d2025cc02d00206181b1e24272ad002d4020614191d202529d402d8020614181b202427d802dc0206181b1e24272adc02e002060f14181b2024e00200030905080d1114191d202505001c000f0a006400f4010a0000040000000000000000000000000000000002460420002400011924002800011928002c0001142c003000011430003400011934003800011938003c0001143c004000011440004400011944004800011948004c0001144c005000011450005400011954005800011958005c0001145c006000011460006400012964006800012968006c0001206c007000012070007400012974007800012978007c0001207c008000012080008400012484008800012488008c00012a8c009000012a90009400012494009800012498009c00012a9c00a000012aa000a4000125a400a8000125a800ac00012cac00b000012cb000b4000125b400b8000125b800bc000120bc00c0000120c000c4000120c400c8000120c800cc000127cc00d0000127d000d4000120d400d8000120d800dc000127dc00e0000127e000e4000125e400e8000125e800ec000119ec00f0000119f000f4000125f400f8000125f800fc000119fc000001011900010401012704010801012708010c0101240c0110010124100114010120140118010120200124010219252401280102192528012c0101202c0130010120300134010219253401380102192538013c0101203c014001012040014401012944014801012948014c0101294c015001012950015401012954015801012058015c0101295c016001012060016401012564016801012568016c0101206c017001012070017401012574017801012578017c0101207c018001012080018401012a84018801012a88018c0101228c019001012590019401012794019801012598019c0101279c01a0010120a001a4010129a401a8010120a801ac010120ac01b0010119b001b401011bb401b8010120b801bc01011bbc01c0010120c001c4010127c401c8010127c801cc010120cc01d0010120d001d4010124d401d8010124d801dc010120dc01e0010120e001e401021925e401e801021925e801ec010120ec01f0010120f001f401021925f401f801021925f801fc010120fc010002012000020402012904020802012708020c0201250c021002012510021402012414021802012218021c0201241c022002012220022402012024022802012228022c0201202c023002011e30023402012034023802011e38023c02011d3c024002011e40024402011d44024802011b48024c02011d4c025002011b50025402011954025802011b58025c0201195c026002011860026402012564026802012568026c0201206c027002012070027402012574027802012578027c0201207c028002012080028402012284028802012588028c0201248c029002012590029402012994029802012c98029c0201299c02a0020125a002a4020129a402a8020125a802ac020127ac02b0020124b002b4020120b402b802012ab802bc020129bc02c0020127c002c4020129c402c8020127c802cc020125cc02d002012ad002d4020129d402d8020127d802dc02012adc02e0020124e002e4020125e402e8020125e802ec020119ec02f0020119f002f4020125f402f8020125f80200030119`), music.PlaybackMode.UntilDone)
    }
    while (progression < 7) {
        music.play(music.createSong(hex`00640004080c0700001c00010a006400f4016400000400000000000000000000000000050000042a00800098000116a000b8000116c000d8000116e000f800011600011801011620013801011840015801011602001c000c960064006d019001000478002c010000640032000000000a06000548000c00200001292c002e0001292e003000012a30003200012932003400012a34003600012936003800012a38003a0001293a003c00012a3c004000012948004a00012a4a006000012903001c0001dc00690000045e0100040000000000000000000005640001040003300000000400011e04000800011d20002400011e24002800011d40004400011e44004800011d60006400011e64006800011b05001c000f0a006400f4010a0000040000000000000000000000000000000002480098009c0001249c00a0000125b800bc00011dbc00c0000120d800dc000124dc00e0000129f800fc000120fc000001012018011c0101251c012001012738013c0101223c014001012006001c00010a006400f401640000040000000000000000000000000000000002710000000400031e222504000800031d222520002400031e222524002800031d222540004400031e222544004800031d2225800098000416191d22a000b8000416191d22c000d8000416191d22e000f8000416191d22000118010416191d2220013801060f12181b1e24400158010416191d2207001c00020a006400f401640000040000000000000000000000000000000003a90080009800050a16191d2298009c00031b1e249c00a000031e2225a000b800050a16191d22b800bc00041116191dbc00c0000414191d20c000d800050a16191d22d800dc00031b1e24dc00e00003222529e000f800050a16191d22f800fc0003191d20fc00000103191d2000011801050a16191d2218011c01031d22251c012001031e222720013801060f12181b1e2438013c0103191d223c01400103191d2040015801050a16191d2208001c000e050046006603320000040a002d0000006400140001320002010002480098009c0001249c00a0000125b800bc00011dbc00c0000120d800dc000124dc00e0000129f800fc000120fc000001012018011c0101251c012001012738013c0101223c0140010120`), music.PlaybackMode.UntilDone)
    }
    while (progression < 10) {
        music.play(music.createSong(hex`0064000408170100001c00010a006400f401640000040000000000000000000000000005000004aa0400000600030d1114060008000311141908000c000314181b0c0014000314191d14001800041114191d18001e00041114191d1e002000040d12161e2000240003191d2024002c000314181b2c003000030c0f1430003800030c0f1438003c000314191d3c00440003181b1e440048000412181b1e48004e000412181b1e4e0050000414181b205000540003191e2254005c000314191d5c006000030d111460006800030d111468007000060d1216191e2270007400040d12161974007a00040d1216197a007c0003181b207c0080000316191e8000880003191d2088008c00061114191d20258c009400061114191d202594009800061114191d20259800a000060c0f14202427a000a400070c0f1418202427a400aa00080c0f14181b202427aa00ac00061216191e2225ac00b000060f14181b2024b000b800060c0f14181b20b800bc00030c0f14bc00c800030c0f14c800d000030d1222d000d400040d121e22d400da00050d12191e22da00dc0003191e24dc00e00003191e25e000e8000614191d202529e800ec00061114191d2025ec00f400060d1114191d20f400f800061114191d2025f80000010614181b20242700010401070f14181b20242704010a01080c0f14181b2024270a010c010614191d2025290c0110010714181b2024272a100118010611141920252918011c010514192024271c012401060d11141d20252401280106080d111d202528013001060c0f121b202430013401060d11141d202534013c01060c0f142024273c01400105080d141920400148010614191d20252948014c0106191d2025292c4c015401061114191d202554015801070d1114191d202558016001060f14181b202460016401060c0f1220242a64016c0106080d112025296c01700106080c0f20242770017801060d11141d202578017c01030814207c01880105080d11141994019c0103060a0d9c01a001030a0d12a001a801030d1216a801ac01030d1218ac01b40103111419b401b801030d1114b801c00103080d11c001c40103080c0fc401cc0103060a0dcc01d001030a0d12d001d801030d1216d801dc01030d1218dc01e80105080d111419e801f001040c12181bf001f401050c0f12181bf401f80104080d111df801040205080c0f141b08021002050a0d12162210021402060a0d1216192214021a02070a0d1216191e221a021c02060d1114191d201c02200207060c0f12181b1e20022802070d1114191d202528022c0206080d111419202c023202041114191d32023402050c0f181b1e34023802050c0f141820380240020614181b20242740024402060f14181b202444024c02050f14181b204c02500203181b1e5002580205080d11191d58025c0204080d11195c02640204080d111464026802040d1114196802700204080c0f1b7002740205080c0f141b74027a0206080c0f14181b7a027c0206080d1114191d7c028002060c0f12181b1e80028802050d1114192088028c0206080d1114191d8c029402040d111419940298020605080d1114199802a00206080c0f14181ba002a40206080c0f14181ba402aa0206080c0f14181baa02ac020705080d1114191dac02b00206080c0f14181bb002b8020408111419b802bc020408111419bc02c8020605080d111419`), music.PlaybackMode.UntilDone)
    }
    while (progression == 10) {
        music.play(music.createSong(hex`00c8000408240200001c00010a006400f401640000040000000000000000000000000005000004b20200001800030d111618003000040a0d11163000480005050a0d11164800600006050a0d11161960007800030f141878009000040f14181b9000a800050f14181b20a800c000060f14181b2024c000d800030a0d12d800f000040a0d1216f0000801050a0d12161908012001060a0d1216191e2001380106080c0f14181b3801500106080c0f14181b5001680107080c0f14181b206801800108080c0f14181b2024800198010416191d229801b001071116191d222529b001c80106181b2024272cc801e001071216191e22252ae001f8010414181b20f801000202191d000208020211160802100202191d10021802021d2218022002021b202002280202181b28023002021b20300238020220243802400202191e400248020216194802500202191e5002580203191e2258026002021b206002680202181b68027002021b207002780202202478028002021b1e8002880202121688029002021b1e90029802021b229802a002021b20a002a80202181ba802b002021b20b002b802022024b802c00202191dc002c802021619c802d00202191dd002d802021d22d802e00202191de002e802021b20e802f00202181bf002f80202191d0003080302222508031003021d2210031803021b201803200302191d2003280302181b28033003021b203003380302191e380340030216194003480302222548035003021d2250035803021b205803600302191e6003680302181b68037003021b207003780302191e7803800302121680038803031d222588039003021d2290039803021b209803a00302191ea003a80302181ba803b003021b20b003b80302191eb803c003021619c003c80302191ec803d003021e22d003d803021b20d803e00302181be003e803021b20e803f00302181bf0030804020a1608042004040a0d161920043804060a0d1116191d3804600408050a0d1116191d2207001c00020a006400f401640000040000000000000000000000000000000003860400000800012208000c0001220c001000012410001400012514001800012418002000012220002400012224002800012428002c0001252c003000012430003800012238003c0001223c004000012440004400012544004800012448005000012250005400012254005800012458005c0001255c006000012460006800012068006c0001206c007000012470007400012574007800012478008000012080008400012084008800012488008c0001258c009000012490009800012098009c0001209c00a0000124a000a4000125a400a8000124a800b0000120b000b4000120b400b8000124b800bc000125bc00c0000124c000c800011ec800cc00011ecc00d0000124d000d4000125d400d8000124d800e000011ee000e400011ee400e8000124e800ec000125ec00f0000124f000f800011ef800fc00011efc000001012400010401012504010801012408011001011e10011401011e14011801012418011c0101251c012001012420012801012028012c0101202c013001012430013401012534013801012438014001012040014401012044014801012448014c0101254c015001012450015801012058015c0101205c016001012460016401012564016801012468017001012070017401012074017801012478017c0101257c018001012480018401012284018801011d88018c0101228c019001012490019401012594019801012498019c0101229c01a001011da001a4010122a401a8010124a801ac010125ac01b0010124b001b4010120b401b801011bb801bc010120bc01c0010122c001c4010124c401c8010125c801cc01011ecc01d0010119d001d401011ed401d8010120d801dc010122dc01e0010125e001e4010120e401e801011be801ec010120ec01f0010122f001f4010124f401f8010120f8010002012200020802011d08021002012210021802012518022002012420022802012028023002012430023802012738024002012240024802011e48025002012250025802012558026002012460026802012068027002012470027802012778028002012280028802011b8802900201229002980201259802a0020124a002a8020120a802b0020124b002b8020127b802c0020122c002c802011dc802d0020122d002d8020125d802e0020122e002e8020124e802f0020120f002f802012200030803012908031003012510031803012418032003012220032803012028033003012430033803012238034003011e40034803012948035003012550035803012458036003012260036803012068037003012470037803012278038003011b8003880301298803900301259003980301249803a0030122a003a8030120a803b0030124b003b8030122b803c003011ec003c8030122c803d0030125d003d8030124d803e0030120e003e8030124e803f0030120f003f8030122f803fc030122fc030004012400040404012504040804012408041004012210041404012214041804012418041c0401251c042004012420042804012228042c0401222c043004012430043404012534043804012438044004012240044404012244044804012448044c0401254c0450040124500460040122`), music.PlaybackMode.UntilDone)
    }
})
forever(function () {
    if (héros.tileKindAt(TileDirection.Center, sprites.dungeon.stairNorth) || héros.tileKindAt(TileDirection.Center, sprites.dungeon.stairLarge)) {
        if (progression == 5) {
            sprites.destroy(grand_mur)
        }
        progression += 1
        niveau_suivant()
    }
    if (héros.tileKindAt(TileDirection.Center, assets.tile`myTile6`)) {
        héros.vy = -300
    }
    if (héros.tileKindAt(TileDirection.Center, sprites.dungeon.hazardLava1)) {
        info.changeLifeBy(-1)
        pause(100)
    }
    if (héros.tileKindAt(TileDirection.Center, sprites.dungeon.stairSouth)) {
        progression = 1
        niveau_suivant()
    }
    if (héros.tileKindAt(TileDirection.Center, sprites.dungeon.stairLadder)) {
        progression = 11
        niveau_suivant()
    }
})
forever(function () {
    pauseUntil(() => progression == 9)
    pause(10000)
    while (true) {
        for (let couteau of sprites.allOfKind(SpriteKind.shuriken)) {
            sprites.destroy(couteau)
            pause(1000)
        }
    }
})
