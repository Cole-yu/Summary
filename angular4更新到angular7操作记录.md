# angular4更新到angular7记录

### 准备工作
	1. 更新全局Angular项目脚手架	
		cnpm install -g @angular/cli
	2. 进入到项目的package.json目录中，更新项目的angular脚手架
		npm install @angular/cli
		ng update @angular/cli
		npm install --save-dev @angular/cli@latest

### 更新项目配置
1. 首先进入到项目package.json目录，使用ng update
得到提示 ng update @angular/core  和 ng update rxjs
2. 执行ng update @angular/core
	提示报错：
	Package "angular-in-memory-web-api" has an incompatible peer dependency to "@angular/http" (requires ">=2.0.0 <6.0.0" (extended), would install "7.2.0").
    Package "angular-in-memory-web-api" has an incompatible peer dependency to "@angular/core" (requires ">=2.0.0 <6.0.0" (extended), would install "7.2.0").
    Package "angular-in-memory-web-api" has an incompatible peer dependency to "@angular/common" (requires ">=2.0.0 <6.0.0" (extended), would install "7.2.0").
    Package "angular-in-memory-web-api" has an incompatible peer dependency to "rxjs" (requires "^5.1.0", would install "6.3.3").
    解决方法：把package.json中的angular-in-memory-web-api的删除，重新安装，cnpm install angular-in-memory-web-api --save-dev
3.  在执行 cnpm install angular-in-memory-web-api --save-dev 时报错，得到提示：
	peerDependencies WARNING angular-in-memory-web-api@* requires a peer of @angular/common@>=6.0.0 <8.0.0 but @angular/common@5.2.11 was installed
	peerDependencies WARNING angular-in-memory-web-api@* requires a peer of @angular/core@>=6.0.0 <8.0.0 but @angular/core@5.2.11 was installed
	peerDependencies WARNING angular-in-memory-web-api@* requires a peer of rxjs@^6.0.0 but rxjs@5.5.12 was installed
	解决方法：把package.json中@angular/core和@angular/core改为"^7.2.0"(在第二步中有出现)，把rxjs改为"^6.0.0"(提示中有出现)，重新执行cnpm install
4.  执行cnpm install时报错，得到提示：
	peerDependencies WARNING @angular/http@^7.2.0 requires a peer of @angular/platform-browser@7.2.0 but @angular/platform-browser@5.2.11 was installed
	解决方法：把package中@angular/platform-browser的值改为"7.2.0",在执行cnpm install,执行成功
5.	再cnpm install 成功后，环境回到第二步，表示可以安装angular-in-memory-web-api，执行cnpm install angular-in-memory-web-api --save-dev，
	ngular-in-memory-web-api更新成功
6.  接下来更新第二步中@angular/core，执行ng update @angular/core,提示报错
	npm WARN checkPermissions Missing write access to D:\angular2-workspace\cy\node_modules\extglob\node_modules\is-extglob
	npm WARN checkPermissions Missing write access to D:\angular2-workspace\cy\node_modules\fill-range\node_modules\isobject
	npm WARN checkPermissions Missing write access to D:\angular2-workspace\cy\node_modules\micromatch\node_modules\is-extglob
	npm WARN checkPermissions Missing write access to D:\angular2-workspace\cy\node_modules\micromatch\node_modules\is-glob
	npm WARN @angular/core@7.2.0 requires a peer of zone.js@~0.8.26 but none is installed. You must install peer dependencies yourself.
	解决方法：把package.json中zone.js的值改为"~0.8.26",再执行cnpm install，执行成功。
7.	第六步把zone.js更新完成后，再执行ng update @angular/core ,执行成功，完成angular/core的更新

8. 使用rxjs-tslint自动更新规则删除已弃用的RxJS 6功能
```	
	npm install -g rxjs-tslint
	rxjs-5-to-6-migrate -p src/tsconfig.app.json
```


### 项目修复
```
	1. 报错 error TS2339: Property 'combineLatest' does not exist on type 'typeof Observable'
	Observable.combineLatest() 改为 combineLatest()，并引入 import { combineLatest } from 'rxjs';

	2. 安装最新的ng2-tree,ngx-bootstrap , cnpm install ngx-bootstrap --save

	3. 报错 Error: rxjs/Subject"' has no exported member 'Subject'
	把 import { Subject } from 'rxjs/Subject'; 改为 import {Subject} from 'rxjs';

	4. 报错 Cannot find module 'rxjs-compat/Observable'，安装 npm install --save rxjs-compat

	5. // import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
	   改为
	   import { BsModalRef } from 'ngx-bootstrap';
```