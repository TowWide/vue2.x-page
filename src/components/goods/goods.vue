<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="item.type" class="menu-item" :class="{'current':currentIndex===index}" v-on:click="selectMenu($event,index)">
                    <span class="text">
                        <span v-show="item.type > 0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" :key="item.type" class="food-list current" ref="foodList">
                    <h2 class="title">{{item.name}}</h2>
                    <ul>
                        <li v-for="food in item.foods" :key="food.index" class="food-item" @click="Food(food)">
                            <div class="icon">
                                <img :src="food.icon" alt="" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartconter-wrapper">
                                    <cartontrol :food="food" @cartadd="events"></cartontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shop-cart :selectFoods="selectFoods" ref="shopcart" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
        <food :food="selectFood" ref="food" @cartadd="events"></food>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
// import foodList from '../../common/js/store';
import shopCart from '../shopcart/shopcart';
import cartontrol from '../cartcontrol/cartcontrol';
import food from '../food/food';
const ERR_OK = 0;
// console.log(foodList);
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectFood: {},
            target: {}
        };
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    created() {
        this.$http.get('/api/goods').then((response) => {
            response = response.body;
            if (ERR_OK === 0) {
                this.goods = response.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            };
        });
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
        Food(food) {
            this.selectFood = food;
            this.$refs.food.show();
        },
        selectMenu(event, index) {
            let foodList = this.$refs.foodList;
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
        },
        _initScroll() {
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight() {
            let foodList = this.$refs.foodList;
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            };
        },
        events(target) {
            this.$nextTick(() => {
                let shopcart = this.$refs.shopcart;
                shopcart.drop(target);
            });
        }
    },
    components: {
        shopCart, cartontrol, food
    },
    mounted() {
    }
};
</script>
<style lang="scss" >
@import '../../common/styles/mixin';
.goods {
    display: flex;
    position: absolute;
    font-weight: 400;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item {
            height: 54px;
            width: 56px;
            display: table;
            padding: 0 12px;
            font-size: 0;
            .text {
                display: table-cell;
                vertical-align: middle;
                width: 56px;
                font-size: 12px;
                line-height: 14px;
                color: black;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    background-size: 12px;
                }
                .decrease {
                    background-image: url(bg-image('decrease_3'));
                }
                .discount {
                    background-image: url(bg-image('discount_3'));
                }
                .guarantee {
                    background-image: url(bg-image('guarantee_3'));
                }
                .invoice {
                    background-image: url(bg-image('invoice_3'));
                }
                .special {
                    background-image: url(bg-image('special_3'));
                }
            }
        }
        .current {
            position: relative;
            top: -1px;
            background: #fff;
            z-index: 10;
            font-weight: 700;
            .text {
                border: none !important;
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        .title {
            display: inline-block;
            width: 100%;
            padding-left: 14px;
            height: 26px;
            font-size: 12px;
            line-height: 26px;
            color: rgb(147, 153, 159);
            background-color: #f3f5f7;
            border-left: 2px solid #d9dde1;
        }
        .food-item {
            display: flex;
            padding: 18px 0px 18px 18px;
            margin-right: 18px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
                border-bottom: none;
            }
            .icon {
                flex: 0 0 57px;
                width: 57px;
                height: 57px;
                border-radius: 2px;
                margin-right: 10px;
                overflow: hidden;
            }
            .content {
                flex: 1;
                position: relative;
                .name {
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: #07111b;
                    font-weight: 400;
                }
                .desc {
                    font-size: 12px;
                    line-height: 12px;
                    margin-bottom: 8px;
                    color: rgb(147, 153, 159);
                }
                .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: #93999f;
                    span:first-child {
                        margin-right: 12px;
                    }
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(255, 0, 0);
                        text-decoration: none;
                    }
                    span {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        text-decoration: line-through
                    }
                }
                .cartconter-wrapper {
                    position: absolute;
                    right: 0px;
                    bottom: 0;
                }
            }
        }
    }
}
</style>

