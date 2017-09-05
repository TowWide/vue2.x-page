<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h2 class="score">{{seller.score}}</h2>
                    <div class="tesc">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <ratingselect @pusttype="settype" @togglecontent="togglecon" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
            <ul>
                <li v-for="(rating,index) in ratings" :key="index" v-show="filterRating(rating.rateType,rating.text)" class="ratings-item">
                    <div class="avatar"><img :src="rating.avatar" alt=""></div>
                    <div class="content">
                        <div class="username">{{rating.username}}</div>
                        <div class="star-time">
                            <star :size="24" :score="rating.score"></star>
                            <span class="time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                        </div>
                        <div class="text">{{rating.text}}</div>
                        <div class="label">
                            <i :class="{ 'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}"></i>
                            <span class="text" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                        </div>
                        <div class="ratetime">{{rating.rateTime | formatDate}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const ERR_OK = 0;
const ALL = 2;
import BScroll from 'better-scroll';
import star from '../star/star';
import ratingselect from '../ratingselect/ratingselect';
import { formatDate } from '../../common/js/date';
export default {
    props: {
        seller: {}
    },
    data() {
        return {
            ratings: [],
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
    created() {
        this.$http.get('/api/ratings').then((res) => {
            res = res.body;
            if (res.errno === ERR_OK) {
                this.ratings = res.data;
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    });
                });
            }
        });
    },
    methods: {
        settype(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        togglecon(onlyContent) {
            this.onlyContent = !onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        filterRating(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return this.selectType === type;
            }
        }
    },
    mounted() {
    },
    components: {
        star, ratingselect
    }
};
</script>
<style lang="scss" >
.ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .ratings-content {
        .overview {
            display: flex;
            padding: 18px 0;
            .overview-left {
                flex: 0 0 138px;
                border-right: 1px solid rgba(7, 17, 27, 0.2);
                .score {
                    font-size: 24px;
                    line-height: 28px;
                    color: rgb(255, 153, 0);
                    text-align: center;
                }
                .tesc {
                    padding: 6px 0 0px 0;
                    text-align: center;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    line-height: 12px;
                }
                .rank {
                    font-size: 10px;
                    color: #93999f;
                    line-height: 20px;
                    text-align: center;
                }
            }
            .overview-right {
                flex: 1;
                padding-left: 24px;
                .score-wrapper {
                    &:first-child {
                        margin-top: 6px;
                    }
                    .title {
                        padding: 0 12px 8px 0;
                        display: inline-block;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        line-height: 12px;
                    }
                    .star {
                        display: inline-block;
                        vertical-align: top;
                    }
                    .score {
                        display: inline-block; // vertical-align: top;
                        font-size: 12px;
                        color: rgb(255, 153, 0);
                    }
                }
                .delivery-wrapper {
                    .title {
                        padding: 0 12px 8px 0;
                        display: inline-block;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        line-height: 12px;
                    }
                    .time {
                        font-size: 12px;
                        line-height: 12px;
                        color: rgb(147, 153, 159)
                    }
                }
            }
        }
        .line {
            height: 16px;
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            border-top: 1px solid rgba(7, 17, 27, 0.1);
        }
        .ratings-item {
            display: flex;
            position: relative;
            margin: 18px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .avatar {
                flex: 0 0 40px;
                width: 40px;
                img {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                }
            }
            .username {
                display: inline-block;
                font-size: 10px;
                line-height: 12px;
                color: rgb(7, 17, 27);
            }
            .star-time {
                padding: 4px 0 6px 0;
                .star {
                    display: inline-block;
                }
                .time {
                    margin-left: 6px;
                    display: inline-block;
                    font-size: 10px;
                    font-weight: 200;
                    color: rgb(147, 153, 159);
                    line-height: 12px;
                }
            }
            .text {
                padding-bottom: 8px;
                font-size: 12px;
                line-height: 18px;
                color: rgb(7, 17, 27);
            }
            .label {
                padding-bottom: 12px;
                .icon-thumb_up {
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                    line-height: 16px;
                }
                .icon-thumb_down {
                    font-size: 12px;
                    color: rgb(183, 187, 191);
                    line-height: 16px;
                }
                .text {
                    display: inline-block;
                    margin-left: 8px;
                    padding: 0 6px;
                    font-size: 9px;
                    color: rgb(147, 153, 159);
                    line-height: 16px;
                    border: 1px solid rgba(7, 17, 27, 0.1);
                    border-radius: 2px;
                }
            }
            .ratetime {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 10px;
                font-weight: 200;
                color: rgb(147, 153, 159);
                line-height: 12px;
            }
        }
    }
}
</style>

