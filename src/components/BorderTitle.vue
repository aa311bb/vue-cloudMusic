<template>
    <h3 class="border-title"><slot></slot></h3>
</template>
<style lang="less" scoped>
    .border-title{
        padding-left: 5px;
        padding: 0px;
        line-height: 40px;
        &::before{
            content:"";
            height: 14px;
            display: inline-block;
            border-left: 3px solid #dd001b;
            padding-right: 10px;
        }
    }
</style>