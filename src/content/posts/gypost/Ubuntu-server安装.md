---
title: Ubuntu-server安装 # 标题（需更改）
published: 2025-12-24   # 发表时间（需更改）
pinned: true
# description:  # 描述
tags: # 标签
  - Linux
category: Linux # 分类
licenseName: Unlicensed
author: Guiyuan1111
# sourceLink: https://github.com/emn178/markdown
draft: false
date: 2025-12-24
# image:./cover.png 
pubDate: 2025-12-24 04:00:00
permalink: 251224-4
---

## 1 下载

[获取Ubuntu服务器版 | Ubuntu](https://cn.ubuntu.com/download/server/step1)

![image-20251224235915333](./Ubuntu-server安装.assets/image-20251224235915333.png)

##  2 安装

默认往下走，第一个

![界面1](./Ubuntu-server安装.assets/09d80987-1abc-4c71-aef5-edd9e8010029.jpg)

选择`English`

![界面2](./Ubuntu-server安装.assets/71bab3ab-1f90-40d7-b495-0c56be678dd5.jpg)

默认不用管，选中``Done`（应该是默认），回车，至于这些界面都是什么意思，自己可以截图问豆包，后面不说就是默认继续

![界面3](./Ubuntu-server安装.assets/4f855b5d-272d-42cb-841f-cb502fbd3c89.jpg)

![界面4](./Ubuntu-server安装.assets/image-20251225001456616.png)

![界面5](./Ubuntu-server安装.assets/image-20251225001702386.png)

![image-20251225001810008](./Ubuntu-server安装.assets/image-20251225001810008.png)

![image-20251225001843722](./Ubuntu-server安装.assets/image-20251225001843722.png)

![image-20251225001912726](./Ubuntu-server安装.assets/image-20251225001912726.png)

- 解析
  - 磁盘`/dev/sda`（40GB）被划分为 3 个分区：
    - 分区 1：BIOS 引导空间（1MB）；
    - 分区 2：`/boot`分区（2GB）；
    - 分区 3：LVM 物理卷，组成卷组`ubuntu-vg`（约 37.997G），其中已分配 18.996G 给根目录`/`，剩余 19G 为空闲空间。
  - 因为我在vmware安装界面就设置了40GB的硬盘现在看Ubuntu是默认只用20GB
  - 可能的原因是：该布局兼顾了系统引导的独立性与根目录的灵活扩展性，剩余的 LVM 空闲空间可在后续按需分配给新的分区或目录。
  - 先留着，因为我之前遇到过Kali稍微安装点儿东西就会超出20GB的情况，所以这次就多留了一些。

![image-20251225002052394](./Ubuntu-server安装.assets/image-20251225002052394.png)

选择``continue`

![image-20251225002415148](./Ubuntu-server安装.assets/image-20251225002415148.png)

填写基本的信息

![image-20251225003124826](./Ubuntu-server安装.assets/image-20251225003124826.png)

![image-20251225004737185](./Ubuntu-server安装.assets/image-20251225004737185.png)

这是Ubuntu Server 安装中的**SSH 配置界面**

- `Install OpenSSH server`：勾选后会安装 OpenSSH 服务端，实现远程安全登录（当前未勾选）；
- `Allow password authentication over SSH`：默认启用（允许通过密码进行 SSH 认证）。
- `Import SSH key`：可导入 SSH 公钥，实现免密码登录（当前无已授权密钥）。

这个看个人需求安装，我选择了安装

![image-20251225005835279](./Ubuntu-server安装.assets/image-20251225005835279.png)

直接Done，后期可以再安装

![image-20251225005956034](./Ubuntu-server安装.assets/image-20251225005956034.png)

开始安装

![image-20251225010123978](./Ubuntu-server安装.assets/image-20251225010123978.png)

安装完成，reboot

![image-20251225010243366](./Ubuntu-server安装.assets/image-20251225010243366.png)

报错

![image-20251225010318490](./Ubuntu-server安装.assets/image-20251225010318490.png)

根据提示移除安装镜像

![image-20251225010415429](./Ubuntu-server安装.assets/image-20251225010415429.png)

进入了登录界面，安装成功

![image-20251225010446364](./Ubuntu-server安装.assets/image-20251225010446364.png)
