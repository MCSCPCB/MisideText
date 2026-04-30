# `/miside:text`

生成一个 `MisideText` 仿米塔字幕

| 属性 | 值 |
| --- | --- |
| 权限级别 | `Any` |
| 限制 | 无 |
| 是否需要作弊 | 否 |

## 语法

```mcfunction
miside:text <text: string> [timings: string] [scale: float] [location: x y z] [pitch: float] [yaw: float] [roll: float] [renderFlags: string]
```

## 参数

| 参数 | 类型 | 可选 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | 否 | 字幕内容。只接受字符串文本。 |
| `timings` | `string` | 是 | 时序参数。单个数字则对应 `hold` 悬停时长；也可以使用最多四个逗号分隔值，格式为 `fadeIn,hold,rest,fadeOut`。留空的位置会使用默认值。 |
| `scale` | `float` | 是 | 整体字幕缩放。默认值：`1`。小于或等于 `0` 的值会回退到 `1`。 |
| `location` | `position` | 是 | 字幕锚点位置。 |
| `pitch` | `float` | 是 | 整个字幕组的俯仰角，单位为度。 |
| `yaw` | `float` | 是 | 整个字幕组的偏航角，单位为度。 |
| `roll` | `float` | 是 | 整个字幕组的滚转角，单位为度。 |
| `renderFlags` | `string` | 是 | 渲染开关参数。可填 `default`、三位数字串 `DBG`。其中 `D = depthTest`、`B = backfaceVisible`、`G = glow`，需要启用的参数则将值填为1，否则填0。默认值：`110` 即 `depthTest = true`、`backfaceVisible = true`、`glow = false`。 |。 |

## 示例

面向执行者生成字幕：

```mcfunction
/miside:text "你好啊"
```

使用颜色代码：

```mcfunction
/miside:text "&c你 &好啊"
```

字幕换行显示：

```mcfunction
/miside:text "&c你/n&e好啊"
```

字幕停留时长与缩放：

```mcfunction
/miside:text "你好啊" "2" 1
```

显式时间控制：

```mcfunction
/miside:text "你好啊" "2,2,5,1"
```

时间控制默认值：

```mcfunction
/miside:text "你好啊" ",2,,1"
```

时间控制、位置和旋转：

```mcfunction
/miside:text "你好啊" "2,2,2,2" 1 ~ ~1 ~ 0 90 0
```

在绝对坐标生成字幕：

```mcfunction
/miside:text "你好啊" "2" 1 0 64 0 0 90 0
```

使用 `DBG` 顺序的显式渲染开关：

```mcfunction
/miside:text "你好啊" "2,2,5,1" 1 ~ ~1 ~ 0 0 0 "001"
```

## 备注

- 所有可选参数都按位置解析。若要设置后面的时序或变换字段，前面的可选字段也必须先补齐。
- 如果省略 `location`，且命令由实体执行，则锚点会放在该实体视线前方 `2` 格、头部位置下方 `0.3` 格。
- 如果省略 `pitch`、`yaw` 和 `roll` 默认为 `0 0 0`。
- 颜色格式代码请使用 `&` 而不是 `§`，例如 `&c`、`&e`、`&0`。
- 字面量 `&`，请使用 `&&`。
- 换行，请使用 `/n`。
- 字面量 `/`，请使用 `//`。
- 只有在脚本启动阶段调用 `MisideTextCommand.register()` 之后，此命令才可用。
- 该运行时更适合**即时场景字幕**。离开加载区域或重进游戏，原字幕将失效。
