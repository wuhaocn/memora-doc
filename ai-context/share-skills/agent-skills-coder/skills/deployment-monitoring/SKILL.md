---
name: deployment-monitoring
description: 根据项目的部署和监控规范生成部署配置和监控相关文档，确保系统的可靠部署和有效监控
---

# deployment-monitoring

## 描述
根据项目的部署和监控规范生成部署配置和监控相关文档，包括部署指南、监控配置、告警规则等。该技能将帮助开发者确保系统的可靠部署和有效监控，提高系统的可用性和可维护性。



#

#

#

#

#

#

#

### 最新部署变化
- settings.gradle

更新时间: 2026-01-23T09:46:06.895Z

## 最新部署变化
- settings.gradle

更新时间: 2026-01-23T09:30:24.613Z

## 最新部署变化
- settings.gradle

更新时间: 2026-01-23T09:26:39.621Z

## 最新部署变化
- settings.gradle

更新时间: 2026-01-23T09:22:53.035Z

## 最新部署变化
- settings.gradle

更新时间: 2026-01-23T09:16:17.676Z

## 最新部署变化
- settings.gradle

更新时间: 2026-01-23T09:13:09.169Z

## 最新部署变化
- settings.gradle

更新时间: 2026-01-23T09:05:07.670Z

## 最新部署变化
- build.gradle
- com-rcloud-quickmodel/com-rcloud-aidata-model/com.rcloud.agentdata.msgtask/build.gradle
- com-rcloud-quickmodel/com-rcloud-aidata-model/com.rcloud.log.data/build.gradle
- com-rcloud-quickmodel/com-rcloud-aidata-model/com.rcloud.log.http/build.gradle
- com-rcloud-quickmodel/com-rcloud-llm-model/com.rcloud.llm.http/build.gradle
- com.rcloud.ai.internal.api/build.gradle
- com.rcloud.ai.internal.api/src/main/resources/application.yml
- com.rcloud.aiagent/build.gradle
- com.rcloud.aiagent/src/main/resources/application.yml
- com.rcloud.aisdoc/build.gradle
- com.rcloud.aislog/build.gradle
- com.rcloud.app.messages/build.gradle
- com.rcloud.mcp.server/build.gradle
- com.rcloud.mcp.server/src/main/resources/application.properties
- com.rcloud.mcp.server/src/test/resources/application.properties
- com.rcloud.messageflow.api.server/build.gradle
- com.rcloud.messageflow.api.user/build.gradle
- com.rcloud.messageflow.chatbot/build.gradle
- com.rcloud.messageflow.router/build.gradle
- com.rcloud.mixai/build.gradle
- com.rcloud.mixai/src/main/resources/application.yml
- serverpkg.gradle
- settings.gradle

更新时间: 2026-01-23T08:55:50.375Z

## 使用场景
当需要生成部署配置、监控配置、告警规则等部署和监控相关内容时，使用此技能可以确保生成的内容符合项目的部署和监控规范。

## 指令
1. **识别内容类型**：确定需要生成的内容类型
   - 部署配置（Deployment Configuration）
   - 监控配置（Monitoring Configuration）
   - 告警规则（Alerting Rules）
   - 部署文档（Deployment Guide）
   - 监控文档（Monitoring Guide）
   - 维护指南（Maintenance Guide）

2. **生成配置结构**：
   - 根据内容类型生成相应的配置结构
   - 包含必要的配置项和参数
   - 遵循项目的配置规范

3. **部署配置生成**：
   - 生成Dockerfile和Docker Compose配置
   - 生成Kubernetes部署配置
   - 生成环境变量配置
   - 生成构建和部署脚本

4. **监控配置生成**：
   - 生成Prometheus监控配置
   - 生成Grafana仪表盘配置
   - 生成日志收集配置
   - 生成指标暴露配置

5. **告警规则生成**：
   - 生成基于Prometheus的告警规则
   - 定义告警阈值和触发条件
   - 配置告警通知渠道
   - 生成告警处理流程

6. **部署和监控文档生成**：
   - 生成部署指南
   - 生成监控指南
   - 生成维护指南
   - 包含最佳实践和故障排除

