Vue.use(VueSocketio, 'http://socketserver.com:1923');

var vm = new Vue({
    el: '#app',
    data: {
        join: false,
        id: 0,
        name: '',
        pic: '',
        users: [
            { id: 1, name: '寻百度', pic: 'images/logo.png' },
            { id: 2, name: '斯坦华', pic: 'images/logo.png' },
            { id: 3, name: '大中华', pic: 'images/logo.png' }
        ],
        message: null,
        messages: [
            { id: 1, name: '寻百度', pic: 'images/logo.png', message: '你好' },
            { id: 1, name: '寻百度', pic: 'images/logo.png', message: '很高兴认识大家' },
            { id: 3, name: '大中华', pic: 'images/logo.png', message: '呵呵' },
            { id: 2, name: '斯坦华', pic: 'images/logo.png', message: '哈哈哈哈哈哈哈' },
            { id: 1, name: '寻百度', pic: 'images/logo.png', message: '...' },
            { id: 2, name: '斯坦华', pic: 'images/logo.png', message: '......' }
        ]
    },
    methods: {
        joinChat: function (name) {
            if (name) {
                // this.$socket.emit('join', name);
                var _len = this.users.length;
                this.id = _len + 1;
                this.name = name;
                this.pic = 'images/logo.png';
                if (this.users.indexOf(this.user) > -1) return;
                this.users.push(this.user);
                this.join = true;
            }
        },
        send: function (message) {
            if (message) {
                this.messages.push({ id: this.pic, name: this.name, pic: this.pic, message: message });
                this.message = null;
                // this.$socket.emit('send', message);
                // this.$set('message', null);
            }
        }
    },
    computed: {
        user: function () {
            var _user = {};
            _user.id = this.id;
            _user.name = this.name;
            _user.pic = this.pic;
            return _user;
        }
    },
    watch: {
        messages: function () {
            // setTimeout(function () {
            //     $('.messages ul').scrollTop(999999999);
            // }, 100)
        }
    },
    sockets: {
        users: function (users) {
            this.$set('users', users);
        },
        joined: function () {
            this.$set('join', true)
        },
        messages: function (data) {
            this.$set('messages', data);
        },
        onmessage: function (data) {
            this.messages.push(data);
        },
        adduser: function (user) {
            this.users.push(user);
        }
    }
});