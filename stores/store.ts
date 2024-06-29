export const useVidStore = defineStore('vid', () => {

})

if (import.meta.hot) {
import.meta.hot.accept(acceptHMRUpdate(useVidStore, import.meta.hot))
}