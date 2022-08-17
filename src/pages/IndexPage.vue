<template lang="pug">

q-page
  //- div
  div fbRef :{{fbRef}}
  q-input.col(v-model="fbRef")
  ListView(:refAddr="fbRef")

</template>

<script>
import { app } from 'src/boot/fb'
import { defineComponent } from 'vue'

import ListView from "../components/ListView.vue"


export default defineComponent(
  {
    name: "IndexPage",
    components: { ListView },
    data() {
        return {
            fbRef : 'addrs',
        };
    },
    methods: {
        select(data) { alert(JSON.stringify(data)); }
    }

})
</script>

<style lang="scss">
.name { font-size : 1rem; font-weight:bold;}
.tel { font-size: 0.8rem; font-weight:thin}
.good { background: lightgreen; }
</style>
