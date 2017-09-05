<template>
    <transition name="move">
        <div class="food-par" ref="foodpar" v-show="showFlag">
            <div>
                <div class="img-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="_hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h2 class="title">{{food.name}}</h2>
                    <div class="datail">
                        <span class="sell-count">月售{{food.sellCount}}</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <transition name="buy">
                        <div class="cartcontrol-wrapper" v-if="food.count>0" key="car">
                            <cartcontrol :food="food" @cartadd="events"></cartcontrol>
                        </div>
                        <div class="buy" key="buy" v-else @click.stop.prevent="_pushcount">加入购物车</div>
                    </transition>
                </div>
                <div v-if="food.info">
                    <div class="line"></div>
                    <div class="info">
                        <div class="title">商品介绍</div>
                        <span>{{food.info}}</span>
                    </div>
                </div>
                <div class="line"></div>
                <div class="ratingss">
                    <div class="title">商品评价</div>
                    <ratingselect @togglecontent="toggleCon" @pusttype="settype" :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li class="rating-item" v-for="(rating,index) in food.ratings" :key="index" v-show="filterRating(rating.rateType,rating.text)">
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <i :class="{ 'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}"></i>
                                    <span>{{rating.text}}</span>
                                </p>
                                <div class="user">
                                    <span class="user-name">{{rating.username}}</span>
                                    <img :src="rating.avatar" alt="" class="user-img" width="12" height="12">
                                </div>
                            </li>
                        </ul>
                        <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">
                            暂无评价
                        </div>
                    </div>
                </div>
                <div style="height:48px"></div>
            </div>
        </div>
    </transition>
</template>
<script>
const ALL = 2;
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import ratingselect from '../ratingselect/ratingselect';
import { formatDate } from '../../common/js/date';
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: false,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    methods: {
        show() {
            this.showFlag = true;
            this.selectType = ALL;
            this.onlyContent = false;
            if (!this.scroll) {
                this.$nextTick((food) => {
                    this.scroll = new BScroll(this.$refs.foodpar, {
                        click: true
                    });
                });
            } else {
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        settype(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        toggleCon(onlyContent) {
            this.onlyContent = !onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        events(event) {
            this.$nextTick(() => {
                this.$emit('cartadd', event);
            });
        },
        _hide() {
            this.showFlag = false;
        },
        _pushcount() {
            Vue.set(this.food, 'count', 1);
        },
        filterRating(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        }
    },
    components: {
        cartcontrol, ratingselect
    }
};
</script>
<style lang="scss">
.food-par {
    position: fixed;
    top: 0;
    left: 0; // bottom: 48px;
    z-index: 7;
    width: 100%;
    height: 100%;
    background: #fff;
    .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
        }
        .back {
            position: absolute;
            top: 10px;
            left: 0;
            .icon-arrow_lift {
                display: block;
                padding: 10px;
                font-size: 20px;
                color: #fff;
            }
        }
    }
    .content {
        position: relative;
        font-size: 0px;
        padding: 18px;
        .title {
            padding-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
            line-height: 14px;
        }
        .datail {
            padding-bottom: 18px;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            .sell-count {
                margin-right: 12px;
            }
        }
        .price {
            .now {
                font-size: 14px;
                font-weight: 700;
                ;
                color: rgb(240, 20, 20);
                line-height: 24px;
            }
            .old {
                font-size: 10px;
                font-weight: normal;
                color: rgb(147, 153, 159);
                line-height: 24px;
                text-decoration: line-through;
            }
        }
        .cartcontrol-wrapper {
            position: absolute;
            right: 18px;
            bottom: 16px;
        }
        .buy {
            position: absolute;
            right: 18px;
            bottom: 18px;
            width: 74px;
            padding: 6px;
            font-size: 12px;
            line-height: 12px;
            text-align: center;
            color: #fff;
            background-color: rgb(0, 160, 220);
            border-radius: 12px;
        }
        .buy-enter-active,
        .buy-leave-active {
            transition: opacity 0.3s;
        }
        .buy-enter,
        .buy-leave-to {
            opacity: 0;
        }
    }
    .line {
        height: 16px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        border-top: 1px solid rgba(7, 17, 27, 0.1);
    }
    .info {
        font-size: 0px;
        padding: 18px;
        .title {
            font-size: 16px;
            color: rgb(7, 17, 27);
            padding-bottom: 6px;
        }
        span {
            display: inline-block;
            font-size: 12px;
            color: rgb(77, 85, 93);
            line-height: 24px;
            font-weight: 200;
        }
    }
    .ratingss {
        background: #fff;
        .title {
            padding: 18px 18px 0 18px;
            font-size: 16px;
            color: rgb(7, 17, 27);
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                position: relative;
                padding: 12px 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.2);
                .time {
                    padding-bottom: 6px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                    line-height: 12px;
                }
                .text {
                    .icon-thumb_up {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 12px;
                        color: rgb(0, 160, 220);
                        line-height: 24px;
                    }
                    .icon-thumb_down {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                        line-height: 24px;
                    }
                    span {
                        display: inline-block;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        line-height: 16px;
                    }
                }
                .user {
                    position: absolute;
                    top: 16px;
                    right: 0;
                    .user-name {
                        font-size: 10px;
                        line-height: 12px;
                        color: rgb(147, 153, 159);
                    }
                    .user-img {
                        display: inline-block;
                        vertical-align: middle;
                        border-radius: 50%;
                    }
                }
            }
            .no-ratings {
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
    }
}

.move-enter-active,
.move-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
}

.move-enter,
.move-leave-to {
    // opacity: 0;
    transform: translate3d(100%, 0, 0);
}
</style>

