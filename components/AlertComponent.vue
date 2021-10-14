<template>
  <v-alert v-show="$store.state.bus.message != ''" type="error">{{
    $store.state.bus.message
  }}</v-alert>
</template>
