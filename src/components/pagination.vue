<template>
    <div class="pagination">
        <a class="prev disabled" @click="prev"><</a>
        <a v-for="p in pages" :class="{'current':p.num==current}" @click="jump(p.num)" v-text="p.num"></a>
        <a class="next" @click="next">></a>
        <em class="skip"><i>到第</i><input type="text" v-model="page" @keyup.13="jump(page)"><i>页</i></em><a class="jump" @click="jump(page)">确定</a></div>
    </div>
</template>



<script>
    export default {
        data() {
            return {
                pages: [{
                    num: 1
                }],
                pagelen: 1,
                total: 0,
                page: this.$parent.page
            }
        },

        methods: {
            initpage: function(total, page) {
                var _t = this;
                _t.total = total;
                _t.page = page + 1;

                _t.pagelen = parseInt(_t.total / _t.$parent.limit);
                if (_t.total % _t.$parent.limit != 0) {
                    _t.pagelen += 1;
                }

                if (_t.pagelen == 0) {
                    _t.pagelen = 1;
                }
                _t.pages = [];
                if (_t.pagelen > 10) {
                    var d = parseInt((_t.page - 1) / 5) * 5;
                    if (parseInt((_t.page - 1) / 5) * 5 + 10 > _t.pagelen - 1) {
                        d = parseInt((_t.page - 1) / 5) * 5 - (parseInt((_t.page - 1) / 5) * 5 + 10 - (_t.pagelen));
                    }

                    for (var j = 0; j < 10; j++, d++) {
                        _t.pages.$set(j, {
                            num: d + 1
                        });
                    }

                } else {
                    for (var j = 0; j < _t.pagelen; j++) {
                        _t.pages.$set(j, {
                            num: j + 1
                        });
                    }
                }



            },

            recountpage: function() {
                var _t = this;

                for (var j = parseInt(_t.page / 5); j < parseInt(_t.page / 5) + 10; j++) {
                    _t.pages.$set(j, {
                        num: j + 1
                    });
                }
            },

            prevpage: function() {
                if (this.page - 1 > 0) {
                    this.$parent.page -= 1;
                    this.$parent.getData();
                }
            },

            nextpage: function() {
                if (this.page < this.pagelen) {
                    this.$parent.page += 1;
                    this.$parent.getData();
                }
            },

            jumppage: function(pagenum) {

                if (pagenum > this.pagelen) {
                    bootbox.alert('页码超出范围');
                    return false;
                }

                if (pagenum != this.$parent.page + 1) {
                    this.$parent.page = pagenum - 1;
                    this.$parent.getData();
                }

            },
        }
    }
</script>