<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" src="" alt="" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">{{seller.description}} /{{seller.deliveryTime}}分钟送达</div>
                <div class="supports" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if='seller.supports' class="support-count" @click="detailShow = true">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="detailShow = true">
            <span class="bulletin-icon"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="header-bg">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-mian">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size='48' :score='seller.score'></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports">
                            <li v-for="item in seller.supports" :key="item.type" class="item">
                                <i class="icon" :class="classMap[item.type]"></i>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="detail-close">
                    <i class="icon-close" @click="detailShow = false"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../../components/star/star';
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        };
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: { star }
};
</script>
<style lang="scss">
@import "../../common/styles/mixin";
.header {
    position: relative;
    overflow: hidden;
    background-color: rgba(7, 15, 27, 0.5);
    color: rgb(255, 255, 255);
    .content-wrapper {
        padding: 24px 12px 18px 24px;
        position: relative;
        font-size: 0;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            font-size: 14px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    background-image: url(bg-image("brand"));
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 16px;
                    color: rgb(255, 255, 255);
                }
            }
            .description {
                margin-bottom: 10px;
                font-size: 12px;
                line-height: 12px;
                color: reb(225, 225, 225);
            }
            .supports {
                .icon {
                    display: inline-block;
                    vertical-align: middle;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px;
                    background-repeat: no-repeat;
                }
                .text {
                    font-size: 10px;
                    line-height: 12px;
                    color: rgb(255, 255, 255);
                }
            }
        }
        .support-count {
            position: absolute;
            padding: 0px 8px;
            right: 12px;
            bottom: 14px;
            height: 24px;
            font-size: 10px;
            line-height: 24px;
            text-align: center;
            border-radius: 14px;
            color: rgb(255, 255, 255);
            background: rgba(0, 0, 0, 0.2);
            .count {
                font-size: 10px;
            }
            .icon-keyboard_arrow_right {
                vertical-align: top;
                margin-left: 2px;
                font-size: 10px;
                line-height: 24px;
            }
        }
    }
    .bulletin-wrapper {
        position: relative;
        padding: 0 22px 0 12px;
        height: 28px;
        line-height: 28px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background: rgba(7, 17, 27, 0.2);
        .bulletin-icon {
            display: inline-block;
            vertical-align: middle;
            width: 22px;
            height: 12px;
            background: url(bg-image("bulletin"));
            background-size: 22px 12px;
        }
        .bulletin-text {
            margin: 0 4px;
            font-size: 10px;
        }
        .icon-keyboard_arrow_right {
            position: absolute;
            vertical-align: middle;
            right: 12px;
            top: 8px;
            font-size: 10px;
        }
    }
    .header-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter,
    .fade-leave-to
    {
        opacity: 0
    }
    .detail {
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        .detail-wrapper {
            width: 100%;
            min-height: 100%;
            .detail-mian {
                margin-top: 64px;
                padding-bottom: 74px;
                .name {
                    text-align: center;
                    font-size: 16px;
                    line-height: 16px;
                    font-weight: 700;
                }
                .star-wrapper {
                    margin-top: 16px;
                    padding: 2px 0;
                    text-align: center;
                }
                .title {
                    display: flex;
                    padding: 0 36px;
                    margin-top: 28px;
                    margin-bottom: 24px;
                    .line {
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    .text {
                        font-size: 14px;
                        font-weight: 700;
                        padding: 0 12px;
                    }
                }
                .supports {
                    padding: 0 36px;
                    .item {
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
                        .icon {
                            display: inline-block;
                            vertical-align: top;
                            width: 16px;
                            height: 16px;
                            background-size: 16px;
                        }
                        .text {
                            margin-left: 6px;
                            font-size: 12px;
                            line-height: 16px;
                        }
                    }
                }
                .bulletin {
                    padding: 0 36px;
                    font-size: 12px;
                    line-height: 24px;
                }
            }
        }
        .detail-close {
            margin: -64px auto 0 auto;
            text-align: center;
            .icon-close {
                font-size: 32px;
                color: rgba(255, 255, 255, 0.5);
                line-height: 32px;
            }
        }
    }
    .decrease {
        background-image: url(bg-image('decrease_1'));
    }
    .discount {
        background: url(bg-image('discount_1'));
    }
    .guarantee {
        background: url(bg-image('guarantee_1'));
    }
    .invoice {
        background: url(bg-image('invoice_1'));
    }
    .special {
        background: url(bg-image('special_1'));
    }
}
</style>

