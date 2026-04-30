# `MisideText` 模块

提供 `miside:text` 仿米塔字幕功能，以及对应的 `/miside:text` 命令

## 导入

```js
import { MisideText, MisideTextCommand } from "./MisideText.js";
```

## `MisideTextContent`

表示 `MisideText` 可接受的结构化字幕内容。

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

### 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `segments` | `MisideTextSegment[]` | 按顺序拼接的文本段。每个文本段都必须包含 `text`，也可以额外提供 RGB `color`。 |

### 说明

- 使用 `/n` 换行
- 使用 `//` 转义为 `/` 
- 使用 `&` 格式代码可以更改文字颜色，用法同原版 `§`
- 使用 `&&` 转义为 `&` 

### 示例

```js
const content = {
  segments: [
    { text: "Hello/n", color: { red: 255, green: 170, blue: 0 } },
    { text: "&0Bedrock" }
  ]
};
```

## `MisideText`

创建并控制一个 `miside:text` 字幕组

### 构造函数

#### `new MisideText(location, text, options)`

#### `new MisideText(options)`

在世界坐标中创建字幕组，或通过单对象重载创建字幕组

#### 参数

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `location` | `{ x: number, y: number, z: number }` | 字幕组的锚点位置。 |
| `text` | `string \| MisideTextContent` | 字幕内容。 |
| `options.dimension` | `Dimension` | 必填，除非 `options.attachedTo` 已经提供维度。 |
| `options.rotation` | `{ x: number, y: number, z: number }` | 字幕组旋转，其中 `x = pitch`、`y = yaw`、`z = roll`。 |
| `options.scale` | `number` | 整体字幕缩放。小于或等于 `0` 的值会回退到 `1`。 |
| `options.useRotation` | `boolean` | 字幕悬浮阶段是否使用传入的旋转值。设为 `false` 则启用面向玩家摄像机旋转。默认值：`true`。 |
| `options.depthTest` | `boolean` | 字幕是否参与深度测试，设为 `false` 则字幕变得可透视。默认值：`true`。 |
| `options.backfaceVisible` | `boolean` | 字幕平面的背面是否可见，设为 `false` 则字幕仅正面可见。默认值：`true`。 |
| `options.glow` | `boolean` | 字幕是否发光。默认值：`false`。 |
| `options.fadeInDuration` | `number` | 字幕淡入/显现时长，单位为秒。省略时按字数量自动推导。 |
| `options.holdDuration` | `number` | 字幕悬停时长，单位为秒。默认值：`2`。 |
| `options.restDuration` | `number` | 字幕躺地时长，单位为秒。默认值：`4.5`。 |
| `options.fadeOutDuration` | `number` | 字幕淡出/消失时长，单位为秒。默认值：`1`。 |
| `options.visibleTo` | `Player[]` | 字幕对指定的玩家可见。空数组表示对所有玩家可见。 |
| `options.attachedTo` | `Entity` | 字幕附着实体目标。设置后，字幕会跟随该实体移动，`location` 会变为相对该实体的局部偏移。 |
| `options.location` | `{ x: number, y: number, z: number }` | 使用单对象重载时的锚点位置。 |
| `options.text` | `string \| MisideTextContent` | 使用单对象重载时的字幕内容。 |

#### 示例

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

### 静态方法

#### `MisideText.setSubtitle(player, text, options)`

创建一个面向玩家的字幕

#### 参数

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `player` | `Player` | 来源玩家。 |
| `text` | `string \| MisideTextContent` | 字幕内容。 |
| `options.distance` | `number` | 沿玩家视线方向向前放置的距离。默认值：`2`。 |
| `options.drop` | `number` | 前向放置后再施加的竖直偏移。默认值：`0.3`。 |
| `options.location` | `{ x: number, y: number, z: number }` | 可选的显式锚点位置。 |
| `options.rotation` | `{ x: number, y: number, z: number }` | 可选的字幕组旋转覆盖，其中 `x = pitch`、`y = yaw`、`z = roll`。 |
| `options.scale` | `number` | 可选的字幕缩放。小于或等于 `0` 的值会回退到 `1`。 |
| `options.useRotation` | `boolean` | 悬浮阶段是否使用传入旋转值。默认值：`true`。 |
| `options.depthTest` | `boolean` | 字幕是否参与深度测试。默认值：`true`。 |
| `options.backfaceVisible` | `boolean` | 字幕平面的背面是否可见。默认值：`true`。 |
| `options.glow` | `boolean` | 字幕是否发光。默认值：`false`。 |
| `options.fadeInDuration` | `number` | 可选的字幕淡入/显现时长，单位为秒。 |
| `options.holdDuration` | `number` | 可选的字幕悬停时长，单位为秒。默认值：`2`。 |
| `options.restDuration` | `number` | 可选的躺地静置时长，单位为秒。默认值：`4.5`。 |
| `options.fadeOutDuration` | `number` | 可选的淡出/消失时长，单位为秒。默认值：`1`。 |
| `options.visibleTo` | `Player[]` | 可选字幕对指定玩家可见。空数组表示对所有玩家可见。 |
| `options.attachedTo` | `Entity` | 可选附着实体目标。 |

#### 返回值

`MisideText`

#### 说明

- 如果传入了 `options.rotation.x` 或 `options.rotation.y`，它会替换默认的“面向玩家”悬浮旋转
- 如果只传入 `options.rotation.z`，则会保留默认的面向玩家基底，仅修改 roll

#### 示例

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

### 属性

