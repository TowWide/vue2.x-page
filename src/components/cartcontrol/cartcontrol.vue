<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" v-if="food.count > 0"  @click.stop.prevent="decreaseCart"></div>
        </transition>
        <div class="cart-count" v-show="food.count > 0" v-text="food.count"></div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props: {
        food: {
            type: Object
        }
    },
    created() {
    },
    methods: {
        addCart() {
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            };
            this.$emit('cartadd', event.target);
        },
        decreaseCart() {
            this.food.count--;
        }
    }
};
</script>
<style lang="scss">
.cartcontrol {
    font-size: 0;
    .cart-decrease,
    .cart-add {
        display: inline-block;
        vertical-align: top;
        padding: 4px;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
    }
    .cart-decrease {}
    .cart-add {}
    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        font-size: 10px;
        padding: 0 4px;
        color: rgb(147, 153, 159);
        line-height: 28px;
        text-align: center;
    }
    .move-enter-active,
    .move-leave-active {
        transition: all 0.4s linear;
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    .move-enter,
    .move-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0); // transform: rotate(180deg);
    }
}
</style>


