<template>
  
  <employee :employee="employee" />
</template>

<script>
import employee from '@/components/manage/employee.vue'
export default {
    async asyncData(context) {
    const employee =  context.$axios.$get("/employee");

    console.log(employee);
    return { employee };
  },
   components:{ 
     employee ,
   
     }

}
</script>

<style>

</style>