<template>
  <el-row type="flex" width="100px">
    <el-form label-width="80px">
      <el-form-item label="用户类型">
        <el-tag>{{usertype}}</el-tag>
      </el-form-item>
      <el-form-item label="用户名">
        <el-tag>{{username}}</el-tag>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">更新密码</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {};
    },
    // https://cn.vuejs.org/v2/guide/computed.html
    // 计算属性
    // 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
    //相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。
    // 我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。
    computed: {
      usertype() {
        return this.$store.state.user.usertype;
      },
      username() {
        return this.$store.state.user.username;
      }
    }
  };

</script>
