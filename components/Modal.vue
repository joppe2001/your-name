<template>
    <div v-if="modelValue" class="modal" @click="handleClickOutside">
        <div class="modal-content">
            <span class="close-button" @click="closeModal">&times;</span>
            <slot class="slot"/>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits();

const closeModal = () => {
    emit('update:modelValue', false);
};

const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
};

const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscapeKey);
});
</script>


<style scoped>

.modal, .modal * {
    all: initial;
    box-sizing: border-box;
    font-family: sans-serif;
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 1;
}

.modal-content {
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
    padding: 40px;
    border-radius: 5px;
    position: relative;
    width: 90%;
}

@media (min-width: 850px) {
    .modal-content {
        width: 25%;
    }
}

.close-button {
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
	font-size: 22px;
}

</style>