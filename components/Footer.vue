<template>
  <v-footer
    color="secondary lighten-1"
    padless
  >


    <v-col
      class="foot lighten-2 py-4 text-center white--text"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>LoveTeam CA B3</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  data: () => ({

  }),
}
</script>

<style>
.foot {
  background-color: #778DA9;
}

</style>
