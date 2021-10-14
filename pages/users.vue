<template>
  <div>
    <h1>Couocu</h1>
    {{ users }}
  </div>
</template>

<script>
export default {
  data: () => ({
    users: [],
  }),
  mounted() {
    // this.$fire.firestore
    //   .collection('users')
    //   .get()
    //   .then(
    //     (listUser) => (this.users = listUser.docs.map((user) => user.data()))
    //   )

    // this.$fire.firestore
    //   .collection('users')
    //   .where('email', '==', 'jane@domain.tld')
    //   .get()
    //   .then(
    //     (listUser) =>
    //       (this.users = listUser.docs.map((user) => {
    //         const { email, displayName } = user.data()
    //         const uid = user.id

    //         return { ...{ email, displayName }, ...{ uid } }
    //       }))
    //   )

    this.$fire.firestore
      .collection('users')
      .doc('EqeVDsRTA5BOG7gCUiGY')
      .get()
      .then((user) => console.log(user.data()))
  },
}
</script>
