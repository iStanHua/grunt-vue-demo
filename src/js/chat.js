Vue.use(VueSocketio, 'http://socketserver.com:1923');

var vm = new Vue({
    el: '#app',
    data: {
        join: false,
        user: { id: 0, name: '', pic: 'images/logo.png' },
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
            { id: 2, name: '斯坦华', pic: 'images/logo.png', message: '@寻百度 您好!' }
        ]
    },
    methods: {
        joinChat: function() {
            var _name = this.user.name;
            if (_name) {
                // this.$socket.emit('join', name);
                this.users.forEach(function(u) {
                    if (u.name == _name) {
                        console.log(u);
                        this.user.id = u.id;
                        return false;
                    }
                });
                if (this.user.id == 0) {
                    var _len = this.users.length;
                    this.user.id = _len + 1;
                    this.users.push(this.user);
                }
                this.join = true;
            }
        },
        send: function(message) {
            if (message) {
                this.messages.push({ id: this.pic, name: this.name, pic: this.pic, message: message });
                this.message = null;
                // this.$socket.emit('send', message);
                // this.$set('message', null);
            }
        }
    },
    computed: {

    },
    watch: {},
    sockets: {
        users: function(users) {
            this.$set('users', users);
        },
        joined: function() {
            this.$set('join', true)
        },
        messages: function(data) {
            this.$set('messages', data);
        },
        onmessage: function(data) {
            this.messages.push(data);
        },
        adduser: function(user) {
            this.users.push(user);
        }
    }
});