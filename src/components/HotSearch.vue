<template>
    <div>
        
        <ul class="hotSearch">
            <li v-for="(hot,index) in hotSearch" :key="index" @click="$emit('change',hot.first)">{{hot.first}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"HotSearch",
    data(){
        return{
            hotSearch:[]
        }
    },
    created(){
        this.$http.get('/search/hot').then(data=>{
            this.hotSearch=data.data.result.hots
        })
    }
}
</script>
<style lang="less" scoped>
   .hotSearch{
        list-style: none;
        overflow: hidden;
        li{
            float: left;
            border: 1px solid #ddd;
            font-size: 12px;
            padding: 5px;
            border-radius: 15px;
            margin: 5px;
        }
    }

</style>