<template>
	<button 
    :disabled="disabled"
    @click="handleClick"
    :height="height"
    :padding="padding"
    :margin="margin"
    :style="{
      height: height,
      padding: padding,
      margin: margin,
    }"
    >
		<slot />
	</button>
</template>

<script setup lang="ts">
	const props = defineProps({
		type: {
			type: String,
			default: "button",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		onClick: {
			type: Function,
			default: () => {},
		},
		height: {
			type: String,
			default: "auto",
		},
        padding: {
            type: String,
            default: "10px",
        },
        margin: {
            type: String,
            default: "10px 0 0 0",
        }
	});

	const handleClick = () => {
		props.onClick();
	};
</script>

<style scoped>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
		border: 1px solid #000;
		padding: 10px;
		border-radius: 5px;
		font-size: 16px;
		transition: all 0.2s ease-out;
		background-color: #000;
		color: #fff;
	}

	button:hover {
		background-color: #f4f4f4;
		box-shadow: none;
		box-shadow: -4px -5px 0 -2px black;
		color: black;
	}

	button svg {
		fill: #fff; /* This ensures the SVG is white */
	}
</style>
