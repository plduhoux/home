<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Blog',
  description: '',
})
</script>

<template>
  <div :style="{ width: '1200px', height: '630px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '60px 80px', backgroundColor: '#0a0a0f', position: 'relative' }">
    <!-- Gradient accent bar top -->
    <div :style="{ position: 'absolute', top: '0', left: '0', right: '0', height: '6px', backgroundImage: 'linear-gradient(to right, #6366f1, #8b5cf6, #06b6d4)' }" />

    <!-- Site name -->
    <div :style="{ fontSize: '22px', fontWeight: '500', color: '#6366f1', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '28px' }">
      plduhoux.fr
    </div>

    <!-- Title -->
    <div :style="{ fontSize: title.length > 60 ? '44px' : '56px', fontWeight: '700', lineHeight: '1.15', color: '#f1f5f9', marginBottom: '24px' }">
      {{ title }}
    </div>

    <!-- Description -->
    <div v-if="description" :style="{ fontSize: '24px', lineHeight: '1.5', color: '#64748b', marginBottom: '0' }">
      {{ description.length > 120 ? description.slice(0, 120) + '...' : description }}
    </div>

    <!-- Bottom accent bar -->
    <div :style="{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '6px', backgroundImage: 'linear-gradient(to right, #06b6d4, #8b5cf6, #6366f1)' }" />
  </div>
</template>
