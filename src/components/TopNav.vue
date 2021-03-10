<template>
    <ul class="topnav">
        <li><router-link to="/recommend">推荐音乐</router-link>  </li>
        <li><router-link to="/hot">热歌榜</router-link>  </li>
        <li><router-link to="/search">搜索</router-link>  </li>
        <li><router-link to="/mv">MV</router-link></li>
    </ul>
</template>
<style lang="less" scoped>
.topnav{
    display: flex;
    border-bottom: 1px solid #ccc;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 3;
    background-color: white;
    li{
        flex: 1;
        text-align: center;
        line-height: 40px;
        a{
            color: #333;
            text-decoration: none;
            &.router-link-exact-active{
                color:#dd001b;
                border-bottom: 2px solid #dd001b;
            }
        }
    }
}
</style>