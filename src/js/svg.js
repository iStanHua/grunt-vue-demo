new Vue({
    el: '#app',
    data() {
        return {
            anchors: {},
            points: {},
            references: {
                anchors: { c: [750, 500], t: [750, 200], r: [1200, 600], b: [975, 850], l: [300, 500] },
                points: { a: [100, 400], b: [275, 300], c: [475, 425], d: [250, 50], e: [525, 200], f: [725, 50], g: [950, 150], h: [975, 375], i: [1025, 175], j: [1125, 125], k: [1050, 350], l: [1150, 400], m: [1350, 375], n: [1325, 650], o: [1450, 625], p: [1250, 725], q: [900, 775], r: [650, 600], s: [750, 750], t: [525, 925], u: [500, 750], v: [125, 550], w: [50, 625], x: [75, 700], y: [475, 800] }
            }
        }
    },
    computed: {
        anchorLineA() { return `M${[this.anchors.c, this.anchors.l]}` },
        anchorLineB() { return `M${[this.anchors.c, this.anchors.t]}` },
        anchorLineC() { return `M${[this.anchors.c, this.anchors.r, this.points.h]}` },
        anchorLineD() { return `M${[this.anchors.c, this.points.q, this.anchors.b]}` },
        floatPoints() { return `M${[this.anchors.l, this.points.a, this.points.b, this.points.c, this.anchors.l, this.points.b, this.points.d, this.points.e, this.points.f, this.points.g, this.anchors.t, this.points.e, this.points.c, this.anchors.t, this.points.h, this.points.i, this.points.g, this.points.j, this.points.i, this.points.k, this.points.h, this.points.l, this.points.k, this.points.m, this.points.l, this.anchors.r, this.points.m, this.points.n, this.points.o, this.points.p, this.points.n, this.anchors.r, this.points.p, this.anchors.b, this.anchors.r, this.points.q, this.points.r, this.points.s, this.points.q, this.points.t, this.points.u, this.points.r, this.anchors.l, this.points.v, this.points.w, this.anchors.l, this.points.u, this.points.w, this.points.x, this.points.u, this.points.y, this.points.t, this.points.r]}` }
    },
    beforeMount() {
        this.initPoints()
        setTimeout(() => {
            Object.keys(this.references.anchors).forEach((key, index) => {
                this.initAnimation(key, this.references.anchors[key], index, true)
            })

            Object.keys(this.references.points).forEach((key, index) => {
                this.initAnimation(key, this.references.points[key], index)
            })
        }, 500)
    },
    methods: {
        randomInt(min, max) {
            return (Math.random() * (max - min + 1) | 0) + min
        },
        randomFloat(min, max) {
            return parseFloat(((Math.random() * (max - min)) + min).toFixed(2))
        },
        initPoints() {
            let anchors = {}
            let points = {}
            Object.keys(this.references.anchors).forEach(anchor => anchors[anchor] = this.references.anchors.c)
            Object.keys(this.references.points).forEach(point => points[point] = this.references.anchors.c)
            this.anchors = anchors
            this.points = points
        },
        initAnimation(key, ref, index, anchor) {
            let duration = this.randomFloat(2, 3)
            let delay = anchor ?
                index * 0.45 :
                index * 0.06
            if (!anchor) {
                this.animatePoint({
                    key,
                    ref,
                    delay,
                    duration,
                    dest: [ref[0], ref[1]]
                })
            } else {
                TweenLite.to(this.anchors, duration, {
                    delay,
                    [key]: [ref[0], ref[1]],
                    ease: Sine.easeOut
                })
            }
        },
        setAnimation(key, ref) {
            let [x, y] = ref
            let duration = this.randomFloat(2, 3)
            let xOffset = this.randomInt(x - 25, x + 25)
            let yOffset = this.randomInt(y - 25, y + 25)
            this.animatePoint({
                key,
                ref,
                duration,
                dest: [xOffset, yOffset]
            })
        },
        animatePoint({ key, ref, duration, dest, delay = 0 }) {
            // TweenLite.to(this.points, duration, {
            //     delay,
            //     [key]: dest,
            //     ease: Sine.easeInOut,
            //     onComplete: this.setAnimation,
            //     onCompleteParams: [key, ref]
            // })
        },
        setPoints() {
            this.anchors = this.references.anchors
            this.points = this.references.points
        }
    }
})