# `MisideText` Module

Provides the `miside:text` MiSide-style subtitle feature and the matching `/miside:text` command.

## Import

```js
import { MisideText, MisideTextCommand } from "./MisideText.js";
```

## `MisideTextContent`

Represents structured subtitle content accepted by `MisideText`.

```ts
type MisideTextColor = {
  red: number;
  green: number;
  blue: number;
};

type MisideTextSegment = {
  text: string;
  color?: MisideTextColor;
};

type MisideTextContent = {
  segments: MisideTextSegment[];
};
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `segments` | `MisideTextSegment[]` | Text segments concatenated in order. Every segment must include `text`, and may also provide an RGB `color`. |

### Notes

- Use `/n` for a line break.
- Use `//` to escape `/`.
- Use `&` formatting codes to change text color, the same way vanilla uses `§`.
- Use `&&` to escape `&`.

### Example

```js
const content = {
  segments: [
    { text: "Hello/n", color: { red: 255, green: 170, blue: 0 } },
    { text: "&0Bedrock" }
  ]
};
```

## `MisideText`

Creates and controls a `miside:text` subtitle group.

### Constructors

#### `new MisideText(location, text, options)`

#### `new MisideText(options)`

Creates a subtitle group at a world position, or by using the single-object overload.

#### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `location` | `{ x: number, y: number, z: number }` | Anchor position of the subtitle group. |
| `text` | `string \| MisideTextContent` | Subtitle content. |
| `options.dimension` | `Dimension` | Required unless `options.attachedTo` already provides a dimension. |
| `options.rotation` | `{ x: number, y: number, z: number }` | Subtitle-group rotation, where `x = pitch`, `y = yaw`, and `z = roll`. |
| `options.scale` | `number` | Overall subtitle scale. Values less than or equal to `0` fall back to `1`. |
| `options.useRotation` | `boolean` | Whether the hover stage uses the supplied rotation value. Set it to `false` to enable player-camera-facing rotation. Default: `true`. |
| `options.depthTest` | `boolean` | Whether the subtitle participates in depth testing. Set it to `false` to make the subtitle render through the world. Default: `true`. |
| `options.backfaceVisible` | `boolean` | Whether the back side of the subtitle plane is visible. Set it to `false` to make the subtitle visible only from the front. Default: `true`. |
| `options.glow` | `boolean` | Whether the subtitle glows. Default: `false`. |
| `options.fadeInDuration` | `number` | Fade-in / reveal duration of the subtitle, in seconds. If omitted, it is derived automatically from the character count. |
| `options.holdDuration` | `number` | Hover duration of the subtitle, in seconds. Default: `2`. |
| `options.restDuration` | `number` | Ground-rest duration of the subtitle, in seconds. Default: `4.5`. |
| `options.fadeOutDuration` | `number` | Fade-out / disappearance duration of the subtitle, in seconds. Default: `1`. |
| `options.visibleTo` | `Player[]` | Players that can see the subtitle. An empty array means all players can see it. |
| `options.attachedTo` | `Entity` | Entity target to attach to. After it is set, the subtitle follows that entity and `location` becomes a local offset relative to the entity. |
| `options.location` | `{ x: number, y: number, z: number }` | Anchor position when using the single-object overload. |
| `options.text` | `string \| MisideTextContent` | Subtitle content when using the single-object overload. |

#### Example

```js
const text = new MisideText(
  { x: 0, y: 70, z: 0 },
  {
    segments: [
      { text: "Hello/n", color: { red: 255, green: 170, blue: 0 } },
      { text: "&eBedrock" }
    ]
  },
  {
    dimension: player.dimension,
    rotation: { x: 0, y: 45, z: 0 },
    scale: 1,
    depthTest: true,
    backfaceVisible: true,
    glow: false,
    fadeInDuration: 1.6,
    holdDuration: 2,
    restDuration: 4.5,
    fadeOutDuration: 1,
    visibleTo: [player]
  }
);
```

### Static Methods

#### `MisideText.setSubtitle(player, text, options)`

