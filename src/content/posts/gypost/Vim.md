---
title: Vim # 标题（需更改）
published: 2025-12-24   # 发表时间（需更改）
pinned: true
description: Vim操作 # 描述
tags: # 标签
  - Linux
category: Linux # 分类
licenseName: Unlicensed
author: Guiyuan1111
# sourceLink: https://github.com/emn178/markdown
draft: false
date: 2025-12-24
# image:./cover.png 
# pubDate: 2025-12-24
permalink: 251224-2
---

## 查找

在 Vim 的普通模式（默认进入的模式，非输入状态）下：

- 正向查找（从当前位置向后找）输入 /关键词（例如 /ssh），按回车开始查找。
  - 按 n 键：跳转到下一个匹配项；
  - 按 N 键：跳转到上一个匹配项。
- 反向查找（从当前位置向前找）输入 ?关键词（例如 ?ubuntu），按回车开始查找。
  - 按 n 键：跳转到上一个匹配项；
  - 按 N 键：跳转到下一个匹配项。
