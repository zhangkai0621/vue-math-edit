import { log } from 'util';
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        goToPage(url) {
            this.$router.push(url);
        }
    }
}
</script>

<style scoped>
div {
    margin: 30px 0;
}
</style>
