<template>
    <div id="parent" class="post-footer">
        <b-icon v-if="isFill" icon="heart-fill" class="heart-icon mt-4 cursor" @click="change"></b-icon>
        <b-icon v-else icon="heart" class="heart-icon mt-4 cursor" @click="change"></b-icon>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isFill: false,
            }
        },
        methods: {
            change() {
                this.isFill = !this.isFill
            }
        }
    }
</script>