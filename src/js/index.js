Vue.component('grid-table', {
    template: '#grid-template',
    props: ['dataList', 'columns']
})
Vue, use();
var vm = new Vue({
    el: '#app',
    data: {
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: [],
        apiUrl: 'http://211.149.193.19:8080/api/customers'
    },
    ready: function() {
        this.getCustomers()
    },
    methods: {
        getCustomers: function() {
            this.$http.get(this.apiUrl)
                .then(function(response) {
                    this.$set('gridData', response.data)
                })
                .catch(function(response) {
                    console.log(response)
                })
        }
    }
})