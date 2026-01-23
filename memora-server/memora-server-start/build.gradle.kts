dependencies {
    // 依赖公共模块
    implementation(project(":memora-server-common"))
    
    // 依赖管理模块
    implementation(project(":memora-server-manager"))
    
    // Spring WebFlux (替换 Spring MVC)
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    
    // Reactor Core (响应式编程核心)
    implementation("io.projectreactor:reactor-core")
    // Reactor Test (用于测试)
    testImplementation("io.projectreactor:reactor-test")
    
    // R2DBC (响应式数据库访问)
    implementation("org.springframework.boot:spring-boot-starter-data-r2dbc")
    // H2 R2DBC 驱动
    runtimeOnly("io.r2dbc:r2dbc-h2")
    // H2 Database (内置数据库，用于快速开发)
    runtimeOnly("com.h2database:h2")
    
    // MyBatis Plus (兼容 Spring Boot 3.x) - 暂时保留，后续考虑替换为响应式方案
    implementation("com.baomidou:mybatis-plus-spring-boot3-starter:3.5.9")
    // MyBatis Plus 分页插件依赖（3.5.9+ 版本需要单独引入）
    implementation("com.baomidou:mybatis-plus-jsqlparser:3.5.9")
    
    // Lombok
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
}

