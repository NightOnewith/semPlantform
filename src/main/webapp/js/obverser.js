/**
 * Created by BULK on 2016/12/10.
 */

function Obverser() {
    this.evs = [];
}

Obverser.prototype = {
    sub: function (ev, callback) {
        this.evs.push({
            name: ev,
            callback: callback
        });
    },
    pub: function(ev) {
        var len = this.evs.length;
        for(var i = 0; i < len; i ++) {
            if(this.evs[i].name === ev) {
                this.evs[i].callback();
            }
        }
    }
}

var _ob = new Obverser();
