# `/miside:text`

Spawns a `MisideText` MiSide-style subtitle.

| Property | Value |
| --- | --- |
| Permission level | `Any` |
| Restrictions | None |
| Cheats required | No |

## Syntax

```mcfunction
miside:text <text: string> [timings: string] [scale: float] [location: x y z] [pitch: float] [yaw: float] [roll: float] [renderFlags: string]
```

## Arguments

| Argument | Type | Optional | Description |
| --- | --- | --- | --- |
| `text` | `string` | No | Subtitle content. Only plain string text is accepted. |
| `timings` | `string` | Yes | Timing parameters. A single number maps to the `hold` hover duration; you can also use up to four comma-separated values in the form `fadeIn,hold,rest,fadeOut`. Empty positions use the default values. |
| `scale` | `float` | Yes | Overall subtitle scale. Default: `1`. Values less than or equal to `0` fall back to `1`. |
| `location` | `position` | Yes | Subtitle anchor position. |
| `pitch` | `float` | Yes | Pitch of the whole subtitle group, in degrees. |
| `yaw` | `float` | Yes | Yaw of the whole subtitle group, in degrees. |
| `roll` | `float` | Yes | Roll of the whole subtitle group, in degrees. |
| `renderFlags` | `string` | Yes | Render toggle parameters. Use `default` or a three-digit `DBG` string. `D = depthTest`, `B = backfaceVisible`, and `G = glow`. Use `1` to enable a flag and `0` to disable it. Default: `110`, which means `depthTest = true`, `backfaceVisible = true`, and `glow = false`. |

## Examples

Spawn a subtitle using the executor's default context:

```mcfunction
/miside:text "Hello"
```

Use color codes:

```mcfunction
/miside:text "&cHello &eWorld"
```

Display a multiline subtitle:

```mcfunction
/miside:text "&cHello/n&eWorld"
```

Set subtitle hold duration and scale:

```mcfunction
/miside:text "Hello" "2" 1
```

Use explicit timing control:

```mcfunction
/miside:text "Hello" "2,2,5,1"
```

Use timing control with defaults:

```mcfunction
/miside:text "Hello" ",2,,1"
```

Use timing control, position, and rotation:

```mcfunction
/miside:text "Hello" "2,2,2,2" 1 ~ ~1 ~ 0 90 0
```

Spawn a subtitle at absolute coordinates:

```mcfunction
/miside:text "Hello" "2" 1 0 64 0 0 90 0
```

Use explicit render flags in `DBG` order:

```mcfunction
/miside:text "Hello" "2,2,5,1" 1 ~ ~1 ~ 0 0 0 "001"
```

## Notes

- All optional arguments are parsed positionally. To set a later timing or transform field, earlier optional fields must also be filled in first.
- If `location` is omitted and the command is executed by an entity, the anchor is placed `2` blocks in front of that entity's view direction and `0.3` blocks below the entity's head position.
- If `pitch`, `yaw`, and `roll` are omitted, they default to `0 0 0`.
- Use `&` instead of `§` for color formatting codes, such as `&c`, `&e`, and `&0`.
- Use `&&` for a literal `&`.
- Use `/n` for a line break.
- Use `//` for a literal `/`.
- This command is available only after `MisideTextCommand.register()` is called during script startup.
- This runtime is better suited to immediate-use subtitle scenes. If the loaded area is left or the game is re-entered, the original subtitle becomes invalid.
