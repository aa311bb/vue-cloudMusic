<template>
  <div id="app">
    <TopNav></TopNav>
    <Play></Play>
    <div :style="{
      paddingTop:$route.meta.showNav?'43px':''
      }"></div>
    <router-view></router-view>
    <div :style="{
      paddingBottom:$root.musicStore.musicID?'60px':''
    }"></div>
  </div>
</template>
<script>
import TopNav from './components/TopNav'
import Play from '@/components/Play'
export default {
  name:"App",
  data(){
    return{
      
    }
  },
  methods:{
    
  },
  created(){},
  components:{
    TopNav,
    Play
  }
}
</script>
<style>

</style>
