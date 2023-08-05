<template>
    <div >
        <slot />
    </div>
</template>

<style>
::-webkit-scrollbar-track
{
    border-radius: 0 10px 10px 0;
    opacity: 0;
    background: none;
}

::-webkit-scrollbar
{
    border-radius: 0 10px 10px 0;
	width: 10px;
}

::-webkit-scrollbar-thumb
{
    border-radius: 25px;
	background: linear-gradient(to bottom,#ffffff00, #ce6bd7, #6e3572 ,#e3eeff45 , #e3eeff00);	
}
</style>
