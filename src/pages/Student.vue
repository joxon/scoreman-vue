<template>

</template>

<script>
export default {
  methods: {
    login() {
      this.$router.replace("/login");
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.replace("/");
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

