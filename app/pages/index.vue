<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: 'Botim OP Docs — Open Platform Documentation' })

const searchOpen = useState('search-open', () => false)

const categories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and set up your development environment.',
    icon: 'i-lucide-rocket',
    to: '/docs/getting-started/introduction',
    color: 'text-blue-500',
  },
  {
    title: 'Guides',
    description: 'In-depth guides for configuration, deployment, and best practices.',
    icon: 'i-lucide-book-open',
    to: '/docs/guides/configuration',
    color: 'text-emerald-500',
  },
  {
    title: 'API Reference',
    description: 'Complete REST API documentation with examples and error codes.',
    icon: 'i-lucide-code',
    to: '/docs/api-reference/endpoints',
    color: 'text-violet-500',
  },
]

const features = [
  {
    title: 'Full-Text Search',
    description: 'Instantly find what you need across all documentation with advanced search.',
    icon: 'i-lucide-search',
  },
  {
    title: 'MDC Markdown',
    description: 'Rich documentation powered by Markdown Components with syntax highlighting.',
    icon: 'i-lucide-file-text',
  },
  {
    title: 'Live Editing',
    description: 'Edit documentation in the browser with Monaco editor and real-time preview.',
    icon: 'i-lucide-pencil',
  },
  {
    title: 'Dark Mode',
    description: 'Comfortable reading experience in any lighting with automatic theme support.',
    icon: 'i-lucide-moon',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="border-b border-(--ui-border) bg-gradient-to-b from-(--ui-bg-elevated)/50 to-(--ui-bg)">
      <div class="mx-auto max-w-5xl px-4 py-20 text-center lg:px-8 lg:py-32">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-(--ui-border) bg-(--ui-bg-elevated) px-4 py-1.5 text-sm text-(--ui-text-muted)">
          <UIcon name="i-lucide-sparkles" class="size-4 text-(--ui-primary)" />
          Open Platform Documentation
        </div>

        <h1 class="text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted) sm:text-5xl lg:text-6xl">
          Build with
          <span class="text-(--ui-primary)">Botim</span>
          Open Platform
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-lg text-(--ui-text-muted)">
          Everything you need to integrate with the Botim ecosystem.
          Messaging APIs, payment gateway, mini apps, and more.
        </p>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <UButton to="/docs/getting-started/introduction" size="lg" icon="i-lucide-arrow-right" trailing>
            Get Started
          </UButton>
          <UButton
            variant="outline"
            color="neutral"
            size="lg"
            icon="i-lucide-search"
            @click="searchOpen = true"
          >
            Search Docs
          </UButton>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <h2 class="text-center text-2xl font-bold text-(--ui-text-highlighted)">
        Explore the Documentation
      </h2>
      <p class="mt-2 text-center text-(--ui-text-muted)">
        Jump to the section that fits your needs.
      </p>

      <div class="mt-10 grid gap-6 sm:grid-cols-3">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.title"
          :to="cat.to"
          class="group rounded-xl border border-(--ui-border) p-6 transition-all hover:border-(--ui-primary)/50 hover:shadow-lg"
        >
          <UIcon :name="cat.icon" :class="cat.color" class="size-10" />
          <h3 class="mt-4 text-lg font-semibold text-(--ui-text-highlighted) group-hover:text-(--ui-primary)">
            {{ cat.title }}
          </h3>
          <p class="mt-2 text-sm text-(--ui-text-muted)">
            {{ cat.description }}
          </p>
        </NuxtLink>
      </div>
    </section>

    <!-- Features -->
    <section class="border-t border-(--ui-border) bg-(--ui-bg-elevated)/50 px-4 py-16 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-center text-2xl font-bold text-(--ui-text-highlighted)">
          Powerful Documentation Platform
        </h2>
        <p class="mt-2 text-center text-(--ui-text-muted)">
          Built with modern tools for the best developer experience.
        </p>

        <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="feature in features" :key="feature.title" class="text-center">
            <div class="mx-auto flex size-12 items-center justify-center rounded-lg bg-(--ui-primary)/10">
              <UIcon :name="feature.icon" class="size-6 text-(--ui-primary)" />
            </div>
            <h3 class="mt-4 font-semibold text-(--ui-text-highlighted)">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-sm text-(--ui-text-muted)">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-5xl px-4 py-16 text-center lg:px-8">
      <h2 class="text-2xl font-bold text-(--ui-text-highlighted)">
        Ready to get started?
      </h2>
      <p class="mt-2 text-(--ui-text-muted)">
        Set up your environment in minutes and start building.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <UButton to="/docs/getting-started/installation" size="lg">
          Installation Guide
        </UButton>
        <UButton to="/docs/api-reference/endpoints" variant="outline" color="neutral" size="lg">
          API Reference
        </UButton>
      </div>
    </section>
  </div>
</template>
