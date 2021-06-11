<template>
  <error-page :path="path"> </error-page>
</template>

<script>
import ErrorPage from '@/components/error-page.vue'

export default {
  components: {
    ErrorPage,
  },
  data() {
    return {
      path: '',
    }
  },

  watch: {
    '$route.path': {
      handler() {
        this.path = this.$route.path
      },
      immediate: true,
    },
  },
}
</script>
