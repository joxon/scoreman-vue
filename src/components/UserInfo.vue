<template>
    <div>
        <p>{{ usertype }}</p>
        <p>{{ username }}</p>
    </div>
</template>

<script>
export default {
    computed:{
        usertype(){
            return this.$store.state.user;
        }
    }
}
</script>
