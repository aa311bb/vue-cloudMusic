<template>
<div>
    <form @submit.prevent="change(keywords)">
        
    
    <div class="input">
            <i></i>
            <input type="text" v-model="keywords" @input="inputing=true" placeholder="搜索歌曲"/>
    </div>
    </form>
        <component :is="search" :keywords="keywords" @change="change"></component>
        
</div>
</template>
<script>
import HotSearch from '@/components/HotSearch'
import SearchSuggest from '@/components/SearchSuggest'
import SearchResult from '@/components/SearchResult'
export default {
    name:"Search",
    data(){
        return{
            search:"HotSearch",
            keywords:'',
            inputing:false //标记文本框是否正在输入
        }
    },
    watch:{
        keywords(val){
            if(val==""){
                this.search="HotSearch"
            }
            else if(this.inputing){
                this.search="SearchSuggest"
            }
            
        }
    },
    components:{
        HotSearch,
        SearchSuggest,
        SearchResult
    },
    methods:{
        change(val){
            this.keywords=val;
            this.inputing=false;
            this.search="SearchResult"
        }
    }
    
}
</script>
<style lang="less" scoped>
    .input{
        position: relative;
        width: 100%;
        height: 30px;
        padding:0 30px;
        box-sizing: border-box;
        background-color: #ebecec;
        border-radius: 30px;
        display: flex;
        align-items: center;
        i{
            display: inline-block;
        }
        input{
            flex: 1;
            background-color: transparent;
            outline: none;
            border: none;
        }
    }
 
</style>