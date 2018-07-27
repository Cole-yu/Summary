# 	grunt学习总结

### Gruntfile文件模板	
	module.exports = function(grunt) {
		//grunt配置
	  	grunt.initConfig({
	    	pkg: grunt.file.readJSON('package.json'),
	    	uglify: {
	      		options: {
	        		banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      		},
	      		build: {
	       			src: 'src/<%= pkg.name %>.js',
	        		dest: 'build/<%= pkg.name %>.min.js'
	      		}
	    	},
	    	clean:{
				dist:{
					src:['<%= pkg.name %>/**/*']
				}			
	    	}
		});
	  	// 加载包含"uglify"任务的插件
	  	grunt.loadNpmTasks('grunt-contrib-uglify');	
	  	grunt.loadNpmTasks('grunt-contrib-clean');		
	  	// 默认被执行的任务列表
	  	grunt.registerTask('default', ['uglify','clean']);
	};


### 任务的三种写法
1. 	第一种方法{src、dest}
	```
	copy:{
		didt_html: {
	       	src: 'src/<%= pkg.name %>/index.html',
	        dest: 'build/<%= pkg.name %>/index.html'
	    },
	    dist_js:{
	    	src: 'src/<%= pkg.name %>/js/index.js',
	        dest: 'build/<%= pkg.name %>/js/index.js'
	    }
	}
	```
2. 	第二种方法(files array format);files:数组格式
	```
	copy:{
		dist_html_js:{
			files:[{
				src: 'src/<%= pkg.name %>/index.html',
		        dest: 'build/<%= pkg.name %>/index.html'
			},
			{
				src: 'src/<%= pkg.name %>/js/index.js',
		        dest: 'build/<%= pkg.name %>/js/index.js'
			}]	
		}	
	}
	```
3.  第三方法(fils object format);键值对格式,key为输出目标文件,value为源文件
	```
	copy:{
		dist_html_js:{
			files:{
				'build/<%= pkg.name %>/index.html':'src/<%= pkg.name %>/index.html',
				'build/<%= pkg.name %>/js/index.js':['src/<%= pkg.name %>/js/index.js']
			}
		}		
	}
	```

### 路径通配符
	src:['<%= pkg.name %>src/**/*.js']  //匹配package.josn 的name字段文件夹下的src文件夹下的所有以.js后缀名结尾的文件
	注意：*匹配任意数量任意字符,但不包括'/'
	？只匹配一个字符,但不包括'/'
	**匹配任意数量任意字符,且包括'/'
	{ } 匹配枚举文件;示例{main,app}.js,匹配main.js或app.js
	! 不匹配后面的文件
