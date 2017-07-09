
var calendar = new Vue({
    el: '#app',
    data: {
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        days: [],
        nowMonth: null,
        nowYear: null,
        nowDate: null
    },
    computed: {
        today: function () {
            var date = new Date();
            if (this.nowYear === date.getFullYear() && this.nowMonth === date.getMonth()) {
                return (this.getFirstDay(this.nowYear, this.nowMonth) + this.nowDate - 1);
            }
            return false;
        },
        formatNowMonth: function () {
            if (this.nowMonth < 9) {
                return '0' + (this.nowMonth + 1);
            }
            return this.nowMonth + 1;
        }
    },
    created() {
        this.$nextTick(() => {
            this.nowDate();
            this.init();
        })
    },
    methods: {
        // 获取当月天数
        getDates: function (year, month) {
            var date = new Date(year, month + 1, 0);
            return date.getDate();
        },
        // 获取当月第一天是星期几
        getFirstDay: function (year, month) {
            var date = new Date();
            var firstDay = new Date(year, month, 1);
            return firstDay.getDay();
        },
        nowDate: function () {
            var date = new Date();
            this.nowYear = date.getFullYear();
            this.nowMonth = date.getMonth();
            this.nowDate = date.getDate();
        },
        init: function () {
            this.days = [];
            var date = new Date();
            var dates = this.getDates(this.nowYear, this.nowMonth);
            var firstDay = this.getFirstDay(this.nowYear, this.nowMonth);
            var totalLength = 42;
            if (firstDay != 0) {
                for (let i = 0; i < firstDay; i++) {
                    this.days.push('');
                }
            }
            for (let i = 0; i < dates; i++) {
                this.days.push(i + 1);
            }
            var daysLength = this.days.length;
            if (daysLength < totalLength) {
                for (let i = 0; i < totalLength - daysLength; i++)
                    this.days.push('');
            }
        },
        preMonth: function () {
            if (this.nowMonth <= 0) {
                this.nowYear -= 1;
                this.nowMonth = 11;
            } else {
                this.nowMonth -= 1;
            }
            this.init();
        },
        nextMonth: function () {
            if (this.nowMonth >= 11) {
                this.nowYear += 1;
                this.nowMonth = 0;
            } else {
                this.nowMonth += 1;
            }
            this.init();
        },
        showDate: function (day) {
            if (day === '') {
                return;
            }
            alert(this.nowYear + '-' + (this.nowMonth + 1) + '-' + (day));
        }
    }
});