
// Adding code for hourly carousel
function Carousel(setting) {

	/* Scope privates methods and properties */
	let privates = {};

	/* Privates properties */
	privates.setting = setting;

	privates.sel = {
		"main": document.querySelector(privates.setting.main),
		"wrap": document.querySelector(privates.setting.wrap),
		"children": document.querySelector(privates.setting.wrap).children,
		"prev": document.querySelector(privates.setting.prev),
        "next": document.querySelector(privates.setting.next),
	};

	privates.opt = {
        "position": 0,
        "scroll_percent": privates.setting.scroll_percent,
		"max_position": document.querySelector(privates.setting.wrap).children.length
	};

	// Control
	if(privates.sel.prev !== null) {
		privates.sel.prev.addEventListener('click', () => {
			this.prev_slide();
		});
	}

	if(privates.sel.next !== null) {
		privates.sel.next.addEventListener('click', () => {
			this.next_slide();
		});
	}

    /* Public methods */
    // Prev slide
    this.prev_slide = () => {
        --privates.opt.position;

        if(privates.opt.position < 0) {
            privates.sel.wrap.classList.add('s-notransition');
            privates.opt.position = privates.opt.max_position - 1;
        }

        privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position*privates.opt.scroll_percent}%)`;
    };


    // Next slide
    this.next_slide = () => {
        ++privates.opt.position;

        if(privates.opt.position >= privates.opt.max_position) {
            privates.opt.position = 0;
        }

        privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position*privates.opt.scroll_percent}%)`;
    };
}

new Carousel({
	"main": "#hourly-carousel",
	"wrap": "#facts_hour_list",
	"prev": ".hourly-carousel__prev",
    "next": ".hourly-carousel__next",
    "scroll_percent": 40
});

new Carousel({
	"main": "#daily-carousel",
	"wrap": "#forecast_daily_list",
	"prev": ".daily-carousel__prev",
    "next": ".daily-carousel__next",
    "scroll_percent": 28
});

export {Carousel};