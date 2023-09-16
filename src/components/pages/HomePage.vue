<script setup lang="ts">
import SwiperPage from './SwiperPage.vue'
import { useVidStore } from '../../stores/vidStore'
import type { MoviesTVCardType } from '@/types/vidTypes';

const vidStore = useVidStore();
await vidStore.getTrending('day');
await vidStore.getMovieTV('movie','popular');
await vidStore.getMovieTV('movie','top_rated');
</script>

<template>
  <main class="bg-black text-light pb-5">
    <section class="hero vh-100" style="background: center center / cover;" :style="{ 'background-image': `linear-gradient(to top, #04152D, transparent), url(${vidStore.backgroundURL})` }">
      <div class="container-md h-100 px-0 px-md-5 d-flex flex-column justify-content-center align-items-center">
        <h1 class="display-1 fw-bold">Welcome.</h1>
        <p class="lead mb-4 mb-md-5 text-center">Millions of movies, TV shows and people to discover. Explore now.</p>
        <div class="input-group rounded-pill px-3 px-md-0">
          <input type="text" class="form-control rounded-start-pill shadown-none py-2 py-md-3 ps-4" placeholder="Search for a movie or tv show..." v-model="vidStore.searchInput" @keydown.enter="vidStore.search(vidStore.searchInput)">
          <button class="btn text-light input-group-text rounded-end-pill py-2 py-md-3 px-3 px-md-5 fs-5" @click="vidStore.search(vidStore.searchInput)">Search</button>
        </div>
      </div>
    </section>
    <section class="trending mb-5">
      <div class="container-xl">
        <div class="row mb-4">
            <div class="col d-flex justify-content-between align-items-center">
                <h3 class="mb-0">Trending</h3>
                <ul class="nav nav-tabs bg-light rounded-pill p-1" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link btn border-0 shadow-none rounded-pill px-4 px-lg-5 text-dark" :class="{'active': vidStore.DayWeek === 'day'}" @click="vidStore.getTrending('day')">Day</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn border-0 shadow-none rounded-pill px-4 px-lg-5 text-dark" :class="{'active': vidStore.DayWeek === 'week'}" @click="vidStore.getTrending('week')">Week</button>
                    </li>
                </ul>
            </div>
        </div>
        <SwiperPage :array="vidStore.trending" content="MovieTVCard" />
      </div>
    </section>
    <section class="popular mb-5">
      <div class="container-xl">
        <div class="row mb-4">
            <div class="col d-flex justify-content-between align-items-center">
                <h3 class="mb-0">What's Popular</h3>
                <ul class="nav nav-tabs bg-light rounded-pill p-1" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link btn border-0 shadow-none rounded-pill px-4 px-lg-5 text-dark" :class="{'active': vidStore.moviesPopular.length}" @click="vidStore.getMovieTV('movie', 'popular')">Movies</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn border-0 shadow-none rounded-pill px-4 px-lg-5 text-dark" :class="{'active': vidStore.tvPopular.length}" @click="vidStore.getMovieTV('tv','popular')">TV Shows</button>
                    </li>
                </ul>
            </div>
        </div>
        <TransitionGroup name="card" appear>
          <div v-if="vidStore.moviesPopular.length">
            <SwiperPage :array="vidStore.moviesPopular" content="MovieTVCard" />
          </div>
          <div v-if="vidStore.tvPopular.length">
            <SwiperPage :array="vidStore.tvPopular" content="MovieTVCard" />
          </div>
        </TransitionGroup>
      </div>
    </section>
    <section class="top-rated">
      <div class="container-xl">
        <div class="row mb-4">
            <div class="col d-flex justify-content-between align-items-center">
                <h3 class="mb-0">Top Rated</h3>
                <ul class="nav nav-tabs bg-light rounded-pill p-1" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link btn border-0 shadow-none rounded-pill px-4 px-lg-5 text-dark" :class="{'active': vidStore.topRatedMovies.length}" @click="vidStore.getMovieTV('movie', 'top_rated')">Movies</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn border-0 shadow-none rounded-pill px-4 px-lg-5 text-dark" :class="{'active': vidStore.topRatedTV.length}" @click="vidStore.getMovieTV('tv', 'top_rated')">TV Shows</button>
                    </li>
                </ul>
            </div>
        </div>
        <TransitionGroup name="card" appear>
          <div v-if="vidStore.topRatedMovies.length">
            <SwiperPage :array="vidStore.topRatedMovies" content="MovieTVCard" />
          </div>
          <div v-if="vidStore.topRatedTV.length">
            <SwiperPage :array="vidStore.topRatedTV" content="MovieTVCard" />
          </div>
        </TransitionGroup>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.card-enter-from {
  opacity: 0.5;
  transform: translateX(1000px);
}
.card-leave-to {
  opacity: 0.5;
  transform: translateX(-1000px);
}

.card-enter-active,
.card-leave-active {
  transition: all 1s linear;
}
.card-move {
  transition: all 0.5s linear;
}
</style>
