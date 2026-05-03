# `/miside:text` 重设计草案

> 状态：方案草案  
> 目的：重设计 `/miside:text` 自定义命令参数结构，在不超过自定义命令参数上限的前提下，支持时序、字间距、行间距、渲染选项，以及字幕模式。

## 目标

- 把高频用法保留为短命令。
- 把大部分高级配置收进单个 `options` 字符串。
- 去掉 `renderFlags=110` 这种压缩编码，改为显式字段。
- 保留“数字版 hold 快捷参数”。
- 让 `timings` 的完整配置进入 `options`。
- 支持字间距 `letterSpacing` 与行间距 `lineSpacing`。
- 支持显式切换到“面向执行者”的字幕模式。

## 推荐语法

```mcfunction
miside:text <text: string> [hold: float] [options: string]
```

## 参数

| 参数 | 类型 | 可选 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | 否 | MiSide 字幕内容。 |
| `hold` | `float` | 是 | 快捷停留时长。只对应 `holdDuration`。 |
| `options` | `string` | 是 | 选项。格式：`key=value;key=value;...`。 |

## 设计理由

- 旧命令已经接近自定义命令参数上限，不能再继续堆位置参数。
- `options` 可以一次容纳布局、渲染、时序和模式切换，后续扩展也更稳。
- 外层只保留 `hold`，便于最常用的“快速创建字幕”场景。
- `hold` 保留在外层后，`/miside:text "你好啊" 2` 这种短写法仍然成立。

## `options` 语法

### 基本格式

```text
key=value;key=value;key=value
```

规则：

- `options` 为无序键值对，不按书写顺序解析。
- 选项之间使用 `;` 分隔。
- `key` 区分大小写，草案要求使用文档中给出的标准写法。
- `value` 前后允许空格，解析时会自动去掉。
- 重复键名时，以最后一个值为准。
- 不支持未知键名。未知键名直接报错。

### 建议支持的值类型

- `number`
  - 示例：`2`、`0.6`、`90`
- `boolean`
  - 允许：`true`、`false`
- `vec3`
  - 建议写法：`x,y,z`
  - 示例：`0,64,0`
  - 相对坐标建议写法：`~,~1,~`

## 支持的 `options` 键

| 键名 | 类型 | 中文说明 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| `subtitle` | `boolean` | 启用字幕模式 | `false` | `true` 时切到字幕模式。 |
| `location` | `vec3` | 位置 | 无 | 仅普通模式可用。 |
| `scale` | `number` | 缩放 | `1` | 必须大于 `0`。 |
| `pitch` | `number` | 俯仰角 | `0` | 仅普通模式可用。 |
| `yaw` | `number` | 偏航角 | `0` | 仅普通模式可用。 |
| `roll` | `number` | 滚转角 | `0` | 仅普通模式可用。 |
| `letterSpacing` | `number` | 字间距 | `0.736` | 必须大于或等于 `0`。 |
| `lineSpacing` | `number` | 行间距 | `0.552` | 必须大于或等于 `0`。 |
| `depthTest` | `boolean` | 启用深度测试 | `true` | 普通模式与字幕模式都可用。 |
| `backfaceVisible` | `boolean` | 背面可见 | `true` | 普通模式与字幕模式都可用。 |
| `glow` | `boolean` | 启用发光 | `false` | 普通模式与字幕模式都可用。 |
| `fadeIn` | `number` | 淡入时长 | 自动值 / `null` | 必须大于或等于 `0`。 |
| `hold` | `number` | 停留时长 | `2` | 会覆盖外层 `hold`。 |
| `rest` | `number` | 静置时长 | `4.5` | 必须大于或等于 `0`。 |
| `fadeOut` | `number` | 淡出时长 | `1` | 必须大于或等于 `0`。 |
| `distance` | `number` | 前移距离 | `2` | 仅字幕模式可用。必须大于 `0`。 |
| `drop` | `number` | 下移量 | `0.3` | 仅字幕模式可用。 |

## 两种模式

本草案只保留两种行为：

- 普通模式
- 字幕模式

模式切换通过 `subtitle=true` 完成。

### 普通模式

普通模式是默认行为，也就是：

- `subtitle` 省略
- 或 `subtitle=false`

行为：

- 可使用 `location`
- 可使用 `pitch`、`yaw`、`roll`
- 如果未提供 `location`
  - 实体执行：在执行者前方生成
  - 命令方块执行：在命令方块上方生成

### 字幕模式

字幕模式通过 `subtitle=true` 启用。

行为：

- 执行者必须为实体。
- 锚点位置按“执行者头部位置 + 视线方向 * `distance` - `drop`”计算。
- 朝向跟随执行者当前朝向。
- 可使用 `distance` 和 `drop` 调整默认位置。

限制：

- `location` 不能与 `subtitle=true` 同时使用
- `pitch` 不能与 `subtitle=true` 同时使用
- `yaw` 不能与 `subtitle=true` 同时使用
- `roll` 不能与 `subtitle=true` 同时使用

这样做的目的不是限制功能，而是避免语义冲突：

- 既然已经明确启用字幕模式，就不应再混入另一套世界坐标和固定角度逻辑。

## 参数优先级

推荐优先级如下：

1. 内部默认值
2. 外层 `hold`
3. `options`

补充规则：

