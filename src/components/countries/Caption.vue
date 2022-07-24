<template>
      <caption
      class="
        d-flex
        flex-row
        justify-content-between
        align-items-center
        bd-highlight
        mb-1
      "
    >
      <span> LIST OF COUNTRIES ({{countriesData.length}}) </span>
      <div class="d-flex flex-row ">
        <div class="mr-2">
          <input
            class="form-control"
            style="text-transform: lowercase;"
            placeholder="Search All Type"
            v-model="allFilterReferance"
          />
        </div>

        <div>
          <input
            class="form-control"
            placeholder="Search capital"
            style="text-transform: lowercase;"
            v-model="capitalFilterReferance"
          />
      
        </div>
      </div>
    </caption>
</template>

<script>
export default {
    props:['countriesData'],
    data(){
      return {
      capitalFilterReferance:'',
      allFilterReferance:''
      }
    },
    created(){
      // at created we set out the default to table. 
      this.$emit('filteredData',this.countriesData)
      
    },
    watch:{
    // find the country infos according to capital. 
    capitalFilterReferance(filterWord){
        
     const countriesFilteredData = filterWord ?  this.countriesData.filter(({capital}) => {
       if(typeof capital != 'undefined' && capital) return  capital.toLowerCase().includes(filterWord) && capital ;
      }) : this.countriesData ;
      // we are sending the filtred data by capital to parent component via emit func.
      this.$emit('filteredData',countriesFilteredData)
    },

    // find the country infos according to all types.
    allFilterReferance(filterWord){
         const countriesFilteredData = filterWord ? this.countriesData.filter(({name,region,capital,flag}) => {
        return  capital?.toLowerCase().includes(filterWord) || name?.toLowerCase().includes(filterWord) || region?.toLowerCase().includes(filterWord)
        && {name,region,capital,flag} ;
      }) : this.countriesData
       // we are sending the filtred data by all type to parent component via emit func.
      this.$emit('filteredData',countriesFilteredData)

    }

  }

}
</script>
