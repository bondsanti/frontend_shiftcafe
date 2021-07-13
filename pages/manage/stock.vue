<template> 
   <stock :stock ="stock" />
</template>
<script>
import stock from '@/components/manage/stock.vue'

export default {
     async asyncData(context) {
    const stock = await context.$axios.$get("/stock");

    console.log(stock);
    return { stock };
  },
  components:{ 
     stock ,  
     }
}
</script>