Creates a player-facing subtitle.

#### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `player` | `Player` | Source player. |
| `text` | `string \| MisideTextContent` | Subtitle content. |
| `options.distance` | `number` | Forward placement distance along the player's view direction. Default: `2`. |
| `options.drop` | `number` | Additional vertical offset applied after forward placement. Default: `0.3`. |
| `options.location` | `{ x: number, y: number, z: number }` | Optional explicit anchor position. |
| `options.rotation` | `{ x: number, y: number, z: number }` | Optional subtitle-group rotation override, where `x = pitch`, `y = yaw`, and `z = roll`. |
| `options.scale` | `number` | Optional subtitle scale. Values less than or equal to `0` fall back to `1`. |
| `options.useRotation` | `boolean` | Whether the hover stage uses the supplied rotation value. Default: `true`. |
| `options.depthTest` | `boolean` | Whether the subtitle participates in depth testing. Default: `true`. |
| `options.backfaceVisible` | `boolean` | Whether the back side of the subtitle plane is visible. Default: `true`. |
| `options.glow` | `boolean` | Whether the subtitle glows. Default: `false`. |
| `options.fadeInDuration` | `number` | Optional fade-in / reveal duration of the subtitle, in seconds. |
| `options.holdDuration` | `number` | Optional hover duration of the subtitle, in seconds. Default: `2`. |
| `options.restDuration` | `number` | Optional ground-rest duration, in seconds. Default: `4.5`. |
| `options.fadeOutDuration` | `number` | Optional fade-out / disappearance duration, in seconds. Default: `1`. |
| `options.visibleTo` | `Player[]` | Optional subtitle visibility list for specific players. An empty array means all players can see it. |
| `options.attachedTo` | `Entity` | Optional attachment target entity. |

#### Returns

`MisideText`

#### Notes

- If `options.rotation.x` or `options.rotation.y` is supplied, it replaces the default player-facing hover rotation.
- If only `options.rotation.z` is supplied, the default player-facing basis is preserved and only the roll is changed.

#### Example

```js
const text = MisideText.setSubtitle(player, {
  segments: [
    { text: "Subtitle ", color: { red: 85, green: 255, blue: 255 } },
    { text: "Content", color: { red: 255, green: 255, blue: 85 } }
  ]
}, {
  distance: 2.4,
  drop: 0.35,
  depthTest: true,
  backfaceVisible: true,
  glow: false,
  holdDuration: 2,
  restDuration: 4.5,
  scale: 1,
  visibleTo: [player]
});
```

### Properties

| Property | Type | Access | Description |
| --- | --- | --- | --- |
| `text` | `string \| MisideTextContent` | Read only | Current subtitle content. Use `setText()` to change it. |
| `location` | `{ x: number, y: number, z: number }` | Read only | Current anchor position. When attached, it represents a local offset. Use `setLocation()` to change it. |
| `dimension` | `Dimension` | Read only | Current resolved runtime dimension. |
| `rotation` | `{ x: number, y: number, z: number }` | Read / write | Subtitle-group rotation, where `x = pitch`, `y = yaw`, and `z = roll`. |
| `scale` | `number` | Read / write | Overall subtitle scale. |
| `useRotation` | `boolean` | Read / write | Whether the hover stage uses the supplied rotation value. |
| `depthTest` | `boolean` | Read / write | Whether the subtitle participates in depth testing. |
| `backfaceVisible` | `boolean` | Read / write | Whether the back side of the subtitle plane is visible. |
| `glow` | `boolean` | Read / write | Whether the subtitle glows. |
| `fadeInDuration` | `number` | Read / write | Current resolved fade-in / reveal duration for the whole subtitle, in seconds. |
| `holdDuration` | `number` | Read / write | Hover duration before the drop starts, in seconds. |
| `restDuration` | `number` | Read / write | Ground-rest duration after landing, in seconds. |
| `fadeOutDuration` | `number` | Read / write | Duration of the final fade-out / shrink-away stage, in seconds. |
| `visibleTo` | `Player[]` | Read / write | Visible to the specified players. An empty array means all players can see it. |
| `attachedTo` | `Entity \| null` | Read / write | Current attached entity target. After it is set, `location` becomes a local offset relative to that entity. |
| `renderer` | `string` | Read only | Renderer backend resolved by the current instance. This package always resolves it to `atlas`. |

