import type { SakuraConfig } from "../types/config";

// 基础粒子接口
interface Particle {
	draw(cxt: CanvasRenderingContext2D): void;
	update(): void;
}

// 樱花对象类
class Sakura implements Particle {
	x: number;
	y: number;
	s: number;
	r: number;
	a: number;
	fn: {
		x: (x: number, y: number) => number;
		y: (x: number, y: number) => number;
		r: (r: number) => number;
		a: (a: number) => number;
	};
	idx: number;
	img: HTMLImageElement;
	limitArray: number[];
	config: SakuraConfig;

	constructor(
		x: number,
		y: number,
		s: number,
		r: number,
		a: number,
		fn: {
			x: (x: number, y: number) => number;
			y: (x: number, y: number) => number;
			r: (r: number) => number;
			a: (a: number) => number;
		},
		idx: number,
		img: HTMLImageElement,
		limitArray: number[],
		config: SakuraConfig,
	) {
		this.x = x;
		this.y = y;
		this.s = s;
		this.r = r;
		this.a = a;
		this.fn = fn;
		this.idx = idx;
		this.img = img;
		this.limitArray = limitArray;
		this.config = config;
	}

	draw(cxt: CanvasRenderingContext2D) {
		cxt.save();
		cxt.translate(this.x, this.y);
		cxt.rotate(this.r);
		cxt.globalAlpha = this.a;
		cxt.drawImage(this.img, 0, 0, 40 * this.s, 40 * this.s);
		cxt.restore();
	}

	update() {
		this.x = this.fn.x(this.x, this.y);
		this.y = this.fn.y(this.y, this.y);
		this.r = this.fn.r(this.r);
		this.a = this.fn.a(this.a);

		// 如果樱花越界或完全透明，重新调整位置
		if (
			this.x > window.innerWidth ||
			this.x < 0 ||
			this.y > window.innerHeight ||
			this.y < 0 ||
			this.a <= 0
		) {
			// 如果樱花不做限制
			if (this.limitArray[this.idx] === -1) {
				this.resetPosition();
			}
			// 否则樱花有限制
			else {
				if (this.limitArray[this.idx] > 0) {
					this.resetPosition();
					this.limitArray[this.idx]--;
				}
			}
		}
	}

	private resetPosition() {
		this.r = getRandom("fnr", this.config);
		if (Math.random() > 0.4) {
			this.x = getRandom("x", this.config);
			this.y = 0;
			this.s = getRandom("s", this.config);
			this.r = getRandom("r", this.config);
			this.a = getRandom("a", this.config);
		} else {
			this.x = window.innerWidth;
			this.y = getRandom("y", this.config);
			this.s = getRandom("s", this.config);
			this.r = getRandom("r", this.config);
			this.a = getRandom("a", this.config);
		}
	}
}

// 文字粒子类
class TextParticle implements Particle {
	x: number;
	y: number;
	s: number;
	r: number;
	a: number;
	fn: {
		x: (x: number, y: number) => number;
		y: (x: number, y: number) => number;
		r: (r: number) => number;
		a: (a: number) => number;
	};
	idx: number;
	text: string;
	limitArray: number[];
	config: SakuraConfig;
	color: string; // 粒子颜色，在创建时确定

	constructor(
		x: number,
		y: number,
		s: number,
		r: number,
		a: number,
		fn: {
			x: (x: number, y: number) => number;
			y: (x: number, y: number) => number;
			r: (r: number) => number;
			a: (a: number) => number;
		},
		idx: number,
		text: string,
		limitArray: number[],
		config: SakuraConfig,
	) {
		this.x = x;
		this.y = y;
		this.s = s;
		this.r = r;
		this.a = a;
		this.fn = fn;
		this.idx = idx;
		this.text = text;
		this.limitArray = limitArray;
		this.config = config;

		// 确定粒子颜色，在创建时只确定一次
		let particleColor = this.config.textParticles?.color || "#fff";
		if (Array.isArray(particleColor)) {
			particleColor =
				particleColor[Math.floor(Math.random() * particleColor.length)];
		}
		this.color = particleColor;
	}

	draw(cxt: CanvasRenderingContext2D) {
		cxt.save();
		cxt.translate(this.x, this.y);
		cxt.rotate(this.r);
		cxt.globalAlpha = this.a;
		cxt.font = `${16 * this.s}px '${this.config.textParticles?.font || "ZenMaruGothic-Medium"}', sans-serif`;
		cxt.fillStyle = this.color;
		cxt.textAlign = "center";
		cxt.textBaseline = "middle";
		cxt.fillText(this.text, 0, 0);
		cxt.restore();
	}