| 属性 | 类型 | 访问 | 说明 |
| --- | --- | --- | --- |
| `text` | `string \| MisideTextContent` | 只读 | 当前字幕内容。修改请使用 `setText()`。 |
| `location` | `{ x: number, y: number, z: number }` | 只读 | 当前锚点位置；附着状态下表示局部偏移。修改请使用 `setLocation()`。 |
| `dimension` | `Dimension` | 只读 | 当前解析后的运行时维度。 |
| `rotation` | `{ x: number, y: number, z: number }` | 可读写 | 字幕组旋转，其中 `x = pitch`、`y = yaw`、`z = roll`。 |
| `scale` | `number` | 可读写 | 整体字幕缩放。 |
| `useRotation` | `boolean` | 可读写 | 悬浮阶段是否使用传入旋转值。 |
| `depthTest` | `boolean` | 可读写 | 字幕是否参与深度测试。 |
| `backfaceVisible` | `boolean` | 可读写 | 字幕平面的背面是否可见。 |
| `glow` | `boolean` | 可读写 | 字幕是否发光。 |
| `fadeInDuration` | `number` | 可读写 | 当前整条字幕的解析后淡入/显现时长，单位为秒。 |
| `holdDuration` | `number` | 可读写 | 开始下落前的悬停时长，单位为秒。 |
| `restDuration` | `number` | 可读写 | 落地后的躺地静置时长，单位为秒。 |
| `fadeOutDuration` | `number` | 可读写 | 最终淡出/收缩消失阶段的时长，单位为秒。 |
| `visibleTo` | `Player[]` | 可读写 | 对指定的玩家可见。空数组表示对所有玩家可见。 |
| `attachedTo` | `Entity \| null` | 可读写 | 当前附着的实体目标。设置后，`location` 会变为相对该实体的局部偏移。 |
| `renderer` | `string` | 只读 | 当前实例解析出的渲染后端。本包始终解析为 `atlas`。 |

### 方法

#### `setText(text)`

使用新的内容重建字幕组

返回值：`MisideText`

```js
text.setText({
  segments: [
    { text: "After/n", color: { red: 255, green: 170, blue: 0 } },
    { text: "Update", color: { red: 255, green: 255, blue: 255 } }
  ]
});
```

#### `setLocation(location)`

设置字幕锚点位置。如果当前已附着，则该值表示相对附着实体的局部偏移

返回值：`MisideText`

```js
text.setLocation({ x: 1, y: 71, z: 0 });
```

#### `setRotation(rotation)`

设置字幕组的 pitch、yaw 和 roll

返回值：`MisideText`

```js
text.setRotation({ x: -10, y: 35, z: 12 });
```

#### `setScale(scale)`

设置整体字幕缩放

返回值：`MisideText`

```js
text.setScale(1.25);
```

#### `setUseRotation(useRotation)`

设置悬浮阶段是否使用传入旋转值。设为 `false` 时，悬浮阶段会朝向每个客户端自己的相机

返回值：`MisideText`

```js
text.setUseRotation(false);
```

#### `setDepthTest(depthTest)`

设置字幕是否参与深度测试

返回值：`MisideText`

```js
text.setDepthTest(false);
```

#### `setBackfaceVisible(backfaceVisible)`

设置字幕平面的背面是否可见

返回值：`MisideText`

```js
text.setBackfaceVisible(false);
```

#### `setGlow(glow)`

设置字幕是否发光

返回值：`MisideText`

```js
text.setGlow(true);
```

#### `setFadeInDuration(fadeInDuration)`

设置整条字幕的显现时长，单位为秒。传入 `null`、`undefined` 或空字符串时，会恢复自动推导时序

返回值：`MisideText`

```js
text.setFadeInDuration(1.8);
```

#### `setHoldDuration(holdDuration)`

设置开始下落前的停留时长，单位为秒

返回值：`MisideText`

```js
text.setHoldDuration(2.5);
```

#### `setRestDuration(restDuration)`

设置落地后进入消失阶段前的静置时长，单位为秒

返回值：`MisideText`

```js
text.setRestDuration(5);
```

#### `setFadeOutDuration(fadeOutDuration)`

设置最终收缩或消失阶段的时长，单位为秒

返回值：`MisideText`

```js
text.setFadeOutDuration(1.2);
```

#### `setVisibleTo(visibleTo)`

设置用于渲染的玩家白名单。重复玩家会被去重。空数组表示对所有玩家可见

返回值：`MisideText`

```js
text.setVisibleTo([player]);
```

#### `setAttachedTo(entity)`

将字幕附着到某个实体。附着后，`location` 会被解释为局部偏移。传入 `null` 时会清除当前附着

返回值：`MisideText`

```js
text.setAttachedTo(player);
```

#### `remove()`

立即移除整个字幕组

```js
text.remove();
```

#### `isValid()`

返回该实例当前是否仍然有效

返回值：`boolean`

```js
if (text.isValid()) {
  text.setText("Still alive");
}
```

### 备注

- 旋转是作用在整个字幕组层面上的，不是逐字符应用。
- `useRotation = false` 只影响悬浮阶段，不影响物理下落、静置和收缩阶段。
- `scale` 同时影响显示尺寸和物理支撑采样尺寸。
- 该运行时更适合 **即时场景字幕**。离开加载区域、或重进游戏后，原字幕会失效。

## `MisideTextCommand`

用于注册 `/miside:text` 自定义命令

### 方法

#### `MisideTextCommand.register()`

在脚本启动阶段注册该命令

```js
MisideTextCommand.register();
```
