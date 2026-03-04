<script setup lang="ts">
const colorMode = useColorMode()

const categories = [
  {
    title: 'Guides',
    description: 'Step-by-step tutorials to get you from zero to production. Learn the fundamentals, configure your environment, and deploy with confidence.',
    icon: 'i-lucide-rocket',
    to: '/docs/guides/introduction',
  },
  {
    title: 'API Reference',
    description: 'Complete reference for all API endpoints, authentication methods, error codes, and rate limiting policies.',
    icon: 'i-lucide-code',
    to: '/docs/api-reference/authentication',
  },
  {
    title: 'Examples',
    description: 'Practical code examples and integration patterns. Copy, paste, and adapt to your use case.',
    icon: 'i-lucide-file-code',
    to: '/docs/examples/basic-usage',
  },
]

const features = [
  {
    title: 'Fast Integration',
    description: 'Get up and running in under 5 minutes with our SDK and comprehensive quick start guide.',
    icon: 'i-lucide-zap',
  },
  {
    title: 'Enterprise Security',
    description: 'Built-in encryption, API key rotation, and role-based access control to keep your data safe.',
    icon: 'i-lucide-shield',
  },
  {
    title: 'Global Scale',
    description: 'Deploy across multiple regions with automatic failover and low-latency edge infrastructure.',
    icon: 'i-lucide-globe',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden border-b border-(--ui-border) bg-(--ui-bg)">
      <div class="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
        <img
          :src="colorMode.value === 'dark' ? '/logo/logo-light.svg' : '/logo/logo-dark.svg'"
          alt="Botim OP"
          class="mx-auto mb-6 h-16 w-16"
        >
        <h1 class="text-4xl font-bold tracking-tight text-(--ui-text-highlighted) sm:text-5xl">
          Botim Open Platform Documentation
        </h1>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-(--ui-text-muted)">
          Everything you need to build, integrate, and scale with Botim Open Platform. Comprehensive guides, detailed API reference, and practical examples.
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <UButton
            to="/docs/guides/introduction"
            size="lg"
            trailing-icon="i-lucide-arrow-right"
          >
            Get Started
          </UButton>
          <UButton
            to="/docs/api-reference/authentication"
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-lucide-book-open"
          >
            API Reference
          </UButton>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="mx-auto max-w-5xl px-6 py-16">
      <h2 class="text-center text-2xl font-bold text-(--ui-text-highlighted)">
        Explore the Documentation
      </h2>
      <p class="mt-2 text-center text-(--ui-text-muted)">
        Choose a section to dive into.
      </p>
      <div class="mt-10 grid gap-6 sm:grid-cols-3">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.title"
          :to="cat.to"
          class="group rounded-xl border border-(--ui-border) p-6 transition-all hover:border-(--ui-border-accented) hover:shadow-sm"
        >
          <UIcon :name="cat.icon" class="size-8 text-(--ui-primary)" />
          <h3 class="mt-3 text-lg font-semibold text-(--ui-text-highlighted)">
            {{ cat.title }}
          </h3>
          <p class="mt-1 text-sm text-(--ui-text-muted)">
            {{ cat.description }}
          </p>
        </NuxtLink>
      </div>
    </section>

    <!-- Why section -->
    <section class="border-t border-(--ui-border) bg-(--ui-bg-elevated)/50 px-6 py-16">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-center text-2xl font-bold text-(--ui-text-highlighted)">
          Why Botim Open Platform?
        </h2>
        <div class="mt-10 grid gap-8 sm:grid-cols-3">
          <div v-for="feat in features" :key="feat.title" class="text-center">
            <UIcon :name="feat.icon" class="mx-auto size-8 text-(--ui-primary)" />
            <h3 class="mt-3 text-lg font-semibold text-(--ui-text-highlighted)">
              {{ feat.title }}
            </h3>
            <p class="mt-1 text-sm text-(--ui-text-muted)">
              {{ feat.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
