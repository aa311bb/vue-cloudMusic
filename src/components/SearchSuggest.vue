<template>
    <div class="suggest">
        <div>搜索:{{keywords}}</div>
        <ul class="suggest">
            <template v-if="suggestList.atrists">
             <li v-for="(v) in suggestList.atrists" :key="v.id" @click="$emit('change',v.name)">
                歌手:{{v.name}}
            </li>
            </template>
            <template v-if="suggestList.albums">
             <li v-for="(v) in suggestList.albums" :key="v.id" @click="$emit('change',v.name)">
                专辑:{{v.name}}
            </li>
            </template>
            <template v-if="suggestList.songs">
             <li v-for="(v) in suggestList.songs" :key="v.id" @click="$emit('change',v.name)">
                歌曲:{{v.name}}
            </li>
            </template>
            

        </ul>
    </div>
</template>
<script>
export default {
    name:"SearchSuggets",
    props:['keywords'],
    data(){
        return{
            suggestList:{}
        }
    },
    created(){
        this.loadSuggest(this.keywords);
    },
    watch:{
        keywords(val){
            this.loadSuggest(val);
              
            }
        },
    
    methods:{
        loadSuggest(val){
            this.$http.get('/search/suggest?keywords='+val+'&type=mobile').then(data=>{
            let result=data.data.result;
            this.suggestList=result;
            })
        }
        }
}
</script>
<style lang="less" scope>
    .suggest{
        div{
            width: 95%;
            margin: 5px auto;
            padding: 10px 0 0 5px;
        }
        li{
            width: 95%;
            margin: 0 auto;
            padding: 5px;
            border-bottom: 1px solid #DCDCDC;
        }
    }
</style>