- 如果外层写了 `hold=2`，但 `options` 里又写了 `hold=4`，则以 `options.hold=4` 为准。
- 如果 `options` 中存在重复键名，则以最后一个值为准。

## 示例

最短写法：

```mcfunction
/miside:text "你好啊"
```

使用快捷停留时长：

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

显式指定世界坐标和旋转：

```mcfunction
/miside:text "你好啊" 2 "location=0,64,0;yaw=90"
```

相对坐标放置：

```mcfunction
/miside:text "你好啊" 2 "location=~,~1,~;yaw=90"
```

启用字幕模式：

```mcfunction
/execute as @p run miside:text "你好啊" 2 "subtitle=true"
```

字幕模式下调整距离、下移和布局：

```mcfunction
/execute as @p run miside:text "你好啊" 2 "subtitle=true;distance=2.4;drop=0.2;letterSpacing=0.8;lineSpacing=0.6"
```

命令方块想使用字幕模式时的建议写法：

```mcfunction
/execute as @p run miside:text "你好啊" 2 "subtitle=true;distance=2.2;drop=0.25"
```

## 失败场景草案

### 结构错误

- `options` 不是合法的 `key=value` 列表
- 存在未知键名
- 某个键缺失值

### 数值错误

- `scale <= 0`
- `letterSpacing < 0`
- `lineSpacing < 0`
- `fadeIn < 0`
- `hold < 0`
- `rest < 0`
- `fadeOut < 0`
- `distance <= 0`

### 模式冲突

- `subtitle=true` 时，执行者不是实体
- `subtitle=true` 同时写了 `location`
- `subtitle=true` 同时写了 `pitch`
- `subtitle=true` 同时写了 `yaw`
- `subtitle=true` 同时写了 `roll`

## 译名草案

### 命令参数与选项名

| 英文键名 | 中文说明 |
| --- | --- |
| `text` | 字幕内容 |
| `hold` | 停留时长 |
| `options` | 选项 |
| `subtitle` | 启用字幕模式 |
| `location` | 位置 |
| `scale` | 缩放 |
| `pitch` | 俯仰角 |
| `yaw` | 偏航角 |
| `roll` | 滚转角 |
| `letterSpacing` | 字间距 |
| `lineSpacing` | 行间距 |
| `depthTest` | 启用深度测试 |
| `backfaceVisible` | 背面可见 |
| `glow` | 启用发光 |
| `fadeIn` | 淡入时长 |
| `rest` | 静置时长 |
| `fadeOut` | 淡出时长 |
| `distance` | 前移距离 |
| `drop` | 下移量 |

### 本地化键草案

| 键名 | `en_US` 草案 | `zh_CN` 草案 |
| --- | --- | --- |
| `misidetext.command.description` | `Create a MiSide subtitle.` | `创建一条 MiSide 字幕` |
| `misidetext.command.success` | `Created MiSide subtitle: %%1` | `已创建 MiSide 字幕：%%1` |
| `misidetext.command.failure.context` | `Unable to create MiSide subtitle: this command requires an entity executor or a command block context.` | `无法创建 MiSide 字幕：此命令要求执行者为实体，或由命令方块执行。` |
| `misidetext.command.failure.options_format` | `Unable to create MiSide subtitle: options has an invalid format.` | `无法创建 MiSide 字幕：options 参数格式无效。` |
| `misidetext.command.failure.subtitle_requires_entity` | `Unable to create MiSide subtitle: subtitle=true requires an entity executor.` | `无法创建 MiSide 字幕：subtitle=true 要求执行者为实体。` |
| `misidetext.command.failure.option_unknown` | `Unable to create MiSide subtitle: unknown option %%1.` | `无法创建 MiSide 字幕：未知选项 %%1。` |
| `misidetext.command.failure.option_invalid` | `Unable to create MiSide subtitle: option %%1 has an invalid value.` | `无法创建 MiSide 字幕：选项 %%1 的值无效。` |
| `misidetext.command.failure.option_conflict` | `Unable to create MiSide subtitle: option %%1 cannot be used with subtitle=true.` | `无法创建 MiSide 字幕：选项 %%1 不能与 subtitle=true 同时使用。` |
| `misidetext.command.failure.option_requires_subtitle` | `Unable to create MiSide subtitle: option %%1 requires subtitle=true.` | `无法创建 MiSide 字幕：选项 %%1 仅可在 subtitle=true 时使用。` |
| `misidetext.command.failure.non_negative` | `Unable to create MiSide subtitle: parameter %%1 must be a non-negative number.` | `无法创建 MiSide 字幕：参数 %%1 的值必须为非负数。` |
| `misidetext.command.failure.positive` | `Unable to create MiSide subtitle: parameter %%1 must be greater than 0.` | `无法创建 MiSide 字幕：参数 %%1 的值必须大于 0。` |

## 实现备注

- 本草案优先保证命令结构简洁和可扩展。
- `location` 进入 `options` 后，需要脚本自己解析 `vec3` 字符串。
- `options` 是第三个参数。如果需要使用 `options`，但不想改动停留时长，建议显式传入默认值 `2`。
- `subtitle=true` 是否可由 `/execute as <entity> run ...` 正常驱动，预期答案是“可以”，因为自定义命令原点中会暴露 `sourceEntity`；但具体表现仍建议在游戏内做一次实测。
- 本草案不涉及现有脚本 API `MisideText` / `MisideText.setSubtitle()` 的破坏性改动，只影响命令层和命令文档层。
