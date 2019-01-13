# springMVC学习笔记

### 修改Web.xml的标准
```
	// 在2.3标准中默认会关闭EL表达式语言
	<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE PUBLIC 
	"-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
	"http://java.sun.com/dtd/web-app_2_3.dtd">
		<web-app>

	修改为

	// 使用2.4标准
	<?xml version="1.0" encoding="UTF-8"?>
	<web-app version="2.4" xmlns="http://java.sun.com/xml/ns/j2ee"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee 
		http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">	
		<web-app>
```

### 理解层次化的ApplicationContext

### spring的上下文环境（applicationContext.xml）
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
		xmlns:mvc="http://www.springframework.org/schema/mvc"
		xsi:schemaLocation="
	        http://www.springframework.org/schema/beans
	        http://www.springframework.org/schema/beans/spring-beans.xsd
	        http://www.springframework.org/schema/context 
	        http://www.springframework.org/schema/context/spring-context.xsd
	        http://www.springframework.org/schema/mvc
	        http://www.springframework.org/schema/mvc/spring-mvc.xsd">

### springMVC的dispatcher的xml标准声明
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
		xmlns:mvc="http://www.springframework.org/schema/mvc"
		xsi:schemaLocation="
	        http://www.springframework.org/schema/beans
	        http://www.springframework.org/schema/beans/spring-beans.xsd
	        http://www.springframework.org/schema/context 
	        http://www.springframework.org/schema/context/spring-context.xsd
	        http://www.springframework.org/schema/mvc
	        http://www.springframework.org/schema/mvc/spring-mvc.xsd">

### Controller
```
	// 通过RequestParam获取url中的参数（http://localhost:8080/courses/view?courseId=3）
	@RequestMapping(value="/view", method=RequestMethod.GET)
	public String viewCourse(@RequestParam("courseId") Integer courseId , Model model) {
		// todo...
	}

	// 通过PathVariable获取url中的参数（restful风格） http://localhost:8080/courses/view/3
	处理http://localhost:8080/courses/view/{courseId}形式的url
	@RequestMapping("/view2/{courseId}")
	public String viewCourse2(@PathVariable("courseId") Integer courseId, Map<String, Object> model) {
		// todo...
	}

	// 通过HttpServletRequest处理 http://localhost:8080/courses/view?courseId=123 形式的URL
	@RequestMapping("/view3")
	public String viewCourse3(HttpServletRequest request) {
		Integer courseId = Integer.valueOf(request.getParameter("courseId"));  // getParameter获取指定参数
		// todo...
	}
```

### 请求重定向与请求转发的区别
	请求重定向，客户端其实发出了两次请求；
	请求转发，客户端只请求一次，在后台进行Servlet转发；
	@RequestMapping(value="/save", method = RequestMethod.POST)
	public String doSave(@ModelAttribute Course course){		// 模型对象与页面的数据绑定
		
		log.debug("Info of Course:");  // log包
		log.debug(ReflectionToStringBuilder.toString(course));
		
		//在此进行业务操作，比如数据库持久化
		course.setCourseId(123);
		return "redirect:view2/"+course.getCourseId();	// 加了redirect是访问路径，没有redirect才会加.jsp
	}

