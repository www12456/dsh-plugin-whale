# 图标与鲸鱼轮廓

插件运行时并不读这些文件——`build_plugin.py` 会把路径数据内联进 `lib/client.js`，
这样浏览器半边是单文件、没有额外请求。这里放的是**源文件**，方便改图或做设计稿。

| 文件 | 用途 | viewBox |
|---|---|---|
| `icon-granary.svg` | 侧栏底部的粮仓按钮（余额入口，低于阈值变橙） | 24×24 |
| `icon-bowl-balance.svg` | 弹层「充值余额」，也可作消遣模式里的米饭计数 | 24×24 |
| `icon-bowl-gift.svg` | 弹层「赠送余额」（碗 + 小旗） | 24×24 |
| `icon-bowl-spent.svg` | 弹层「今日消耗」/ 用量面板（空碗） | 24×24 |
| `icon-fishbone.svg` | 消遣模式里的小鱼计数（鱼刺） | 24×24 |
| `whale-outline.svg` | 鲸鱼状态条「线稿」风格 | 160×115 |
| `whale-fill.svg` | 鲸鱼状态条「填色」风格（腹部与眼睛留白） | 160×115 |

约定：

- 线性图标统一 `stroke-width`：主体 1.6、细节 1.1，圆角端点，颜色用 `currentColor`；
  文件里把 `color` 预设成品牌蓝 `#4D6BFE`，方便直接预览。
- 鲸鱼只用两条路径：`whale-fill.svg` 里的第二条是眼睛/眼状斑，靠 `fill-rule="evenodd"` 挖空。
- 改完图标要跑一次 `python3 build_plugin.py`，否则插件里用的还是旧路径。
