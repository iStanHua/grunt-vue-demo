Vue.component('grid-table', {
    template: '#grid-template',
    props: ['dataList', 'columns'],
    data: function() {
        return {
            showLayer: false
        }
    },
    components: {
        'layer': {
            template: '#edit-template',
            props: ['showLayer']
        }
    },
    methods: {
        editLayer: function() {
            this.showLayer = true;
        }
    }
})
var vm = new Vue({
    el: '#app',
    data: {
        gridColumns: ['customerId', 'companyName', 'contactName', 'address', 'phone'],
        gridData: null,
        apiUrl: 'http://211.149.193.19:8080/api/customers',
    },
    created: function() {
        this.getCustomers()
    },
    methods: {
        getCustomers: function() {
            var self = this;
            this.$http.get(this.apiUrl)
                .then(function(response) {
                    self.gridData = response.data;
                })
                .catch(function(response) {
                    console.log(response)
                })
        },
        editLayer: function() {
            this.showLayer = true;
        }
    }
})