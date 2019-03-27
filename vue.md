1、生命周期
vue 2.0
beforeCreate    组件实例刚刚被创建，组件的属性计算之前，如 data 属性等
created         组件实例创建完成，属性已绑定，但 DOM 还未生成，$el 属性还不存在
beforeMount     模板编译/挂载之前
mounted         模板编译/挂载之后
mounted         模板编译/挂载之后（不保证组件已在document中）
beforeUpdate    组件更新之前
updated         组件更新之后
activated       for keep-alive, 组件被激活时调用
deactivated     for keep-alive, 组件被移除时调用
beforeDestory   组件销毁前调用
destoryed       组件销毁后调用

<!DOCTYPE html>
<html>
<head>
    <title></title>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/vue/2.1.3/vue.js"></script>
</head>
<body>

<div id="app">
    <p>{{ message }}</p>
</div>

<script type="text/javascript">
    
  var app = new Vue({
      el: '#app',
      data: {
          message : "xuxiao is boy" 
      },
       beforeCreate: function () {
            console.group('beforeCreate 创建前状态===============》');
            console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
            console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
            console.log("%c%s", "color:red","message: " + this.message)  
        },
        created: function () {
            console.group('created 创建完毕状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //undefined
            console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
            console.log("%c%s", "color:red","message: " + this.message); //已被初始化
        },
        beforeMount: function () {
            console.group('beforeMount 挂载前状态===============》');
            console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
            console.log(this.$el);
            console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
            console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
        },
        mounted: function () {
            console.group('mounted 挂载结束状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
            console.log(this.$el);    
            console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
            console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
        },
        beforeUpdate: function () {
            console.group('beforeUpdate 更新前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);   
            console.log("%c%s", "color:red","data   : " + this.$data); 
            console.log("%c%s", "color:red","message: " + this.message); 
        },
        updated: function () {
            console.group('updated 更新完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el); 
            console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message); 
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message); 
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);  
               console.log("%c%s", "color:red","data   : " + this.$data); 
               console.log("%c%s", "color:red","message: " + this.message)
        }
    })
</script>
</body>
</html>

<!-- 实践调试： -->
beforeCreate: el 和 data 并未初始化

created:      完成了 data 数据的初始化，el 没有

beforeMount:  完成了 el 和 data 初始化  el 还是{{ message }}，这里运用的Virtual DOM （虚拟Dom）技术，先把坑占住，后面 mounted 挂载的时候再把值渲染进去。

mounted:      完成挂载

update： 当修改 data 里面的值时，将会触发 update 的操作。

有关于销毁，当执行 app.$destroy();  vue不再对此动作进行响应。但是原先生成的dom元素还存在，只是不再受控制

<!-- 使用场景： -->

beforecreate:   可在这加个loading事件

created:        在这结束loading，还做一些初始化，实现函数只执行

mounted：       在这发起后端请求，拿回数据，配合路由钩子做一些事情

beforeDestroy： 你确认删除XX吗？ destroyed：当前组件已被删除，清空相关内容 

<!-- 生命周期：初始化阶段 运行中阶段 销毁阶段 -->
Vue.component("aaa",{

    template:"#aaa",

    data:function(){

        return {msg:'hello'}

    },
    timer:null,

    methods:{

        destroy:function(){

            this.$destroy()//

        }
    },
    beforeCreate:function(){

        console.log('beforeCreate:刚刚new Vue()之后，这个时候，数据还没有挂载呢，只是一个空壳')    

        console.log(this.msg)//undefined

        console.log(document.getElementsByClassName("myp")[0])//undefined

    },
    created:function(){

        console.log('created:这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发updated函数')

        this.msg+='!!!'

        console.log('在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取')

        console.log('接下来开始找实例或者组件对应的模板，编译模板为虚拟dom放入到render函数中准备渲染')

    },
    beforeMount:function(){

        console.log('beforeMount：虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated')

        this.msg+='@@@@'

        console.log('在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取')

        console.log(document.getElementsByClassName("myp")[0])//undefined

        console.log('接下来开始render，渲染出真实dom')

    },
    // render:function(createElement){

    //     console.log('render')

    //     return createElement('div','hahaha')

    // },
    mounted:function(){ 

        console.log('mounted：此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了')

        console.log(document.getElementsByClassName("myp")[0])

        console.log('可以在这里操作真实dom等事情...')

    //    this.$options.timer = setInterval(function () {

    //        console.log('setInterval')

    //         this.msg+='!'  

    //    }.bind(this),500)

    },
    beforeUpdate:function(){

        //这里不能更改数据，否则会陷入死循环

        console.log('beforeUpdate:重新渲染之前触发')

        console.log('然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟dom树利用diff算法进行对比之后重新渲染')     

    },
    updated:function(){

        //这里不能更改数据，否则会陷入死循环

        console.log('updated:数据已经更改完成，dom也重新render完成')

    },
    beforeDestroy:function(){
        
        console.log('beforeDestory:销毁前执行（$destroy方法被调用的时候就会执行）,一般在这里善后:清除计时器、清除非指令绑定的事件等等...')

        // clearInterval(this.$options.timer)

    },
    destroyed:function(){

        console.log('destroyed:组件的数据绑定、监听...都去掉了,只剩下dom空壳，这里也可以善后')

    }
})

new Vue({}).$mount('#app')