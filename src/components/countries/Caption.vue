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
           
            placeholder="Search All Type"
            v-model="allFilterReferance"
          />
        </div>

        <div>
          <input
            class="form-control"
            placeholder="Search capital"
            
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

    methods:{

   convert (str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
},
      
      recursiveFilter(countryInfo,filterWord){
          const countryInfosValues = Object.values(countryInfo);
           
        return   countryInfosValues.find(valueOfCountry => {
                     
                  if(typeof valueOfCountry == 'string'  ) return valueOfCountry?.toLowerCase().includes(filterWord?.toString().toLowerCase());
                  if(typeof valueOfCountry == 'number') return  valueOfCountry?.toString().toLowerCase().includes(filterWord?.toString().toLowerCase())
                  if(typeof valueOfCountry == 'object'){
                    return this.recursiveFilter(valueOfCountry,filterWord)
                  }
                  return false;   
              
          })
      },
    },
    created(){
      // at created we set out the default to table. 
      this.$emit('filteredData',this.countriesData)
      
    },
    watch:{
    // find the country infos according to capital. 
    capitalFilterReferance(filterData){
      let filterWord = this.convert(filterData)
     const countriesFilteredData = filterWord ?  this.countriesData.filter(({capital}) => {
       if(typeof capital != 'undefined' && capital) return  capital.toLowerCase().includes(filterWord.toLowerCase()) && capital ;
      }) : this.countriesData ;
      // we are sending the filtred data by capital to parent component via emit func.
      this.$emit('filteredData',countriesFilteredData)
    },


    // find the country infos according to all types.
    allFilterReferance(filterData){
           let filterWord = this.convert(filterData)
         const countriesFilteredData = filterWord ? this.countriesData.filter((countryInfo) => {
            return this.recursiveFilter(countryInfo,filterWord)
      }) : this.countriesData
       // we are sending the filtred data by all type to parent component via emit func.
      this.$emit('filteredData',countriesFilteredData)

    }

  }

}
</script>
