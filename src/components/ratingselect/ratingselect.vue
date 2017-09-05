<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" :class="{active: selectType == 2}" @click="posttype(2)">{{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{active: selectType == 0}" @click="posttype(0)">{{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative" :class="{active: selectType == 1}" @click="posttype(1)">
                {{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch" @click="toggleContent">
            <span class="icon-check_circle" :class="{active:onlyContent}"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }

    },
    computed: {
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            });
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            });
        }
    },
    methods: {
        posttype(type) {
            this.$emit('pusttype', type);
        },
        toggleContent() {
            this.$emit('togglecontent', this.onlyContent);
        }
    }
};
</script>
<style lang="scss" >
.ratingselect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        border-bottom: 1px solid rgba(1, 17, 27, 0.1);
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
        }
        .positive {
            font-size: 12px;
            color: rgb(77, 85, 93);
            line-height: 16px;
            background: rgba(0, 160, 220, 0.2);
            .count {
                font-size: 8px;
            }
            &.active {
                color: #fff;
                background: rgb(0, 160, 220);
            }
        }
        .negative {
            font-size: 12px;
            color: rgb(77, 85, 93);
            line-height: 16px;
            background: rgba(77, 85, 93, 0.2);
            .count {
                font-size: 8px;
            }
            &.active {
                color: #fff;
                background: rgb(77, 85, 93);
            }
        }
    }
    .switch {
        padding: 12px 16px;
        border-bottom: 1px solid rgba(1, 17, 27, 0.2);
        .icon-check_circle {
            display: inline-block;
            vertical-align: top;
            font-size: 24px;
            color: rgb(147, 153, 159);
            line-height: 24px;
            &.active {
                color: #00c850;
            }
        }
        .text {
            display: inline-block;
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 24px;
        }
    }
}
</style>

