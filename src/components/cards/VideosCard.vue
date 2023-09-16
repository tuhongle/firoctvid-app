<template>
    <div class="card bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#videoModal" @click="changeVideoURL(card.key)">
        <div class="card-img overflow-hidden mb-3 position-relative" style="aspect-ratio: 16 / 9;">
            <i class="bi bi-play-circle text-light position-absolute top-50 start-50 translate-middle display-4 opacity-50"></i>
            <img :src="'https://img.youtube.com/vi/'+card.key+'/mqdefault.jpg'" alt="" class="card-img-top">
        </div>
        <div class="card-body text-light">
            <p class="card-text">{{ card.name }}</p>
        </div>
    </div>
    <!-- Modal -->
    <Teleport to="#modal">
        <div class="modal fade" id="videoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0" style="aspect-ratio: 16 / 9">
                    <button type="button" class="btn bg-transparent position-absolute z-1 end-0 top-0 text-light translate-middle-y" data-bs-dismiss="modal" aria-label="Close">Close</button>
                    <iframe id="videoURL" style="aspect-ratio: 16/9" :src="'https://www.youtube.com/embed/'+card.key" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import type { videosCardType } from '@/types/vidTypes'

defineProps<{
    card: videosCardType,
}>();

const changeVideoURL = (data : string) => {
    (document.getElementById('videoURL') as HTMLIFrameElement).src = `https://www.youtube.com/embed/${data}`;
}
</script>

<style lang="scss" scoped>
.card {
    i.bi {
        transition: all 0.3s linear;
    }
    &:hover {
        cursor: pointer;
        i.bi {
            color:#da2f68 !important;
            font-size: 3rem;
            opacity: 1 !important;
        }
    }
}
</style>