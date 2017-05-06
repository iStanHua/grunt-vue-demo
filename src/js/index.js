Vue.component('grid-table', {
    template: '#grid-template',
    props: ['data', 'columns'],
    methods: {
        loadEntry: function(key) {
            this.$emit('update', key)
        },
        deleteEntry: function(entry) {
            this.$emit('delete', entry)
        }
    }
});
Vue.component('layer', {
    template: '#layer-template',
    props: ['data', 'show'],
    methods: {
        close: function() {
            this.$emit('close')
        },
        save: function() {
            this.$emit('save')
        }
    }
});
Vue.component('countdown', {
    template: '#countdown-template',
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

});
var vm = new Vue({
    el: '#app',
    data: {
        gridColumns: ['customerId', 'companyName', 'address', 'phone'],
        gridData: null,
        apiUrl: 'http://211.149.193.19:8080/api/customers',
        item: Object,
        show: false,
        focused: false,
        loading: true
    },
    created: function() {
        this.getCustomers()
    },
    methods: {
        inputfocus: function() {
            this.focused = true;
        },
        inputblur: function() {
            this.focused = false;
        },
        close: function() {
            this.show = false
        },
        getCustomers: function() {
            var self = this;
            this.$http.get(this.apiUrl)
                .then(function(response) {
                    self.gridData = response.data;
                    this.loading = false;
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        loadCustomer: function(customerId) {
            var self = this;
            if (customerId == undefined) {
                self.item = {};
                self.show = true;
                return;
            }
            self.gridData.forEach(function(data) {
                if (data.customerId === customerId) {
                    self.item = data;
                    self.show = true;
                    return false;
                }
            });
        },
        saveCustomer: function() {
            if (this.item.customerId == undefined) {
                this.createCustomer()
            } else {
                this.updateCustomer()
            }
            this.show = false
        },
        createCustomer: function() {
            var self = this
            self.$http.post(self.apiUrl, self.item)
                .then((response) => {
                    self.getCustomers()
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        updateCustomer: function() {
            var self = this
            self.$http.put(self.apiUrl + '/' + self.item.customerId, self.item)
                .then((response) => {
                    // self.getCustomers()
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        deleteCustomer: function(customerId) {
            var self = this
            self.$http.delete(self.apiUrl + '/' + customerId)
                .then((response) => {
                    self.getCustomers()
                })
                .catch(function(response) {
                    console.log(response)
                })
        }
    }
});
vm.$watch('show', function(newVal, oldVal) {
    if (!newVal) {
        this.item = {}
    }
})