	update() {
		this.x = this.fn.x(this.x, this.y);
		this.y = this.fn.y(this.y, this.y);
		this.r = this.fn.r(this.r);
		this.a = this.fn.a(this.a);

		// 如果文字粒子越界或完全透明，重新调整位置
		if (
			this.x > window.innerWidth + 100 ||
			this.x < -100 ||
			this.y > window.innerHeight + 100 ||
			this.y < -100 ||
			this.a <= 0
		) {
			// 如果文字粒子不做限制
			if (this.limitArray[this.idx] === -1) {
				this.resetPosition();
			}
			// 否则文字粒子有限制
			else {
				if (this.limitArray[this.idx] > 0) {
					this.resetPosition();
					this.limitArray[this.idx]--;
				}
			}
		}
	}

	private resetPosition() {
		this.r = getRandom("fnr", this.config);
		if (Math.random() > 0.4) {
			this.x = getRandom("x", this.config);
			this.y = 0;
			this.s = getRandom("s", this.config);
			this.r = getRandom("r", this.config);
			this.a = getRandom("a", this.config);
		} else {
			this.x = window.innerWidth;
			this.y = getRandom("y", this.config);
			this.s = getRandom("s", this.config);
			this.r = getRandom("r", this.config);
			this.a = getRandom("a", this.config);
		}
	}
}

// 樱花列表类 - 支持多种粒子类型
class SakuraList {
	list: Particle[];

	constructor() {
		this.list = [];
	}

	push(particle: Particle) {
		this.list.push(particle);
	}

	update() {
		for (let i = 0, len = this.list.length; i < len; i++) {
			this.list[i].update();
		}
	}

	draw(cxt: CanvasRenderingContext2D) {
		for (let i = 0, len = this.list.length; i < len; i++) {
			this.list[i].draw(cxt);
		}
	}

	get(i: number) {
		return this.list[i];
	}

	size() {
		return this.list.length;
	}
}

// 获取随机值的函数
function getRandom(option: string, config: SakuraConfig): any {
	let ret: any;
	let random: number;

	switch (option) {
		case "x":
			ret = Math.random() * window.innerWidth;
			break;
		case "y":
			ret = Math.random() * window.innerHeight;
			break;
		case "s":
			ret =
				config.size.min +
				Math.random() * (config.size.max - config.size.min);
			break;
		case "r":
			ret = Math.random() * 6;
			break;
		case "a":
			ret =
				config.opacity.min +
				Math.random() * (config.opacity.max - config.opacity.min);
			break;
		case "fnx":
			random =
				config.speed.horizontal.min +
				Math.random() *
					(config.speed.horizontal.max - config.speed.horizontal.min);
			ret = (x: number, _y: number) => x + random;
			break;
		case "fny":
			random =
				config.speed.vertical.min +
				Math.random() *
					(config.speed.vertical.max - config.speed.vertical.min);
			ret = (_x: number, y: number) => y + random;
			break;
		case "fnr":
			ret = (r: number) => r + config.speed.rotation;
			break;
		case "fna":
			ret = (alpha: number) => alpha - config.speed.fadeSpeed * 0.01;
			break;
	}
	return ret;
}

// 樱花管理器类
export class SakuraManager {
	private config: SakuraConfig;
	private canvas: HTMLCanvasElement | null = null;
	private ctx: CanvasRenderingContext2D | null = null;
	private sakuraList: SakuraList | null = null;
	private animationId: number | null = null;
	private img: HTMLImageElement | null = null;
	private isRunning = false;

	constructor(config: SakuraConfig) {
		this.config = config;
	}

	// 初始化樱花特效
	async init(): Promise<void> {
		if (!this.config.enable || this.isRunning) {
			return;
		}

		// 创建图片对象
		this.img = new Image();
		this.img.src = this.config.image || "/sakura.png"; // 使用配置的图片路径，默认樱花图片

		// 等待图片加载完成
		await new Promise<void>((resolve, reject) => {
			if (this.img) {
				this.img.onload = () => resolve();
				this.img.onerror = () =>
					reject(new Error("Failed to load sakura image"));
			}
		});

		this.createCanvas();
		this.createSakuraList();
		this.startAnimation();
		this.isRunning = true;
	}

	// 创建画布
	private createCanvas(): void {
		this.canvas = document.createElement("canvas");
		this.canvas.height = window.innerHeight;
		this.canvas.width = window.innerWidth;
		this.canvas.setAttribute(
			"style",
			`position: fixed; left: 0; top: 0; pointer-events: none; z-index: ${this.config.zIndex};`,
		);
		this.canvas.setAttribute("id", "canvas_sakura");
		document.body.appendChild(this.canvas);
		this.ctx = this.canvas.getContext("2d");

		// 监听窗口大小变化
		window.addEventListener("resize", this.handleResize.bind(this));
	}

