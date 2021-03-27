// Adding code for hourly carousel
class Carousel {
	constructor(setting){
	
		/* Privates properties */
		this.setting = setting;

		this.sel = {
			"main": document.querySelector(this.setting.main),
			"wrap": document.querySelector(this.setting.wrap),
			"children": document.querySelector(this.setting.wrap).children,
			"prev": document.querySelector(this.setting.prev),
			"next": document.querySelector(this.setting.next),
		};

		this.opt = {
			"position": 0,
			"scroll_percent": this.setting.scroll_percent,
			"max_position": document.querySelector(this.setting.wrap).children.length
		};

		// Control
		if(this.sel.prev !== null) {
			this.sel.prev.addEventListener('click', () => {
				this.prev_slide();
			});
		}

		if(this.sel.next !== null) {
			this.sel.next.addEventListener('click', () => {
				this.next_slide();
			});
		}
	}
    /* Public methods */
    // Prev slide
    prev_slide = () => {
        --this.opt.position;

        if(this.opt.position < 0) {
            this.sel.wrap.classList.add('s-notransition');
            this.opt.position = this.opt.max_position - 1;
        }

        this.sel.wrap.style["transform"] = `translateX(-${this.opt.position*this.opt.scroll_percent}%)`;
    };


    // Next slide
    next_slide = () => {
        ++this.opt.position;

        if(this.opt.position >= this.opt.max_position / 2) {
            this.opt.position = 0;
        }

        this.sel.wrap.style["transform"] = `translateX(-${this.opt.position*this.opt.scroll_percent}%)`;
	};
	
	updateMaxPosition = () => {
		this.opt.max_position = document.querySelector(this.setting.wrap).children.length;
	}
}

const hourlyCarousel = new Carousel({
	"main": "#hourly-carousel",
	"wrap": "#facts_hour_list",
	"prev": ".hourly-carousel__prev",
    "next": ".hourly-carousel__next",
    "scroll_percent": 40
});

const dailyCarousel = new Carousel({
	"main": "#daily-carousel",
	"wrap": "#forecast_daily_list",
	"prev": ".daily-carousel__prev",
    "next": ".daily-carousel__next",
    "scroll_percent": 28
});

export {Carousel, hourlyCarousel, dailyCarousel};