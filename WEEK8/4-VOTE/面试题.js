//=>珠峰培训面试题讲解
function fun(n, o) {
    console.log(o);
    return {
        fun: function (m) {
            return fun(m, n);
        }
    };
}
var a = fun(0);//=>undefined
a.fun(1);//=>0
a.fun(2);//=>0
a.fun(3);//=>0
var b = fun(0).fun(1).fun(2).fun(3);//=>undefined 0 1 2
/*
 * fun(0) =>行成一个不销毁的私有作用域  n=0  o=undefined  [undefined]
 * 返回对象.fun(1) =>m=1  n=不是私有的找上级作用域(0) =>fun(1,0) =>行成一个不销毁的私有作用域 n=1 o=0  [0]
 * 第二步结束后也返回一个对象,我们让对象中的.fun(2) =>m=2  =>fun(2,n) n是上一次保存的1 [1]
 * ...
 */
var c = fun(0).fun(1);//=>undefined 0
c.fun(2);//=>1
c.fun(3);//=>1
