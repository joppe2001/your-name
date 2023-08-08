<template>
    <button :type="type" :disabled="disabled" @click="handleClick">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    onClick: {
        type: Function,
        default: () => { },
    },
});

const handleClick = () => {
    props.onClick();
};


</script>

<style scoped>
button {
    margin-top: 10px;
    background-color: #f4f4f4;
    border: 1px solid #000;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease-in-out;
}

button:hover {
    background-color: #000;
    color: #fff;
}
</style>