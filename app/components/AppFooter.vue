<template>
  <footer class="border-t border-(--ui-border) bg-(--ui-bg)">
    <div class="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <div class="grid gap-8 sm:grid-cols-3">
        <div>
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">Documentation</h3>
          <ul class="mt-3 flex flex-col gap-2">
            <li><NuxtLink to="/docs/guides/introduction" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">Guides</NuxtLink></li>
            <li><NuxtLink to="/docs/api-reference/authentication" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">API Reference</NuxtLink></li>
            <li><NuxtLink to="/docs/examples/basic-usage" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">Examples</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">Community</h3>
          <ul class="mt-3 flex flex-col gap-2">
            <li><a href="https://github.com/myorg/open-platform" target="_blank" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">GitHub</a></li>
            <li><a href="https://discord.gg/open-platform" target="_blank" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">Discord</a></li>
            <li><a href="https://github.com/myorg/docs-site/issues" target="_blank" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">Report an Issue</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">Resources</h3>
          <ul class="mt-3 flex flex-col gap-2">
            <li><a href="https://dashboard.myproject.com" target="_blank" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">Dashboard</a></li>
            <li><a href="https://status.myproject.com" target="_blank" class="text-sm text-(--ui-text-muted) hover:text-(--ui-text)">Status</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 border-t border-(--ui-border) pt-6 text-center text-xs text-(--ui-text-dimmed)">
        &copy; {{ new Date().getFullYear() }} Botim Open Platform. All rights reserved.
      </div>
    </div>
  </footer>
</template>
