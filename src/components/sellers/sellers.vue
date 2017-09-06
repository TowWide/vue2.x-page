<template>
    <div class="sellers" ref="sellerScroll">
        <div class="seller-content">
            <div class="overview">
                <h2 class="name">{{seller.name}}</h2>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remake">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span>{{seller.minPrice}}</span>
                            元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span>{{seller.deliveryPrice}}</span>
                            元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span>{{seller.deliveryTime}}</span>
                            分钟
                        </div>
                    </li>
                </ul>
                <div class="heart" @click="heart=!heart">
                    <i class="icon-favorite" :class="{active:heart}"></i>
                    <span class="text" v-text="heart?'已收藏':'收藏'"></span>
                </div>
            </div>
            <div class="line"></div>
            <div class="bulletin">
                <div class="title">公告与活动</div>
                <div class="bulletin-content">{{seller.bulletin}}</div>
                <ul class="supports">
                    <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
                        <i class="icon" :class="classMap[item.type]"></i>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="pics">
                <div class="title">商家实景</div>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list">
                        <li class="pic-item" v-for="(item,index) in seller.pics" :key="index">
                            <img :src="item" alt="" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="line"></div>
            <div class="shopinfo">
                <div class="title">商家信息</div>
                <div class="text" v-for="(item,index) in seller.infos" :key="index">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../star/star';
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            heart: false
        };
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$nextTick(() => {
            this._initScroll();
        });
    },
    watch: {
    },
    methods: {
        _initScroll() {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.sellerScroll, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        },
        _initPics() {
            let liWidth = 126;
            let minWidth = liWidth * this.seller.pics.length - 6;
            this.$refs.picWrapper.getElementsByClassName('pic-list')[0].style.width = minWidth + 'px';
            if (!this.picScroll) {
                this.picScroll = new BScroll(this.$refs.picWrapper, {
                    scrollX: true,
                    click: true
                });
            } else {
                this.picScroll.refresh();
            }
        }
    },
    mounted() {
        this._initPics();
    },
    components: {
        star
    }
};
</script>
<style lang="scss">
@import '../../common/styles/mixin.scss';
.sellers {
    position: absolute;
    top: 175px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overview {
        position: relative;
        padding: 18px;
        .name {
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
        }
        .desc {
            padding: 8px 0 18px 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .star {
                display: inline-block;
                vertical-align: top;
                margin-right: 8px;
            }
            .text {
                display: inline-block;
                margin-right: 12px;
                font-size: 10px;
                line-height: 18px;
                color: rgb(77, 85, 93);
            }
        }
        .remake {
            display: flex;
            padding-top: 18px;
            .block {
                flex: 1;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border: none;
                }
                h2 {
                    text-align: center;
                    font-size: 10px;
                    line-height: 10px;
                    color: rgb(147, 153, 159);
                    padding-bottom: 4px;
                }
                .content {
                    text-align: center;
                    font-size: 10px;
                    color: rgb(7, 17, 27);
                    span {
                        font-size: 24px;
                    }
                }
            }
        }
        .heart {
            position: absolute;
            top: 21px;
            right: 18px;
            width: 50px;
            .icon-favorite {
                display: block;
                text-align: center;
                font-size: 24px;
                line-height: 24px;
                color: rgb(147, 153, 159);
            }
            .active {
                color: rgb(240, 20, 20);
            }
            .text {
                display: block;
                padding-top: 4px;
                text-align: center;
                font-size: 10px;
                line-height: 10px;
                color: rgb(77, 85, 93);
            }
        }
    }
    .line {
        height: 16px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        border-top: 1px solid rgba(7, 17, 27, 0.1);
    }
    .bulletin {
        padding: 18px 18px 0 18px;
        .title {
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
        }
        .bulletin-content {
            padding: 8px 12px 16px 12px;
            color: rgb(240, 20, 20);
            font-size: 12px;
            line-height: 24px;
        }
        .supports {
            .supports-item {
                padding: 16px 12px;
                border-top: 1px solid rgba(7, 17, 27, 0.1);
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 16px;
                    height: 16px;
                    background-size: 16px;
                }
                .decrease {
                    @include bg("decrease_4");
                }
                .discount {
                    @include bg("discount_4");
                }
                .special {
                    @include bg("special_4");
                }
                .invoice {
                    @include bg("invoice_4");
                }
                .guarantee {
                    @include bg("guarantee_4");
                }
                .text {
                    font-size: 12px;
                    line-height: 16px;
                    color: rgb(7, 17, 27);
                }
            }
        }
    }
    .pics {
        padding: 16px;
        overflow: hidden;
        .title {
            margin-bottom: 12px;
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
        }
        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .pic-list {
                font-size: 0px;
                .pic-item {
                    display: inline-block;
                    margin-right: 6px;
                    width: 120px;
                    height: 90px;
                    &:last-child {
                        margin: none;
                    }
                }
            }
        }
    }
    .shopinfo {
        padding: 18px 18px 0 18px;
        .title {
            padding-bottom: 12px;
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
        }
        .text {
            padding: 16px 12px;
            font-size: 12px;
            line-height: 16px;
            color: rgb(7, 17, 27);
            border-top: 1px solid rgba(7, 17, 27, 0.1);
        }
    }
}
</style>


