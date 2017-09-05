<template>
    <div>
        <div class="shopcart">
            <div class="centent">
                <div class="centent-left" @click="taggleList">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{highlight:totaCount>0}">
                            <span class="icon-shopping_cart"></span>
                        </div>
                        <div class="num" v-show="this.totaCount !==0">{{totaCount}}</div>
                    </div>
                    <div class="price" :class="{'price-enough': totaPrice > 0}">￥{{totaPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="centent-right">
                    <div class="par" v-if="totaPrice == 0">
                        ￥{{minPrice}}元起送
                    </div>
                    <div class="par" v-else-if="totaPrice > 0 && totaPrice < minPrice">
                        还差￥{{minPrice - totaPrice}}元起送
                    </div>
                    <div class="par-enough" @click="pay" v-else>
                        去结算
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div class="ball" v-for="(item,index) in balls" :key="index" v-show="item.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition-group>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h2 class="title">购物车</h2>
                        <span class="emput" @click="emput">清空</span>
                    </div>
                    <div class="list-centent" ref="listCentent">
                        <ul>
                            <li class="food" v-for="(food,index) in  selectFoods" :key="index">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    {{food.price*food.count}}
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" @cartadd="drop"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-maxk" v-show="listShow" @click="heideList"></div>
        </transition>
    </div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol';
export default {
    props: {
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        },
        selectFoods: {
            type: Array
        }
    },
    data() {
        return {
            balls: [
                {
                    show: false,
                    el: {}
                },
                {
                    show: false,
                    el: {}
                },
                {
                    show: false,
                    el: {}
                },
                {
                    show: false,
                    el: {}
                },
                {
                    show: false,
                    el: {}
                }
            ],
            dropBalls: [],
            fold: false
        };
    },
    computed: {
        listShow() {
            if (!this.totaCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            return show;
        },
        totaPrice() {
            let total = 0;
            this.selectFoods.forEach(function(food) {
                total += food.price * food.count;
            });
            return total;
        },
        totaCount() {
            let count = 0;
            this.selectFoods.forEach(function(food) {
                count += food.count;
            });
            return count;
        }
    },
    methods: {
        pay() {
            window.alert(this.totaPrice);
            this.emput();
        },
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeEnter(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter(el, done) {
            /* eslint-disable no-unused-vars */
            let redraw = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);
            });
        },
        afterEnter(el) {
            let ball = this.dropBalls.shift();
            if (ball) {           /* 对象是引用类型，会修改balls对应的值 */
                ball.show = false;
                el.style.display = 'none';
            }
        },
        emput() {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            });
        },
        taggleList() {
            if (!this.totaCount) {
                return;
            }
            this.fold = !this.fold;
        },
        heideList() {
            this.fold = true;
        }
    },
    components: { cartcontrol }
};
</script>
<style lang="scss">
.shopcart {
    position: fixed;
    z-index: 9;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 48px;
    .centent {
        display: flex;
        background: #141d27;
        font-size: 0;
        .centent-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                position: relative;
                padding: 6px;
                top: -10px;
                margin: 0 12px;
                width: 44px;
                height: 44px;
                text-align: center;
                background: #141d27;
                border-radius: 50%;
                .highlight {
                    background: #00a0dc !important;
                    .icon-shopping_cart {
                        color: #fff !important;
                    }
                }
                .logo {
                    width: 100%;
                    height: 100%;
                    background: rgba(43, 52, 60, 0.4);
                    border-radius: 50%;
                    .icon-shopping_cart {
                        font-size: 24px;
                        line-height: 44px;
                        color: #80858a;
                    }
                }
                .num {
                    position: absolute;
                    top: 0px;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    line-height: 16px;
                    text-align: center;
                    background: rgb(240, 20, 20);
                    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
                    border-radius: 10px;
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                color: #80858a;
            }
            .price-enough {
                color: #fff;
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                margin: 12px 12px 0 12px;
                ;
                font-size: 12px;
                line-height: 24px !important;
                color: #80858a;
                line-height: 14px;
            }
        }
        .centent-right {
            flex: 0 0 110px;
            width: 110px;
            .par {
                height: 48px;
                font-size: 12px;
                line-height: 48px;
                text-align: center;
                font-weight: 700;
                color: #979a9c;
                background: #2b333b;
            }
            .par-enough {
                height: 48px;
                font-size: 12px;
                line-height: 48px;
                text-align: center;
                font-weight: 700;
                color: #fff;
                background: #00b43c;
            }
        }
    }
    .ball-container {
        .drop-enter-active,
        .drop-leave-active {
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0, 160, 220);
                transition: all 0.4s linear;
            }
        }
        .drop-enter,
        .drop-leave-to {}
        .ball {
            position: fixed;
            bottom: 22px;
            left: 32px;
            z-index: 999;
        }
    }
    .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        transition: all 0.5s;
        transform: translate3d(0, -100%, 0);
        .list-header {
            padding: 0 18px;
            height: 40px;
            background: #f3f5f7;
            font-size: 0px;
            border-bottom: 2px solid rgba(7, 17, 27, 0.1);
            .title {
                float: left;
                font-size: 14px;
                line-height: 40px;
                color: rgb(7, 17, 27);
            }
            .emput {
                float: right;
                font-size: 12px;
                line-height: 40px;
                color: #00a0dc;
            }
        }
        .list-centent {
            max-height: 218px;
            overflow: auto;
            overflow-y: scroll;
            overflow-x: hidden;
            background: #fff;
            .food {
                display: flex;
                overflow: hidden;
                margin: 0 18px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .name {
                    flex: 5;
                    padding: 12px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    line-height: 24px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .price {
                    &::before {
                        display: inline-block;
                        vertical-align: top;
                        content: ' ￥';
                        font-size: 10px;
                        line-height: 48px;
                    }
                    display: inline-block;
                    box-sizing: inherit;
                    flex: 2;
                    line-height: 48px;
                    text-align: center;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cartcontrol-wrapper {
                    flex: 3;
                    padding-top: 9px;
                }
            }
        }
    }
    .fold-enter,
    .fold-leave-to {
        transform: translate3d(0, 0, 0);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.list-maxk {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    background: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in below version 2.1.8 */

{
    opacity: 0;
    background: rgba(7, 17, 27, 0);
}
</style>


