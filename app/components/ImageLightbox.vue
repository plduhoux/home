<script setup lang="ts">
const props = defineProps<{
  images: string[]
  alt: string
}>()

const lightboxOpen = ref(false)
const currentIndex = ref(0)

function open(index: number) {
  currentIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function close() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// Touch swipe for carousel & lightbox
const touchStartX = ref(0)
const touchStartY = ref(0)
const scrollRef = ref<HTMLElement | null>(null)

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
}

function onLightboxSwipe(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchStartX.value
  const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.value)
  if (Math.abs(dx) > 50 && dy < 100) {
    if (dx < 0) next()
    else prev()
  }
}
</script>

<template>
  <div>
    <!-- Horizontal scroll gallery / carousel -->
    <div
      ref="scrollRef"
      class="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide"
      @click.stop
    >
      <button
        v-for="(img, i) in images"
        :key="i"
        class="shrink-0 snap-center cursor-pointer focus:outline-none"
        @click="open(i)"
      >
        <img
          :src="img"
          :alt="`${alt} screenshot ${i + 1}`"
          class="h-40 md:h-48 w-auto rounded-xl border border-border object-cover hover:border-accent/40 transition-colors"
        />
      </button>
    </div>

    <!-- Dots indicator (mobile) -->
    <div v-if="images.length > 1" class="flex justify-center gap-1.5 mt-2 md:hidden">
      <span
        v-for="(_, i) in images"
        :key="i"
        class="w-1.5 h-1.5 rounded-full transition-colors"
        :class="i === 0 ? 'bg-accent' : 'bg-border-hover'"
      />
    </div>

    <!-- Lightbox overlay -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          @click="close"
          @touchstart="onTouchStart"
          @touchend="onLightboxSwipe"
        >
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            @click.stop="close"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Previous -->
          <button
            v-if="images.length > 1"
            class="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            @click.stop="prev"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Image -->
          <img
            :src="images[currentIndex]"
            :alt="`${alt} screenshot ${currentIndex + 1}`"
            class="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            @click.stop
          />

          <!-- Next -->
          <button
            v-if="images.length > 1"
            class="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            @click.stop="next"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Counter -->
          <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span
              v-for="(_, i) in images"
              :key="i"
              class="w-2 h-2 rounded-full transition-colors cursor-pointer"
              :class="i === currentIndex ? 'bg-white' : 'bg-white/30'"
              @click.stop="currentIndex = i"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
