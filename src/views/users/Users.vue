<template>
  <div>
    <UserContent></UserContent>
  </div>
</template>

<script>
import UserContent from "./childComps/UserContent";

export default {
  name: "User",
  components: {
    UserContent
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style>

</style>