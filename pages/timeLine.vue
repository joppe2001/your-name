<template>
    <div class="timeline-container">
        <div class="timeline-line"></div>
        <div class="timeline-event" v-for="event in events" :key="event.id">
            <div class="event-keypoint" @mouseover="showTooltip(event.id)" @mouseout="hideTooltip">
                <div v-if="tooltip.id === event.id" class="event-tooltip">
                    <h4>{{ event.title }}</h4>
                    <p>{{ event.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const events = ref([
  { id: 1, title: 'Switching', description: 'Taki and Mitsuha discover they are switching bodies.', image: 'image_url' },
  { id: 2, title: 'Adjusting', description: 'They start leaving notes to communicate and adapt to each other’s lives.', image: 'image_url' },
  { id: 3, title: 'Searching', description: 'Taki tries to find Mitsuha’s town, realizing it was destroyed three years ago.', image: 'image_url' },
  { id: 4, title: 'Connection', description: 'Taki and Mitsuha meet on the edge of the crater, but time splits them apart again.', image: 'image_url' },
  { id: 5, title: 'Saving', description: 'Taki devises a plan to save the town from the comet and evacuate everyone.', image: 'image_url' },
  { id: 6, title: 'Success', description: 'The town is evacuated successfully, saving the lives of the inhabitants.', image: 'image_url' },
  { id: 7, title: 'Memory Loss', description: 'Taki and Mitsuha start to forget each other as the timelines fix themselves.', image: 'image_url' },
  { id: 8, title: 'Reunion', description: 'Years later, Taki and Mitsuha cross paths in Tokyo and recognize each other.', image: 'image_url' },
]);


const tooltip = ref({ id: null });

const showTooltip = (id) => {
    tooltip.value.id = id;
};

const hideTooltip = () => {
    tooltip.value.id = null;
};
</script>
  
<style lang="scss">
@import '../mixins/for-device.scss';

.timeline-container {
    position: relative;
    width: 100%;
    height: 100px;

    @include for-device(mobile) {
        height: 150px;
    }
}

.timeline-line {
    position: absolute;
    width: 100%;
    height: 2px;
    background: #000;
    top: 50%;
}

.timeline-event {
    position: absolute;
    width: 100vw;
    height: 20px;
    top: 50%;
    transform: translateY(-50%);

    // Distribute evenly
    &:nth-child(1) {
        left: 5vw;
    }

    &:nth-child(2) {
        left: 15vw;
    }

    &:nth-child(3) {
        left: 25%;
    }

    &:nth-child(4) {
        left: 35%;
    }

    &:nth-child(5) {
        left: 45%;
    }

    &:nth-child(6) {
        left: 55%;
    }

    &:nth-child(7) {
        left: 65%;
    }

    &:nth-child(8) {
        left: 75%;
    }

    &:nth-child(9) {
        left: 85%;
    }

    &:nth-child(10) {
        left: 95%;
    }


    .event-keypoint {
        position: relative;
        width: 20px;
        height: 20px;
        background: rgb(130, 3, 3);
        border-radius: 5px;
        
        
        &:hover .event-tooltip {
            opacity: 1;
            visibility: visible;

        }

        .event-tooltip {
            position: absolute;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
            width: 150px;
            background: #fff;
            border: 1px solid #000;
            padding: 10px;
            left: 25px;
            top: -10px;
            z-index: 999;

            @include for-device(mobile) {
                width: 100px;
            }
        }
    }
}
</style>
  