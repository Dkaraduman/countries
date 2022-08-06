<template>
  <div class=" mx-auto w-75 mt-5" v-if="countriesData.length">
    <CaptionFilter @filteredData="setFilteredData" :countriesData="countriesData" />
    <TableCountries :countriesFilteredData="getFilteredData" :key="getFilteredData.length" />   
  </div>
    <!--spinner --> 
     <Loading style="width:200px;height:200px;position:fixed; top:42%;left:42%;" v-if="countriesData.length == 0"/>
</template>

<script>
import TableCountries from './Table.vue';
import CaptionFilter from './Caption.vue';
import Loading from '@/assets/loading/loading.vue';
export default {
  data() {
    return {
      countriesData: [],
      countriesFilteredData:[]
     
    };
  },
  components:{
    TableCountries,
    CaptionFilter,
    Loading
  },

  methods: {
    getCountriesData() {
      this.$axios
        .get("https://restcountries.com/v2/all")
        .then(({ data }) => {
          
          this.countriesData = data;
        })
        .catch((err) => {
          alert(err || "Internal Server Error");
        });
    },

    setFilteredData(filteredData){
    this.countriesFilteredData = filteredData; 
    }
  },

  computed:{
    getFilteredData(){
        return this.countriesFilteredData;
    }
  },


  created() {
    // we run this func to set the table data.
    this.getCountriesData();

  },
};
</script>

