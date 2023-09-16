<template>
    <main class="bg-black text-light details" style="margin-top: 20px;">
        <div class="container-xl py-5">
            <div class="hero row py-3 align-items-center mb-5" style="background: center center / cover" :style="{'background-image': `linear-gradient(to top, rgba(4, 21, 45, 0.9), rgba(4, 21, 45, 0.9)), url(${vidStore.imgURL}${detail?.backdrop_path})`}">
                <div class="col-12 col-md-5 mb-4 mb-md-0">
                    <img 
                    :src="detail?.poster_path ? 'https://image.tmdb.org/t/p/original'+detail.poster_path : '/card.png'" 
                    alt="" class="img-fluid rounded-4">
                </div>
                <div class="col-12 col-md-7">
                    <h1 v-if="detail?.original_title">{{ detail.original_title }}</h1>
                    <h1 v-else>{{ detail?.original_name }}</h1>
                    <h3 class="text-secondary fst-italic mb-4">{{ detail?.tagline }}</h3>
                    <div class="genres mb-5">
                        <span class="text-bg-pink p-2 rounded-2 me-2" v-for="genre in detail?.genres" :key="genre.name">
                            {{ genre.name }}
                        </span>
                    </div>
                    <div class="d-flex align-items-center mb-4">
                        <div class="circle-progress bg-dark z-1 d-flex align-items-center justify-content-center me-4">
                            <div class="circle bg-success d-flex align-items-center justify-content-center"
                            :style="[ detail?.vote_average ? (detail.vote_average >= 7) ?
                                {background: `conic-gradient(#198754 calc(${detail?.vote_average}*360deg/10), #020C1B 0deg)`} :
                                (detail.vote_average >= 4 && detail.vote_average < 7) ?
                                {background: `conic-gradient(#FFA500 calc(${detail?.vote_average}*360deg/10), #020C1B 0deg)`} :
                                {background: `conic-gradient(#FF0000 calc(${detail?.vote_average}*360deg/10), #020C1B 0deg)`} : '']
                            ">
                                <span class="fw-bold text-bg-dark z-2 d-flex align-items-center justify-content-center fs-3">{{ detail?.vote_average.toFixed(1) }}</span>
                            </div>
                        </div>
                        <a href="" class="text-decoration-none text-light d-flex align-items-center trailer" data-bs-toggle="modal" data-bs-target="#videoModal">
                            <i class="bi bi-play-circle display-1"></i>
                            <span class="fs-2 fw-light ms-3">Watch Trailer</span>
                        </a>
                    </div>
                    <h3 class="fw-light">Overview</h3>
                    <p class="lead mb-5">{{ detail?.overview }}</p>  
                    <div class="row border-bottom border-secondary py-3">
                        <div class="col d-flex align-items-start align-items-lg-end flex-column flex-lg-row text-start">
                            <span>Status:</span>
                            <span class="text-secondary ms-0 ms-lg-3 text-nowrap">{{ detail?.status }}</span>
                        </div>
                        <div v-if="detail?.release_date" class="col d-flex align-items-start align-items-lg-end flex-column flex-lg-row">
                            <span class="text-nowrap">Release Date:</span>
                            <span class="text-secondary ms-0 ms-lg-3 text-nowrap">{{ dayjs(detail.release_date).format('MMM DD, YYYY') }}</span>
                        </div>
                        <div v-else class="col d-flex align-items-start align-items-lg-end flex-column flex-lg-row">
                            <span class="text-nowrap">First Air Date:</span>
                            <span class="text-secondary ms-0 ms-lg-3 text-nowrap">{{ dayjs(detail?.first_air_date).format('MMM DD, YYYY') }}</span>
                        </div>
                        <div v-if="detail?.runtime" class="col d-flex align-items-start align-items-start align-items-lg-end flex-column flex-lg-row">
                            <span>Runtime:</span>
                            <span class="text-secondary ms-0 ms-lg-3 text-nowrap">
                                {{  Math.floor(detail.runtime / 60) }}h {{ detail.runtime - (Math.floor(detail.runtime / 60))*60 }}m
                            </span>
                        </div>
                    </div>
                    <div v-if="crew?.find(el => el.job === 'Director')" class="row border-bottom border-secondary py-3">
                        <div class="col d-flex align-items-end">
                            <span>Director:</span>
                            <span class="text-secondary ms-3">{{ crew?.find(el => el.job === 'Director')?.name }}</span>
                        </div>
                    </div>
                    <div v-if="crew?.find(el => el.job === 'Writer')" class="row border-bottom border-secondary py-3">
                        <div class="col d-flex align-items-end">
                            <span>Writer:</span>
                            <span class="text-secondary ms-3">
                                {{ crew.filter(el => el.job === 'Writer').map(el => el.name).join(', ') }}
                            </span>
                        </div>
                    </div>
                    <div v-if="detail?.created_by" class="row border-bottom border-secondary py-3">
                        <div class="col d-flex align-items-end">
                            <span>Creator:</span>
                            <span class="text-secondary ms-3">
                                {{ detail?.created_by.map(el => el.name).join(', ') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="mb-4">Top Cast</h3>
            <SwiperPage class="mb-5" :array="cast" content="PersonCard" />
            <h3 class="mb-4">Official Videos</h3>
            <SwiperPage class="mb-5" :array="videos" content="VideosCard" />
            <h3 class="mb-4">Similar Movies</h3>
            <SwiperPage class="mb-5" :array="similar" content="MovieTVCard" />
            <h3 class="mb-4">Recommendations</h3>
            <SwiperPage :array="recommend" content="MovieTVCard" />
        </div>
    </main>

<!-- modal -->
    <Teleport to="#modal">
        <div class="modal fade" id="videoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0" style="aspect-ratio: 16 / 9">
                    <button type="button" class="btn bg-transparent position-absolute z-1 end-0 top-0 text-light translate-middle-y" data-bs-dismiss="modal" aria-label="Close">Close</button>
                    <iframe v-if="videos?.length" id="videoURL" style="aspect-ratio: 16/9" :src="'https://www.youtube.com/embed/'+videos[0].key" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import SwiperPage from "./SwiperPage.vue"
import { useVidStore } from "@/stores/vidStore"

import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import dayjs from "dayjs"
import type { MovieTV } from "../../types/vidTypes"

const Route = useRoute();
const vidStore = useVidStore();
const { urlTales, detail, cast, crew, videos, similar, recommend } = storeToRefs(vidStore);

for (let i = 0; i < urlTales.value.length; i++) {
    await vidStore.getDetails((Route.params.type as MovieTV), (Route.params.id as string), urlTales.value[i])
}
</script>

<style lang="scss" scoped>
.details {
    .hero {
        min-height: 100vh;
        .circle-progress {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            .circle {
                position: relative;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                font-size: 0.8rem;
                span {
                    width: 80px;
                    height: 80px; 
                    border-radius: 50%;
                }
            }
        }
        i.play {
            width: 90px;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            border: 2px solid white;
        }

        a.trailer {
            transition: all 0.3s linear;
            &:hover {
                color: #da2f68 !important;
                transform: scale(0.95);
            }
        }
    }

}
</style>