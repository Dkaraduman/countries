<template>
<div class="table-responsive">
      <table class="table caption-top">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Capital</th>
          <th scope="col">Region</th>
          <th scope="col">Flag</th>
        </tr>
      </thead>
      <tbody v-if="countriesData.length">
        <tr
          v-for="(country, index) in countriesData"
          :key="country.name + country.capital"
          class=""
        >
          <th scope="row">{{ index + 1 }}</th>
          <td v-for="(value, key) in country" style="height: 50px" :key="key">
            <img
              v-if="key == 'flag'"
              :src="value"
              style="width: 25px; height: 25px"
              class="rounded-2"
              :alt="`imageOf${value}`"
            />
            <span v-else> {{ value }}</span>
          </td>
        </tr>
      </tbody>
      <div v-else style="position: absolute;top: 40%;left:44%;">
       NO RESULT :(
      </div>
    </table>
    </div>
</template>

<script>
export default {
props:['countriesFilteredData'],
data(){
return {
  countriesData:[]
}
},

created(){

     this.countriesData = this.countriesFilteredData.map(({ name, capital, region, flag }) => {
            return { name, capital, region, flag };
          });
}

}
</script>