## 参数
- `content_type`: 内容类型，可选值为 `deployment_config`、`monitoring_config`、`alerting_rules`、`deployment_guide`、`monitoring_guide`、`maintenance_guide`，必填
- `module_name`: 模块名称，如 `template`、`proxychat`，必填
- `environment`: 部署环境，可选值为 `dev`（开发环境）、`test`（测试环境）、`pre`（预发布环境）、`prod`（生产环境），可选，默认值为 `dev`
- `deployment_type`: 部署类型，可选值为 `docker`（Docker部署）、`kubernetes`（Kubernetes部署）、`bare_metal`（裸机部署），可选，默认值为 `docker`
- `monitoring_stack`: 监控栈，可选值为 `prometheus_grafana`（Prometheus + Grafana）、`elk`（ELK Stack）、`datadog`（Datadog），可选，默认值为 `prometheus_grafana`
- `include_logging`: 是否包含日志收集，布尔值，可选，默认值为 `true`
- `include_metrics`: 是否包含指标监控，布尔值，可选，默认值为 `true`
- `include_alerting`: 是否包含告警规则，布尔值，可选，默认值为 `true`

## 示例

### 输入示例
```
调用 deployment-monitoring skills，生成一个模板模块的Kubernetes部署配置，环境为生产环境，监控栈为Prometheus + Grafana，包含日志收集、指标监控和告警规则
```

### 输出示例
```yaml
# Kubernetes Deployment Configuration for Template Module
apiVersion: apps/v1
kind: Deployment
metadata:
  name: template-service
  namespace: ims-ais
  labels:
    app: template-service
    environment: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: template-service
  template:
    metadata:
      labels:
        app: template-service
        environment: production
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/actuator/prometheus"
    spec:
      containers:
      - name: template-service
        image: rongcloud/ims-ais-template-service:1.0.0
        ports:
        - containerPort: 8080
          name: http
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: SPRING_DATASOURCE_URL
          value: "jdbc:mysql://mysql:3306/ims_ais?useUnicode=true&characterEncoding=utf-8&useSSL=false"
        - name: SPRING_DATASOURCE_USERNAME
          valueFrom:
            secretKeyRef:
              name: mysql-secrets
              key: username
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secrets
              key: password
        - name: SPRING_REDIS_HOST
          value: "redis"
        - name: SPRING_REDIS_PORT
          value: "6379"
        - name: SPRING_REDIS_PASSWORD
          valueFrom:
            secretKeyRef:
              name: redis-secrets
              key: password
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 5
---
# Kubernetes Service Configuration for Template Module
apiVersion: v1
kind: Service
metadata:
  name: template-service
  namespace: ims-ais
spec:
  selector:
    app: template-service
  ports:
  - name: http
    port: 80
    targetPort: 8080
  type: ClusterIP
---
# Kubernetes Ingress Configuration for Template Module
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: template-service
  namespace: ims-ais
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
spec:
  ingressClassName: nginx
  rules:
  - host: template-service.ims-ais.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: template-service
            port:
              name: http
  tls:
  - hosts:
    - template-service.ims-ais.example.com
    secretName: ims-ais-tls
```

## 内容类型示例

### 1. Prometheus监控配置

```yaml
# Prometheus Configuration for Template Module
scrape_configs:
  - job_name: 'template-service'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 15s
    static_configs:
      - targets: ['template-service:8080']
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
        replacement: 'template-service'

# Prometheus Alerting Rules for Template Module
groups:
  - name: template-service-alerts
    rules:
      - alert: TemplateServiceDown
        expr: up{job="template-service"} == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Template Service is down"
          description: "The Template Service has been down for more than 5 minutes."

      - alert: TemplateServiceHighErrorRate
        expr: http_server_requests_seconds_count{job="template-service", status=~"5.."} / http_server_requests_seconds_count{job="template-service"} > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate for Template Service"
          description: "The error rate for Template Service is above 5% for more than 5 minutes."

      - alert: TemplateServiceHighLatency
        expr: histogram_quantile(0.95, sum(rate(http_server_requests_seconds_bucket{job="template-service"}[5m])) by (le, instance)) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency for Template Service"
          description: "The 95th percentile latency for Template Service is above 2 seconds for more than 5 minutes."
```

### 2. 部署文档

```markdown
# Template模块部署指南

## 1. 部署准备

### 1.1 环境要求

- Java 17+
- MySQL 8.0+
- Redis 7.0+
- Docker 20.10+
- Kubernetes 1.24+ (optional)

### 1.2 依赖服务

- MySQL数据库服务
- Redis缓存服务
- Prometheus监控服务（可选）
- Grafana可视化服务（可选）

## 2. 部署方式

### 2.1 Docker部署

#### 2.1.1 构建Docker镜像

```bash
# 进入模块目录
cd com-rcloud-model/com-rcloud-template-model

