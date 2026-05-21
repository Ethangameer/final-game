enum ActionKind {
    Walking,
    Idle,
    Jumping
}
enum RadioMessage {
    choose_music = 34730,
    message1 = 49434
}
namespace SpriteKind {
    export const Terrain = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const Sign = SpriteKind.create()
}
/**
 * MODE SYSTEM
 */
/**
 * --------------------
 */
// --------------------
// GENERATE TERRAIN FUNCTION
// --------------------
function generateTerrain (x: number) {
    baseY = 10
    if (mode == 0) {
        tiles.setTileAt(tiles.getTileLocation(x, baseY), assets.tile`transparency16`)
    } else if (mode == 1) {
        y = Math.round((x % 10 - 5) * (x % 10 - 5) / 6)
        tiles.setTileAt(tiles.getTileLocation(x, baseY - y), assets.tile`transparency16`)
    } else {
        expX = x % 10
        y2 = Math.round(1.25 ** expX)
        tiles.setTileAt(tiles.getTileLocation(x, baseY - y2), assets.tile`transparency16`)
    }
}
browserEvents.Q.onEvent(browserEvents.KeyEvent.Pressed, function () {
    mode += -1
    if (mode < 0) {
        mode = 2
    }
    if (mode == 0) {
        game.splash("Linear World")
        animation.runImageAnimation(
        GRAPH,
        assets.animation`Linear`,
        50,
        false
        )
    } else if (mode == 1) {
        game.splash("Quadratic World")
        animation.runImageAnimation(
        GRAPH,
        assets.animation`Quadratic`,
        50,
        false
        )
    } else if (mode == 2) {
        game.splash("Exponential World")
        animation.runImageAnimation(
        GRAPH,
        assets.animation`Exponential`,
        50,
        false
        )
    } else {
    	
    }
})
browserEvents.Space.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (canJump) {
        Player_Girl.vy = -150
        canJump = false
    }
})
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    GRAPH.unfollow()
    scaling.scaleToPixels(GRAPH, 32, ScaleDirection.Uniformly, ScaleAnchor.Middle)
})
browserEvents.MouseRight.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    GRAPH.follow(Player_Girl)
    scaling.scaleToPixels(GRAPH, 16, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    animation.runImageAnimation(
    GRAPH,
    assets.animation`Normal`,
    200,
    false
    )
})
browserEvents.E.onEvent(browserEvents.KeyEvent.Pressed, function () {
    mode += 1
    if (mode > 3) {
        mode = 0
    }
    if (mode == 0) {
        game.splash("Linear World")
        animation.runImageAnimation(
        GRAPH,
        assets.animation`Linear`,
        50,
        false
        )
    } else if (mode == 1) {
        game.splash("Exponential World")
        animation.runImageAnimation(
        GRAPH,
        assets.animation`Exponential`,
        50,
        false
        )
    } else if (mode == 2) {
        game.splash("Quadratic World")
        animation.runImageAnimation(
        GRAPH,
        assets.animation`Quadratic`,
        50,
        false
        )
    } else {
    	
    }
})
let currentAnim = ""
let newAnim = ""
let canJump = false
let y2 = 0
let expX = 0
let y = 0
let mode = 0
let baseY = 0
let GRAPH: Sprite = null
let Player_Girl: Sprite = null
let playerTileX = 0
let worldX = 0
scene.setBackgroundImage(assets.image`myImage`)
Player_Girl = sprites.create(assets.image`Player`, SpriteKind.Player)
GRAPH = sprites.create(assets.image`Graph Start point`, SpriteKind.Terrain)
let Sign = sprites.create(assets.image`sign`, SpriteKind.Sign)
Sign.setPosition(0, 0)
Player_Girl.startEffect(effects.starField)
controller.moveSprite(Player_Girl, 100, 0)
scene.cameraFollowSprite(Player_Girl)
GRAPH.follow(Player_Girl)
Player_Girl.ay = 300
tiles.setCurrentTilemap(tilemap`level`)
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
// --------------------
// SMOOTH ANIMATION CONTROLLER
// --------------------
game.onUpdate(function () {
    if (!(Player_Girl.isHittingTile(CollisionDirection.Bottom))) {
        newAnim = "jump"
    } else if (Math.abs(Player_Girl.vx) > 20) {
        newAnim = "walk"
    } else {
        newAnim = "idle"
    }
    if (newAnim != currentAnim) {
        currentAnim = newAnim
        if (currentAnim == "walk") {
            if (controller.left.isPressed()) {
                animation.runImageAnimation(
                Player_Girl,
                assets.animation`left`,
                150,
                true
                )
            } else {
                animation.runImageAnimation(
                Player_Girl,
                assets.animation`right`,
                150,
                true
                )
            }
        } else if (currentAnim == "jump") {
            animation.runImageAnimation(
            Player_Girl,
            assets.animation`myAnim0`,
            200,
            true
            )
        } else {
            animation.runImageAnimation(
            Player_Girl,
            assets.animation`victory`,
            300,
            true
            )
        }
    }
})
// --------------------
// GROUND CHECK
// --------------------
game.onUpdate(function () {
    if (Player_Girl.isHittingTile(CollisionDirection.Bottom)) {
        canJump = true
    }
})
forever(function () {
    if (Player_Girl.overlapsWith(Sign)) {
        Sign.sayText("Hi there, the controls are pretty simple, q and e to change graph types and left and right click to place and pick up graphs")
    }
})
