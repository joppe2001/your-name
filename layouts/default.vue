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
	background: linear-gradient(to bottom,#7a12f218, #7a12f2f4,  #9745fc, #c2a2df, #e0d6e817);	
}
</style>
