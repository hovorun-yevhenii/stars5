Vue.component("rate-star", {
    template: "#rate-star",
    props: {
        rating: Number,
        value: Number,
        stars_count: Number,
        clr_prime: String,
        clr_second: String
    },
    computed: {
        starColor() {
            return this.value > this.rating ? this.clr_second : this.clr_prime;
        },
        starWidth() {
            return `${100 / this.stars_count}%`;
        }
    }
});

Vue.component("app-rate", {
    template: "#app-rate",
    props: {
        max: {
            default: 5,
            type: Number
        },
        clr_prime: {
            type: String,
            default: "#EBB82F"
        },
        clr_second: {
            type: String,
            default: "#E3E3E3"
        },
        label: String,
        refer: String
    },
    data() {
        return {
            rating: 0,
            selected: 0
        };
    },
    methods: {
        mouseMove({ offsetX, target }) {
            offsetX = offsetX < 16 ? 0 : offsetX;
            // 16px - left padding enables discard selected rating
            this.rating = Math.ceil(offsetX * this.max / target.clientWidth);
        },
        mouseOut() {
            this.rating = this.selected;
        },
        selectRating() {
            this.selected = this.rating;

            this.$emit("change", {
                refer: this.refer,
                value: this.rating,
                max: this.max,
                percentage: Math.round(100 * this.rating / this.max)
            });
        }
    }
});

Vue.component("app-modal", {
    template: "#app-modal",
    data() {
        return {
            ratings: {},
            quiz: {
                food_rating: {
                    refer: "food",
                    label: "How would you rate your food?"
                },
                driver_rating: {
                    refer: "driver",
                    label: "How would you rate your delivery driver?"
                },
                experience_rating: {
                    refer: "experience",
                    label: "How would you rate your overall experience?"
                }
            }
        };
    },
    methods: {
        setRating(rating) {
            this.ratings[`${rating.refer}_rating`] = rating;
        },
        close_modal(submit) {
            this.$emit("close_modal", submit ? this.ratings : {});
        }
    }
});

new Vue({
    el: "#app",
    data() {
        return {
            modalIsOpen: true,
            ratings: {},
        };
    },
    computed: {
        json() {
            if (!this.ratings || !Object.keys(this.ratings).length) return "";

            return JSON.stringify(this.ratings, undefined, 4);
        }
    },
    methods: {
        openModal() {
            this.modalIsOpen = true;
        },
        close_modal(ratings) {
            this.modalIsOpen = false;
            this.ratings = ratings;
        }
    }
});
