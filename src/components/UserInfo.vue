<template>
    <div>
        <p>用户类型： {{ user.usertype }}</p>
        <p>用户名： {{ user.username }}</p>
        <p>密码： {{ user.password }}</p>
    </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
