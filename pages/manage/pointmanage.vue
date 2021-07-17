<template>
  <pointmanage />
</template>

<script>

import pointmanage from '@/components/manage/pointmanage.vue'
export default {
    middleware: ["auth", "check"],
   components:{ 
     pointmanage ,
   
     }

}
</script>

<style>

</style>