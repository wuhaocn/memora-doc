dependencies {
    // 依赖公共模块
    implementation(project(":memora-server-common"))
    
    // 依赖管理模块
    implementation(project(":memora-server-manager"))
    
    // Spring MVC
    implementation("org.springframework.boot:spring-boot-starter-web:3.3.5")
    
    // Spring Data JDBC (替代 R2DBC)
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc:3.3.5")
    // H2 Database (内置数据库，用于快速开发)
    runtimeOnly("com.h2database:h2:2.3.232")
    
    // MyBatis Plus (兼容 Spring Boot 3.x)
    implementation("com.baomidou:mybatis-plus-spring-boot3-starter:3.5.9")
    // MyBatis Plus 分页插件依赖（3.5.9+ 版本需要单独引入）
    implementation("com.baomidou:mybatis-plus-jsqlparser:3.5.9")
    
    // Lombok
    compileOnly("org.projectlombok:lombok:1.18.34")
    annotationProcessor("org.projectlombok:lombok:1.18.34")
}

