var STORAGE_KEY = 'vue-liuyanban'
var msgStorage = {
    fetch: function () {
        var msgs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        msgs.forEach(function (msg, index) {
            msg.id = index
        })
        msgStorage.uid = msgs.length
        return msgs
    },
    save: function (msgs) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs))
    }
}

var app = new Vue({
    el: '#app',
    data: {
        msgs: msgStorage.fetch(),
        newMsg: ''
    },

    watch: {
        msgs: {
            handler: function (msgs) {
                msgStorage.save(msgs)
            },
            deep: true
        }
    },
    methods: {
        addMsg: function () {
            var value = this.newMsg && this.newMsg.trim()
            if (!value) {
                return
            }
            this.msgs.push({
                sid: msgStorage.uid++,
                title: value
            })
            this.newMsg = ''
        },

        removeMsgs: function () {
            msgStorage.uid = 0;
            return this.msgs = [];
        }
    }
})