### Methods

#### `setText(text)`

Rebuilds the subtitle group with new content.

Returns: `MisideText`

```js
text.setText({
  segments: [
    { text: "After/n", color: { red: 255, green: 170, blue: 0 } },
    { text: "Update", color: { red: 255, green: 255, blue: 255 } }
  ]
});
```

#### `setLocation(location)`

Sets the subtitle anchor position. If the subtitle is currently attached, this value is treated as a local offset relative to the attached entity.

Returns: `MisideText`

```js
text.setLocation({ x: 1, y: 71, z: 0 });
```

#### `setRotation(rotation)`

Sets subtitle-group pitch, yaw, and roll.

Returns: `MisideText`

```js
text.setRotation({ x: -10, y: 35, z: 12 });
```

#### `setScale(scale)`

Sets the overall subtitle scale.

Returns: `MisideText`

```js
text.setScale(1.25);
```

#### `setUseRotation(useRotation)`

Sets whether the hover stage uses the supplied rotation value. When set to `false`, the hover stage faces each client's own camera.

Returns: `MisideText`

```js
text.setUseRotation(false);
```

#### `setDepthTest(depthTest)`

Sets whether the subtitle participates in depth testing.

Returns: `MisideText`

```js
text.setDepthTest(false);
```

#### `setBackfaceVisible(backfaceVisible)`

Sets whether the back side of the subtitle plane is visible.

Returns: `MisideText`

```js
text.setBackfaceVisible(false);
```

#### `setGlow(glow)`

Sets whether the subtitle glows.

Returns: `MisideText`

```js
text.setGlow(true);
```

#### `setFadeInDuration(fadeInDuration)`

Sets the reveal duration of the whole subtitle, in seconds. Passing `null`, `undefined`, or an empty string restores automatic timing.

Returns: `MisideText`

```js
text.setFadeInDuration(1.8);
```

#### `setHoldDuration(holdDuration)`

Sets how long the subtitle stays before it starts to fall, in seconds.

Returns: `MisideText`

```js
text.setHoldDuration(2.5);
```

#### `setRestDuration(restDuration)`

Sets how long the subtitle stays on the ground before it enters the disappearance stage, in seconds.

Returns: `MisideText`

```js
text.setRestDuration(5);
```

#### `setFadeOutDuration(fadeOutDuration)`

Sets the duration of the final shrink or disappearance stage, in seconds.

Returns: `MisideText`

```js
text.setFadeOutDuration(1.2);
```

#### `setVisibleTo(visibleTo)`

Sets the player whitelist used for rendering. Duplicate players are removed. An empty array means all players can see the subtitle.

Returns: `MisideText`

```js
text.setVisibleTo([player]);
```

#### `setAttachedTo(entity)`

Attaches the subtitle to an entity. After attachment, `location` is interpreted as a local offset. Passing `null` clears the current attachment.

Returns: `MisideText`

```js
text.setAttachedTo(player);
```

#### `remove()`

Immediately removes the whole subtitle group.

```js
text.remove();
```

#### `isValid()`

Returns whether the instance is still valid.

Returns: `boolean`

```js
if (text.isValid()) {
  text.setText("Still alive");
}
```

### Remarks

- Rotation is applied to the whole subtitle group, not per character.
- `useRotation = false` affects only the hover stage. It does not affect the physical drop, resting, or shrinking stages.
- `scale` affects both display size and physical support sampling size.
- This runtime is better suited to immediate-use subtitle scenes. If the loaded area is left or the game is re-entered, the original subtitle becomes invalid.

## `MisideTextCommand`

Used to register the `/miside:text` custom command.

### Methods

#### `MisideTextCommand.register()`

Registers the command during script startup.

```js
MisideTextCommand.register();
```
