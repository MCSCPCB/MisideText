# `/miside:text`

Creates a `MisideText` MiSide subtitle.

| Property | Value |
| --- | --- |
| Permission level | `Any` |
| Restrictions | None |
| Cheats required | No |

## Syntax

```mcfunction
miside:text <text: string> [hold: float] [options: string]
```

## Arguments

| Argument | Type | Optional | Description |
| --- | --- | --- | --- |
| `text` | `string` | No | Subtitle content. |
| `hold` | `float` | Yes | Hold duration. Default: `2`. Must be greater than or equal to `0`. |
| `options` | `string` | Yes | Options in the form `key=value;key=value;...`. If you want to use `options` without changing the hold duration, pass the default value `2` explicitly. |

## `options`

`options` is an unordered key-value list.

| Key | Type | Description |
| --- | --- | --- |
| `subtitle` | `boolean` | Enables subtitle mode. |
| `attachTo` | `string` | Attachment target. Currently only `executor` is supported. |
| `location` | `vec3` | Subtitle position. Only available in normal mode. |
| `scale` | `number` | Subtitle scale. |
| `pitch` | `number` | Pitch. Only available in normal mode. |
| `yaw` | `number` | Yaw. Only available in normal mode. |
| `roll` | `number` | Roll. Only available in normal mode. |
| `useRotation` | `boolean` | Uses fixed rotation. When set to `false`, the subtitle faces the viewer camera. |
| `letterSpacing` | `number` | Horizontal spacing between characters. |
| `lineSpacing` | `number` | Vertical spacing between lines. |
| `depthTest` | `boolean` | Enables depth testing. |
| `backfaceVisible` | `boolean` | Whether the back face is visible. |
| `glow` | `boolean` | Enables glow. |
| `fadeIn` | `number` | Fade-in duration. |
| `hold` | `number` | Hold duration. Overrides the outer `hold`. |
| `rest` | `number` | Rest duration. |
| `fadeOut` | `number` | Fade-out duration. |
| `distance` | `number` | Forward distance. Only available in subtitle mode. |
| `drop` | `number` | Downward offset. Only available in subtitle mode. |

## Modes

### Normal Mode

Normal mode is used when `subtitle` is omitted or set to `false`.

- `location` is allowed.
- `pitch`, `yaw`, and `roll` are allowed.
- If `location` is omitted:
  - Entity execution: spawns in front of the executor.
  - Command block execution: spawns above the command block.

### Subtitle Mode

Subtitle mode is enabled with `subtitle=true`.

- Requires an entity execution context.
- The subtitle position is calculated from the executor's head position and facing direction.
- `distance` and `drop` are available.
- `attachTo=executor` can be used to keep the subtitle following the executor with the same relative offset.

Restrictions:

- `location` cannot be used when `subtitle=true`.
- `pitch` cannot be used when `subtitle=true`.
- `yaw` cannot be used when `subtitle=true`.
- `roll` cannot be used when `subtitle=true`.
- `pitch`, `yaw`, and `roll` cannot be used when `useRotation=false`.

## Examples

Create a subtitle:

```mcfunction
/miside:text "Hello"
```

Set the hold duration:

```mcfunction
/miside:text "Hello" 2
```

Set character spacing, line spacing, and glow:

```mcfunction
/miside:text "Hello" 2 "letterSpacing=0.8;lineSpacing=0.6;glow=true"
```

Disable fixed rotation so the subtitle faces the viewer camera:

```mcfunction
/miside:text "Hello" 2 "useRotation=false"
```

Set full timing control:

```mcfunction
/miside:text "Hello" 2 "fadeIn=0.5;hold=2;rest=5;fadeOut=1"
```

Spawn at absolute coordinates:

```mcfunction
/miside:text "Hello" 2 "location=0,64,0;yaw=90"
```

Spawn at relative coordinates:

```mcfunction
/miside:text "Hello" 2 "location=~,~1,~;yaw=90"
```

Enable subtitle mode:

```mcfunction
/execute as @p run miside:text "Hello" 2 "subtitle=true"
```

Set subtitle mode distance, drop, and spacing:

```mcfunction
/execute as @p run miside:text "Hello" 2 "subtitle=true;distance=2.4;drop=0.2;letterSpacing=0.8;lineSpacing=0.6"
```

Use a player context from a command block:

```mcfunction
/execute as @p run miside:text "Hello" 2 "subtitle=true;distance=2.2;drop=0.25"
```

Attach the subtitle to the executor and keep the same relative offset:

```mcfunction
/execute as @p run miside:text "Hello" 2 "attachTo=executor"
```

Attach in subtitle mode and face the viewer camera:

```mcfunction
/execute as @p run miside:text "Hello" 2 "subtitle=true;attachTo=executor;useRotation=false"
```

## Notes

- `options` is unordered.
- If a key is repeated, the last value wins.
- `location` uses the `x,y,z` format, such as `0,64,0` or `~,~1,~`.
- `location` does not currently support local `^` coordinates.
- `distance` and `drop` require `subtitle=true`.
- `attachTo=executor` requires an entity execution context.
- `attachTo=executor` preserves the creation-time offset from the executor and follows later movement. It does not recalculate to the executor's current front every tick.
- `pitch`, `yaw`, and `roll` require `useRotation=true`.
- `subtitle=true` requires an entity execution context. For command blocks, use `/execute as ... run`.
- Use `&` instead of `§` for color formatting codes, such as `&c`, `&e`, and `&0`.
- Use `&&` for a literal `&`.
- Use `/n` for a line break.
- Use `//` for a literal `/`.
- This command is available only after `MisideTextCommand.register()` is called during script startup.
- This runtime is better suited to immediate-use subtitle scenes. If the loaded area is left or the game is re-entered, the original subtitle becomes invalid.

## `/miside:gamerule`

```mcfunction
miside:gamerule sendCommandFeedback <value: bool>
```

Enable `miside:` command feedback