# 构建Docker镜像
docker build -t rongcloud/ims-ais-template-service:1.0.0 .
```

#### 2.1.2 使用Docker Compose部署

```yaml
# docker-compose.yml
version: '3.8'
services:
  template-service:
    image: rongcloud/ims-ais-template-service:1.0.0
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=production
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/ims_ais?useUnicode=true&characterEncoding=utf-8&useSSL=false
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=password
      - SPRING_REDIS_HOST=redis
      - SPRING_REDIS_PORT=6379
      - SPRING_REDIS_PASSWORD=password
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=ims_ais
    volumes:
      - mysql-data:${MYSQL_DATA_DIR}

  redis:
    image: redis:7.0
    command: redis-server --requirepass password
    volumes:
      - redis-data:${REDIS_DATA_DIR}

volumes:
  mysql-data:
  redis-data:
```

```bash
# 先显式设置容器内挂载目标，避免在共享技能中硬编码绝对路径
export MYSQL_DATA_DIR="${MYSQL_DATA_DIR:?set container mysql target path}"
export REDIS_DATA_DIR="${REDIS_DATA_DIR:?set container redis target path}"

# 启动服务
docker-compose up -d
```

### 2.2 Kubernetes部署

#### 2.2.1 应用Kubernetes配置

```bash
# 应用部署配置
kubectl apply -f kubernetes/deployment.yaml

# 应用服务配置
kubectl apply -f kubernetes/service.yaml

# 应用Ingress配置
kubectl apply -f kubernetes/ingress.yaml
```

## 3. 监控与告警

### 3.1 Prometheus监控

- 确保Prometheus已部署
- 应用Prometheus配置

```bash
kubectl apply -f monitoring/prometheus-config.yaml
```

### 3.2 Grafana仪表盘

- 确保Grafana已部署
- 导入Grafana仪表盘

```bash
# 导入仪表盘
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <grafana-token>" \
  -d @monitoring/grafana-dashboard.json \
  http://grafana:3000/api/dashboards/db
```

## 4. 维护与故障排除

### 4.1 日志查看

```bash
# Docker日志查看
docker logs -f template-service

# Kubernetes日志查看
kubectl logs -f deployment/template-service -n ims-ais
```

### 4.2 常见问题

| 问题 | 解决方案 |
| :--- | :--- |
| 服务无法启动 | 检查环境变量配置，特别是数据库和Redis连接信息 |
| 数据库连接失败 | 检查数据库服务是否正常运行，检查连接参数 |
| Redis连接失败 | 检查Redis服务是否正常运行，检查连接参数 |
| 监控指标不显示 | 检查Prometheus配置，确保服务已暴露指标端点 |

## 5. 升级与回滚

### 5.1 服务升级

```bash
# Docker升级
docker-compose pull template-service
docker-compose up -d

# Kubernetes升级
kubectl set image deployment/template-service template-service=rongcloud/ims-ais-template-service:1.1.0 -n ims-ais
```

### 5.2 服务回滚

```bash
# Kubernetes回滚
kubectl rollout undo deployment/template-service -n ims-ais
```
```

## 最佳实践

1. **环境隔离**：确保开发、测试、预发布和生产环境隔离
2. **自动化部署**：使用CI/CD流水线实现自动化部署
3. **监控全覆盖**：监控所有关键指标，包括服务健康、请求量、响应时间、错误率等
4. **告警设置合理**：设置适当的告警阈值，避免告警风暴
5. **日志集中管理**：使用ELK或其他日志收集系统集中管理日志
6. **定期备份**：定期备份数据库和关键配置
7. **容量规划**：根据业务需求进行合理的容量规划
8. **安全加固**：确保服务的安全性，包括网络安全、认证授权、数据加密等

## 后续步骤

1. 部署服务并验证服务是否正常运行
2. 配置监控和告警
3. 进行性能测试和负载测试
4. 制定维护计划和故障处理流程
5. 定期检查服务的运行状态和性能指标

## 参考资料

- [Docker官方文档](https://docs.docker.com/)
- [Kubernetes官方文档](https://kubernetes.io/docs/home/)
- [Prometheus官方文档](https://prometheus.io/docs/introduction/overview/)
- [Grafana官方文档](https://grafana.com/docs/grafana/latest/)
- [Spring Boot Actuator文档](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)