	// 创建樱花列表
	private createSakuraList(): void {
		if (!this.ctx) return;

		this.sakuraList = new SakuraList();

		// 计算总粒子数
		const totalParticles =
			this.config.sakuraNum +
			(this.config.textParticles?.enable
				? this.config.textParticles.num
				: 0);
		const limitArray = new Array(totalParticles).fill(
			this.config.limitTimes,
		);

		// 创建图片粒子
		if (this.img) {
			for (let i = 0; i < this.config.sakuraNum; i++) {
				const randomX = getRandom("x", this.config);
				const randomY = getRandom("y", this.config);
				const randomS = getRandom("s", this.config);
				const randomR = getRandom("r", this.config);
				const randomA = getRandom("a", this.config);
				const randomFnx = getRandom("fnx", this.config);
				const randomFny = getRandom("fny", this.config);
				const randomFnR = getRandom("fnr", this.config);
				const randomFnA = getRandom("fna", this.config);

				const sakura = new Sakura(
					randomX,
					randomY,
					randomS,
					randomR,
					randomA,
					{
						x: randomFnx,
						y: randomFny,
						r: randomFnR,
						a: randomFnA,
					},
					i,
					this.img,
					limitArray,
					this.config,
				);

				sakura.draw(this.ctx);
				this.sakuraList.push(sakura);
			}
		}

		// 创建文字粒子
		if (
			this.config.textParticles?.enable &&
			this.config.textParticles.texts.length > 0
		) {
			const textList = this.config.textParticles.texts;
			const textCount = this.config.textParticles.num;
			const colorList = Array.isArray(this.config.textParticles.color)
				? this.config.textParticles.color
				: [this.config.textParticles.color || "#fff"];

			for (let i = 0; i < textCount; i++) {
				const randomX = getRandom("x", this.config);
				const randomY = getRandom("y", this.config);
				const randomS = getRandom("s", this.config);
				const randomR = getRandom("r", this.config);
				const randomA = getRandom("a", this.config);
				const randomFnx = getRandom("fnx", this.config);
				const randomFny = getRandom("fny", this.config);
				const randomFnR = getRandom("fnr", this.config);
				const randomFnA = getRandom("fna", this.config);

				// 随机选择文字
				const randomText =
					textList[Math.floor(Math.random() * textList.length)];

				// 创建粒子前先临时修改配置，使用均衡分配的颜色
				// 保存原始颜色配置
				const originalColor = this.config.textParticles?.color;
				// 均衡分配颜色：按索引循环分配
				this.config.textParticles!.color =
					colorList[i % colorList.length];

				const textParticle = new TextParticle(
					randomX,
					randomY,
					randomS,
					randomR,
					randomA,
					{
						x: randomFnx,
						y: randomFny,
						r: randomFnR,
						a: randomFnA,
					},
					this.config.sakuraNum + i,
					randomText,
					limitArray,
					this.config,
				);

				// 恢复原始颜色配置
				this.config.textParticles!.color = originalColor;

				textParticle.draw(this.ctx);
				this.sakuraList.push(textParticle);
			}
		}
	}

	// 开始动画
	private startAnimation(): void {
		if (!this.ctx || !this.canvas || !this.sakuraList) return;

		const animate = () => {
			if (!this.ctx || !this.canvas || !this.sakuraList) return;

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.sakuraList.update();
			this.sakuraList.draw(this.ctx);
			this.animationId = requestAnimationFrame(animate);
		};

		this.animationId = requestAnimationFrame(animate);
	}

	// 处理窗口大小变化
	private handleResize(): void {
		if (this.canvas) {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		}
	}

	// 停止樱花特效
	stop(): void {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}

		if (this.canvas) {
			document.body.removeChild(this.canvas);
			this.canvas = null;
		}

		window.removeEventListener("resize", this.handleResize.bind(this));
		this.isRunning = false;
	}

	// 切换樱花特效
	toggle(): void {
		if (this.isRunning) {
			this.stop();
		} else {
			this.init();
		}
	}

	// 更新配置
	updateConfig(newConfig: SakuraConfig): void {
		const wasRunning = this.isRunning;
		if (wasRunning) {
			this.stop();
		}
		this.config = newConfig;
		if (wasRunning && newConfig.enable) {
			this.init();
		}
	}

	// 获取运行状态
	getIsRunning(): boolean {
		return this.isRunning;
	}
}

// 创建全局樱花管理器实例
let globalSakuraManager: SakuraManager | null = null;

// 初始化樱花特效
export function initSakura(config: SakuraConfig): void {
	if (globalSakuraManager) {
		globalSakuraManager.updateConfig(config);
	} else {
		globalSakuraManager = new SakuraManager(config);
		if (config.enable) {
			globalSakuraManager.init();
		}
	}
}

// 切换樱花特效
export function toggleSakura(): void {
	if (globalSakuraManager) {
		globalSakuraManager.toggle();
	}
}

// 停止樱花特效
export function stopSakura(): void {
	if (globalSakuraManager) {
		globalSakuraManager.stop();
		globalSakuraManager = null;
	}
}

// 获取樱花特效运行状态
export function getSakuraStatus(): boolean {
	return globalSakuraManager ? globalSakuraManager.getIsRunning() : false;
}

