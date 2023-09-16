<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useVidStore } from './stores/vidStore'

const Route = useRoute();
const vidStore = useVidStore();

window.onscroll = () => {
  if (window.scrollY > 150) {
    vidStore.showNavbar = false;
  } else {
    vidStore.showNavbar = true;
  }
}
</script>

<template>
  <Transition name="navbar" appear>
    <nav v-if="vidStore.showNavbar" class="navbar navbar-expand-lg navbar-dark fixed-top w-100" style="background-color: rgba(2, 12, 27, 0.5);">
      <div class="container-xl py-1 justify-content-between">
        <RouterLink :to="{name: 'home'}" class="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="logo" class="img-fluid d-block rounded-circle p-2" width="50">
          <span class="fw-bold fs-1 mb-0 ms-2">FiroctVid</span>
        </RouterLink>
        <div class="position-absolute end-0 me-3">
          <button class="btn bg-transparent border-0 shadow-none text-light" @click="vidStore.showSearch = !vidStore.showSearch">
            <i class="bi bi-search fs-4"></i>
          </button>
          <button class="navbar-toggler shadow-none" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse me-0 me-lg-5" id="navbarMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink :to="{name: 'explore', params: { type: 'movie'} }" class="nav-link fs-5 me-3">Movies</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{name: 'explore', params: { type: 'tv'} }" class="nav-link fs-5 me-3">TV Shows</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </Transition>

  <Transition name="navbar" appear>
    <div v-if="vidStore.showSearch" id="search" class="container-fluid bg-light py-2 d-flex align-items-center fixed-top" :style="[vidStore.showNavbar ? 'margin-top: 92px' : '']">
      <input type="text" class="form-control bg-transparent border-0 shadow-none ps-0 ps-xl-5 ms-xl-5 py-1 fs-5" v-model="vidStore.searchInput" placeholder="Search for a movie or tv show..." @keydown.enter="vidStore.search(vidStore.searchInput)">
      <button class="btn border-0 shadow-none" @click="vidStore.showSearch = false"><i class="bi bi-x-circle fs-4"></i></button>
    </div>
  </Transition>

  <RouterView :key="Route.path" />

  <footer class="bg-dark text-light">
    <div class="container-lg py-5">
      <div class="row mb-5">
        <div class="col text-center mb-3 mb-md-0">
          <a>Terms Of Use</a>
        </div>
        <div class="col text-center mb-3 mb-md-0">
          <a>Privacy Policy</a>
        </div>
        <div class="col text-center mb-3 mb-md-0">
          <a>About</a>
        </div>
        <div class="col text-center mb-3 mb-md-0">
          <a>Blog</a>
        </div>
        <div class="col text-center mb-3 mb-md-0">
          <a>FAQ</a>
        </div>
      </div>
      <div class="row ">
        <div class="col text-center">
          <button class="btn btn-black mx-2">
            <i class="bi bi-facebook fs-4"></i>
          </button>
          <button class="btn btn-black mx-2">
            <i class="bi bi-instagram fs-4"></i>
          </button>
          <button class="btn btn-black mx-2">
            <i class="bi bi-twitter fs-4"></i>
          </button>
          <button class="btn btn-black mx-2">
            <i class="bi bi-linkedin fs-4"></i>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.navbar-enter-from,
.navbar-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.navbar-enter-active,
.navbar-leave-active {
  transition: all 0.3s linear;
}
</style>
