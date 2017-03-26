Vue.component('child', {
    props: ['myMessage'],
    template: '<span>{{ myMessage }}</span>'
});

var vm = new Vue({
    el: '#app',
    data: {

    },
    methods: {

    },
    watch: {

    }
});