<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  components: { Header },

  data() {
    return {};
  },

  provide: {
    user: 'John',
  },
};
</script>

<style></style>
