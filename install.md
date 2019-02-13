npm install -g vue-cli
vue init webpack butterfly-front
npm install --save axios vuex
npm i --save-dev underscore json-server




npm list --depth=0 -g
+-- npm-check-updates@2.15.0
`-- vue-cli@2.9.6

上传代码到远程分支：
git push --set-upstream origin master
首次上传新分支输入以上命令，不是的话只要输入git push就可以了。

干净的回退到上次提交之后的东西：
我查了下有两个相关的命令：
1. git clean -df
2. git reset --hard
但问题是第一个命令只删除所有untracked的文件，如果文件已经被tracked, 修改过的文件不会被回退。
而第二个命令只把tracked的文件revert到前一个版本，对于untracked的文件(比如编译的临时文件)都不会被删除。

 

如果你有的修改以及加入暂存区的话 
那么 
git reset --hard 
git clean -xdf 

