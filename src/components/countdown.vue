<template id="countdown-template">
    <div class="countdown">{{countdown}}</div>
</template>

<script>
    export default {
        props: ['deadline'],
        data: function() {
            return {
                now: Math.trunc((new Date()).getTime() / 1000),
                date: null
            }
        },
        mounted: function() {
            this.setnow();
        },
        filters: {
            digits: function(v) {
                var _val = v.toString();
                if (_val.length <= 1) {
                    return '0' + _val
                }
                return _val;
            }
        },
        watch: {
            // now: 'setnow',
            // date: 'setnow'
        },
        computed: {
            countdown: function() {
                var _t = this.date - this.now;
                return Math.trunc(_t / 60 / 60 / 24) + '天' + Math.trunc(_t / 60 / 60 % 24) + ':' + Math.trunc(_t / 60 % 60) + ':' + Math.trunc(_t % 60)
            }
        },
        methods: {
            setnow: function() {
                this.date = Math.trunc(Date.parse(this.deadline) / 1000)
                setInterval(function() {
                    this.now = Math.trunc((new Date()).getTime() / 1000)
                }, 1000);
            }
        }
    }
</script>