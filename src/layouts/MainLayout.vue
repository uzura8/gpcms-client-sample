<template>
  <div class="flex flex-col h-screen">
    <header class="bg-blue-200">
      <div class="p-4 max-w-screen-xl mx-auto">Header</div>
    </header>
    <div class="flex-1">
      <div class="md:grid md:grid-cols-12 h-full max-w-screen-xl mx-auto">
        <main class="md:col-span-9 lg:col-span-10 p-4">
          <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterView />
          </nav>
        </main>
        <aside class="md:col-span-3 lg:col-span-2 bg-blue-100 p-4">
          Side
        </aside>
      </div>
    </div>
    <footer class="bg-blue-200">
      <div class="p-4 max-w-screen-xl mx-auto">Footer</div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
