<template>
  <header class="navbar">
    <nav>
      <router-link to="/" exact>
        <h1>{{ brand }}</h1>
      </router-link>
      <div class="links">
        <router-link v-for="link in links" :key="link.id" :to="link.path" exact>
          {{ link.text }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      brand: 'Compro OnBoarding',
      links: [
        { text: 'Dashboard', path: '/' },
        { text: 'Add Task', path: '/add-task' },
        { text: 'About', path: '/about' },
      ],
    };
  },
};
</script>

<style scoped src="./styles.css"></style>