### Bind
```
	Model / ModelMap / ModelAndView
	@ModelAttribute标注可被应用在方法或方法参数上

	1. 标注在方法上的@ModelAttribute
		* 标注在方法上的@ModelAttribute说明方法是用于添加一个或多个属性到model上。这样的方法能接受与@RequestMapping标注相同的参数类型，只不过不能直接被映射到具体的请求上。
		* 在同一个控制器中，标注了@ModelAttribute的方法会在@RequestMapping方法之前被调用。<<<====(很重要的一条规则)
		* @ModelAttribute标注方法有两种风格：
			第一种写法中，方法通过返回值的方式默认地将添加一个属性；			
			// Add one attribute
			// The return value of the method is added to the model under the name "account"
			// You can customize the name via @ModelAttribute("myAccount")
			@ModelAttribute
			public Account addAccount(@RequestParam String number) {
			    return accountManager.findAccount(number);
			}
			注意事项：
				<1> 属性名没有被显式指定的时候，框架将根据属性的类型给予一个默认名称（方法返回的类型【Account类】的首字母小写规则）
				 	例如，若方法返回一个Account类型的对象，则默认的属性名为"account"。
				<2> 可以通过设置@ModelAttribute标注的值来改变默认值，@ModelAttribute("myAccount")。
				<3> 如果方法没有返回值，那么就可以在方法的形参中加上一个Model形参，然后在代码里就行addAttribute
				 	@ModelAttribute  
			        public void populateModel(@RequestParam String abc, Model model) {  
			           model.addAttribute("attributeName", abc);  //在model中添加属性为attributeName,值为abc参数值
			        } 

			第二种写法中，方法接收一个Model对象，然后可以向其中添加任意数量的属性。
			// Add multiple attributes
			@ModelAttribute
			public void populateModel(@RequestParam String number, Model model) {
			    model.addAttribute(accountManager.findAccount(number));
			    // add more ...
			}
				当向Model中直接添加属性时，请使用合适的重载方法addAttribute(..)-即带或不带属性名的方法

	2. 标注在方法参数上的@ModelAttribute
		* 标注在方法参数上的@ModelAttribute说明了该方法参数的值将由model中取得。
		* 如果model中找不到，那么该参数会先被实例化，然后被添加到model中。在model中存在以后，请求中所有名称匹配的参数都会填充到该参数中。
		* 在Spring MVC中被称为数据绑定，一个非常有用的特性，我们不用每次都手动从表格数据中转换这些字段数据。
			> WebDataBinder类能将请求参数——包括字符串的查询参数和表单字段等——通过名称匹配到model的属性上。
			> 成功匹配的字段在需要的时候会进行一次类型转换（从String类型到目标字段的类型），然后被填充到model对应的属性中。
		* 进行了数据绑定后，则可能会出现一些错误，比如没有提供必须的字段、类型转换过程的错误等。
		  若想检查这些错误，可以在标注了@ModelAttribute的参数紧跟着声明一个BindingResult参数：
			@RequestMapping(path = "/owners/{ownerId}/pets/{petId}/edit", method = RequestMethod.POST)
			public String processSubmit(@ModelAttribute("pet") Pet pet, BindingResult result) {

			    new PetValidator().validate(pet, result);  	// 把该对象传给自己定制的验证器来调用验证
			    if (result.hasErrors()) {					// 验证是否有错
			        return "petForm";
			    }
			    // todo...
			}
			拿到BindingResult参数后，可以检查是否有错误，可以通过Spring的<errors>表单标签来在同一个表单上显示错误信息。
			BindingResult被用于记录数据绑定过程的错误，因此除了数据绑定外，还可以把该对象传给自己定制的验证器来调用验证。
			这使得数据绑定过程和验证过程出现的错误可以被搜集到一起，然后一并返回给用户：

	3. @ModelAttribute和@RequestMapping同时注释一个方法
		@RequestMapping(value = "/helloWorld.do")  
        @ModelAttribute("attributeName")
        public String helloWorld() {  
           return "hi";  
        }  
        这时这个方法的返回值并不是表示一个视图名称，而是model属性的值，视图名称由RequestToViewNameTranslator根据请求"/helloWorld.do"转换为逻辑视图helloWorld。
    	Model属性名称有@ModelAttribute(value="")指定，相当于在request中封装了key="attributeName"，value="hi"。
```


### FileUpload--单文件上传

### JSON
```
	使用@ResponseBody注解处理返回结果，转化成JSON格式
	@RequestMapping(value="/{courseId}",method=RequestMethod.GET)
	public @ResponseBody Course getCourseInJson(@PathVariable Integer courseId){
		return  courseService.getCoursebyId(courseId);
	}

	使用ResponseEntity类的对象处理返回结果，转化成JSON格式
	@RequestMapping(value="/jsontype/{courseId}",method=RequestMethod.GET)
	public  ResponseEntity<Course> getCourseInJson2(@PathVariable Integer courseId){
		Course course = courseService.getCoursebyId(courseId);		
		return new ResponseEntity<Course>(course, HttpStatus.OK);
	}

	@RequestBody注解 	// 获取前端提交的Json格式数据
	@ResponseBody注解 	// 将数据结果处理成JSON格式返回给前端
```