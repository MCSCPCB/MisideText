# `/miside:text`

创建一条 `MisideText` 仿米塔字幕

| 属性 | 值 |
| --- | --- |
| 权限级别 | `Any` |
| 限制 | 无 |
| 是否需要作弊 | 否 |

## 语法

```mcfunction
miside:text <text: string> [hold: float] [options: string]
```

## 参数

| 参数 | 类型 | 可选 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | 否 | 字幕内容。 |
| `hold` | `float` | 是 | 停留时长。默认值：`2`。必须大于或等于 `0`。 |
| `options` | `string` | 是 | 选项。格式：`key=value;key=value;...`。如果需要传入 `options`，但不想改动停留时长，请显式传入默认值 `2`。 |

## `options`

`options` 为无序键值对，不受顺序影响

| 键名 | 类型 | 说明 |
| --- | --- | --- |
| `subtitle` | `boolean` | 启用字幕模式。 |
| `location` | `vec3` | 字幕位置。仅普通模式可用。 |
| `scale` | `number` | 字幕缩放。 |
| `pitch` | `number` | 俯仰角。仅普通模式可用。 |
| `yaw` | `number` | 偏航角。仅普通模式可用。 |
| `roll` | `number` | 滚转角。仅普通模式可用。 |
| `letterSpacing` | `number` | 字间距。 |
| `lineSpacing` | `number` | 行间距。 |
| `depthTest` | `boolean` | 启用深度测试/禁用方块透视。 |
| `backfaceVisible` | `boolean` | 启用背面可见。 |
| `glow` | `boolean` | 启用发光。 |
| `fadeIn` | `number` | 淡入时长。 |
| `hold` | `number` | 停留时长。会覆盖外层 `hold`。 |
| `rest` | `number` | 静置时长。 |
| `fadeOut` | `number` | 淡出时长。 |
| `distance` | `number` | 前移距离。仅字幕模式可用。 |
| `drop` | `number` | 下移量。仅字幕模式可用。 |

## 模式

### 普通模式

省略 `subtitle`，或写 `subtitle=false` 时使用普通模式。

- 可使用 `location`
- 可使用 `pitch`、`yaw`、`roll`
- 省略 `location` 时：
  - 实体执行：在执行者前方创建
  - 命令方块执行：在命令方块上方创建

### 字幕模式

写 `subtitle=true` 时启用字幕模式。

- 执行者必须为实体
- 位置按执行者头部位置与视线方向计算
- 可使用 `distance` 和 `drop`

限制：

- `location` 不能与 `subtitle=true` 同时使用
- `pitch` 不能与 `subtitle=true` 同时使用
- `yaw` 不能与 `subtitle=true` 同时使用
- `roll` 不能与 `subtitle=true` 同时使用

## 示例

创建字幕：

```mcfunction
/miside:text "你好啊"
```

设置停留时长：

```mcfunction
/miside:text "你好啊" 2
```

设置字间距、行间距与发光：

```mcfunction
/miside:text "你好啊" 2 "letterSpacing=0.8;lineSpacing=0.6;glow=true"
```

设置完整时序：

```mcfunction
/miside:text "你好啊" 2 "fadeIn=0.5;hold=2;rest=5;fadeOut=1"
```

在绝对坐标创建字幕：

```mcfunction
/miside:text "你好啊" 2 "location=0,64,0;yaw=90"
```

在相对坐标创建字幕：

```mcfunction
/miside:text "你好啊" 2 "location=~,~1,~;yaw=90"
```

启用字幕模式：

```mcfunction
/execute as @p run miside:text "你好啊" 2 "subtitle=true"
```

字幕模式下设置距离、下移与间距：

```mcfunction
/execute as @p run miside:text "你好啊" 2 "subtitle=true;distance=2.4;drop=0.2;letterSpacing=0.8;lineSpacing=0.6"
```

命令方块使用玩家为执行者创建字幕：

```mcfunction
/execute as @p run miside:text "你好啊" 2 "subtitle=true;distance=2.2;drop=0.25"
```

## 备注

- `options` 为无序键值对。
- 重复键名时，以最后一个值为准。
- `location` 使用 `x,y,z` 格式，例如 `0,64,0` 或 `~,~1,~`。
- `location` 目前不支持 `^` 局部坐标。
- `distance` 与 `drop` 仅可在 `subtitle=true` 时使用。
- `subtitle=true` 要求执行者为实体。命令方块请配合 `/execute as ... run` 使用。
- 颜色格式代码请使用 `&` 而不是 `§`，例如 `&c`、`&e`、`&0`。
- 字面量 `&`，请使用 `&&`。
- 换行，请使用 `/n`。
- 字面量 `/`，请使用 `//`。
- 只有在脚本启动阶段调用 `MisideTextCommand.register()` 之后，此命令才可用。
- 该运行时更适合**即时场景字幕**。离开加载区域或重进游戏，原字幕将失效。
