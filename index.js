$(function () {
    let vm = new Vue({
        el: '#app',
        data: {
            racing: false,
            winner: null,
            inuyasha: 0,
            koga: 0,
            tick: 0,
            interval: null
        },
        computed: {
            winning() {
                if (this.inuyasha == this.koga) return null

                return this.inuyasha > this.koga ? 'InuYasha' : 'Koga'
            },
            kogaStyle() {
                return {
                    left: `${this.koga}vw`
                }
            },
            kogaClass() {
                if (!this.winner) return
                return this.winner == 'Koga' ? 'animated swing infinite winner' : 'animated hinge'
            },
            inuyashaStyle() {
                return {
                    left: `${this.inuyasha}vw`
                }
            },
            inuyashaClass() {
                if (!this.winner) return
                return this.winner == 'InuYasha' ? 'animated swing infinite winner' : 'animated hinge'
            }
        },
        methods: {
            startRace() {
                this.restart()
                this.racing = true

                this.interval = setInterval(() => {
                    this.progressPlayers()
                }, 50)
            },
            progressPlayers() {
                this.tick++
                this.inuyasha += (Math.random() >= .3) ? 1 : 0
                this.koga += (Math.random() >= .5) ? 1 : 0
                this.checkVictory()
            },
            checkVictory() {
                if (this.inuyasha == this.koga) return

                if (this.inuyasha >= 90) {
                    this.declareVictory('InuYasha')
                }

                if (this.koga >= 90) {
                    this.declareVictory('Koga')
                }
            },
            declareVictory(player) {
                clearInterval(this.interval)
                this.interval = null
                this.racing = false
                this.winner = player
            },
            restart() {
                this.racing = false
                this.winner = null
                this.inuyasha = 0
                this.koga = 0
                this.tick = 0
            }
        }
    })
});