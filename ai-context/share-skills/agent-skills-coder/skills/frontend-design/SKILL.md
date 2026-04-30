---
name: frontend-design
description: 设计和开发高质量的前端界面，基于 React 18 + Vite + TypeScript + Tailwind CSS 技术栈，遵循业界最佳实践
---

# frontend-design

## 描述
设计和开发高质量的前端界面，包括响应式设计、UI组件设计、交互设计等，遵循项目技术栈和业界最佳实践。

## 使用场景
当需要设计和开发前端界面时，使用此技能可以确保前端设计符合项目规范和业界最佳实践。

## 技术栈

本项目使用以下技术栈：
- **框架**: React 18.2+
- **构建工具**: Vite 4.5+
- **语言**: TypeScript 5.3+
- **样式**: Tailwind CSS 3.4+
- **图标**: lucide-react
- **通知**: react-hot-toast
- **路由**: react-router-dom 6.22+
- **图表**: reactflow 11.11+
- **工具库**: lodash-es, tailwind-merge

## 核心设计原则

### 1. 单一职责原则
每个组件应该只负责一个功能或展示一个逻辑单元。如果一个组件变得复杂，应该拆分为更小的子组件。

### 2. 组件可复用性
- 优先使用项目已有的 UI 组件库（@/components/ui）
- 将可复用的业务逻辑抽取为自定义 Hooks
- 通过 Props 配置组件行为，而非硬编码

### 3. 组合优于继承
使用组件组合而非继承来构建复杂 UI。通过 children、render props 或 HOC 实现灵活性。

### 4. 关注点分离
- UI 组件：只负责展示和用户交互
- 业务逻辑：抽取到自定义 Hooks 或工具函数
- 数据获取：封装在 `lib/api` 目录下

## 指令

1. **确定设计需求**：明确界面的功能需求和设计目标
2. **设计组件结构**：遵循单一职责原则，设计清晰的组件层次结构
3. **使用项目技术栈**：严格使用 React 18 + Vite + TypeScript + Tailwind CSS
4. **复用 UI 组件**：优先使用项目已有的 UI 组件库（@/components/ui）
5. **抽取自定义 Hooks**：将可复用的状态逻辑抽取为自定义 Hooks
6. **实现响应式设计**：使用 Tailwind 响应式断点，移动优先
7. **实现交互功能**：使用 react-hot-toast 进行通知提示，lucide-react 提供图标
8. **优化性能**：使用 React.lazy、React.memo、useMemo、useCallback 优化性能
9. **错误处理**：使用 ErrorBoundary 捕获错误，使用 toast 显示用户友好的错误信息
10. **遵循 TypeScript 规范**：定义明确的类型，避免使用 any

## UI 组件库

项目已提供的 UI 组件（位于 `@/components/ui`）：

- `Button` - 按钮组件（支持 variant、size、loading、icon）
- `Card`, `CardHeader` - 卡片组件
- `Dialog` - 对话框组件（支持 overlay、动画、自定义尺寸）
- `Drawer` - 抽屉组件
- `Input` - 文本输入框
- `Textarea` - 多行文本输入框
- `NumberInput` - 数字输入框（支持范围、默认值、onBlur 归一）
- `LoadingSpinner` - 加载动画
- `Pagination` - 分页组件
- `ErrorBoundary` - 错误边界组件

**使用方式**：
```typescript
import { Button, Dialog, NumberInput } from '@/components/ui';
```

## TypeScript 最佳实践

### 1. 接口定义
- **优先使用 interface**：用于对象类型定义
- **使用 type**：用于联合类型、工具类型、函数类型
- **明确的 Props 类型**：每个组件必须定义 `ComponentNameProps` 接口

```typescript
// ✅ 正确：使用 interface 定义 Props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

// ❌ 错误：使用 any
const handleClick = (data: any) => { ... }

// ✅ 正确：使用具体类型
const handleClick = (data: UserData) => { ... }
```

### 2. 类型安全
- 禁止使用 `any`，使用 `unknown` 或具体类型
- 使用类型断言时，优先使用 `as` 而非 `<>` 语法（避免与 JSX 冲突）
- 使用可选链 `?.` 和空值合并 `??` 处理可能为空的值

### 3. 泛型使用
合理使用泛型提高组件和函数的复用性：

```typescript
// 自定义 Hook 使用泛型
export function useAsyncOperation<T = any>(defaultOptions: AsyncOperationOptions = {}) {
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  // ...
}
```

## 自定义 Hooks 规范

### 1. Hook 命名
- 以 `use` 开头
- 使用 camelCase
- 文件名：`useHookName.ts`

### 2. 项目已有 Hooks
- `useFormValidation` - 表单验证 Hook（位于 `lib/hooks/useFormValidation.ts`）
- `useAsyncOperation` - 异步操作 Hook（位于 `lib/hooks/useAsyncOperation.ts`）

### 3. Hook 设计原则
- **单一职责**：每个 Hook 只处理一个关注点
- **返回对象**：返回对象而非数组，提高可读性
- **依赖数组完整**：useEffect、useMemo、useCallback 必须完整填写依赖数组

```typescript
// ✅ 正确：返回对象，命名清晰
export function useFormValidation() {
  return {
    errors: {},
    isValid: true,
    setFieldError,
    getFieldError,
    hasFieldError,
  };
}

// ✅ 正确：完整依赖数组
useEffect(() => {
  fetchData(userId);
}, [userId]); // 包含所有依赖
```

## Tailwind CSS 最佳实践

### 1. 避免 className 爆炸
避免在 JSX 中写超长的 className 字符串。提取为组件或使用工具函数：

```typescript
// ❌ 错误：className 过长
<div className="flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">

// ✅ 正确：提取为组件或使用变量
const cardClasses = "flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow";
<div className={cardClasses}>
```

### 2. 响应式设计（移动优先）
默认样式为移动端，使用断点向上适配：

```typescript
<div className="
  grid grid-cols-1        // 移动端：单列
  md:grid-cols-2         // 平板：两列
  lg:grid-cols-3         // 桌面：三列
">
  内容
</div>
```

常用断点：
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### 3. 色彩系统
项目使用 `primary` 色阶（50-900），遵循 Tailwind 默认色彩命名：

```typescript
<div className="bg-primary-50 text-primary-900 border-primary-200">
  内容
</div>
```

### 4. 工具函数（推荐）
虽然项目未使用 `cn()` 函数，但建议创建 `lib/utils.ts` 中的工具函数合并类名：

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 表单处理模式

### 1. 使用 useFormValidation Hook
项目提供了 `useFormValidation` Hook 处理表单验证：

```typescript
import { useFormValidation } from '@/lib/hooks/useFormValidation';

function MyForm() {
  const { errors, isValid, setFieldTouched, setFieldError, getFieldError } = useFormValidation();
  
  const handleBlur = (field: string) => {
    setFieldTouched(field, true);
    // 验证逻辑
    if (!value) {
      setFieldError(field, '此字段为必填项');
    }
  };
  
  return (
    <div>
      <Input
        onBlur={() => handleBlur('username')}
        error={getFieldError('username')}
      />
    </div>
  );
}
```

### 2. 表单验证原则
- **实时验证**：在 `onBlur` 时验证，而非 `onChange`（避免输入时频繁验证）
- **错误提示**：仅在字段被触摸（touched）后显示错误
- **禁用提交**：表单无效时禁用提交按钮

## 异步操作模式

### 1. 使用 useAsyncOperation Hook
项目提供了 `useAsyncOperation` Hook 处理异步操作：

```typescript
import { useAsyncOperation } from '@/lib/hooks/useAsyncOperation';
import { toast } from 'react-hot-toast';

function MyComponent() {
  const { data, loading, error, execute } = useAsyncOperation({
    showErrorToast: true,
    showSuccessToast: true,
    successMessage: '操作成功',
  });
  
  const handleSubmit = async () => {
    await execute(async () => {
      return await apiClient.createUser(userData);
    });
  };
  
  return (
    <Button onClick={handleSubmit} loading={loading}>
      提交
    </Button>
  );
}
```

### 2. 错误处理
- **API 错误**：在 `lib/api` 层统一处理，抛出 Error
- **组件错误**：使用 ErrorBoundary 捕获渲染错误
- **用户提示**：使用 toast 显示友好的错误信息

```typescript
// ErrorBoundary 使用
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <MyComponent />
  </Suspense>
</ErrorBoundary>
```

## 状态管理规范

### 1. 状态选择原则
- **URL State**：筛选条件、分页、排序等应存储在 URL 查询参数中，支持分享和刷新
- **Local State**：表单输入、UI 状态（如对话框开关）使用 `useState`
- **Lift State Up**：共享状态提升到最近的公共父组件
- **避免全局状态**：除非确实需要跨页面共享，否则不使用全局状态管理

### 2. URL State 示例
```typescript
import { useSearchParams } from 'react-router-dom';

function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const keyword = searchParams.get('keyword') || '';
  
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage), keyword });
  };
}
```

## 性能优化

### 1. 代码分割
使用 React.lazy 和 Suspense 实现路由级别的代码分割：

```typescript
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui';

const UserListPage = lazy(() => import('@/pages/users/UserListPage'));

<Suspense fallback={<LoadingSpinner />}>
  <UserListPage />
</Suspense>
```

### 2. 组件优化
- **React.memo**：避免不必要的重渲染（用于纯展示组件）
- **useMemo**：缓存计算结果（用于复杂计算）
- **useCallback**：缓存函数引用（用于传递给子组件的回调）

```typescript
// ✅ 正确：使用 React.memo 优化纯展示组件
const UserCard = React.memo(({ user }: { user: User }) => {
  return <div>{user.name}</div>;
});

// ✅ 正确：使用 useMemo 缓存计算结果
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ 正确：使用 useCallback 缓存函数
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 3. 列表渲染优化
- 长列表使用虚拟滚动（如 react-window）
- 使用 key 属性优化列表渲染（key 应该是稳定、唯一的）

## 可访问性（a11y）规范

### 1. 语义化 HTML
- 使用语义化标签（`<button>` 而非 `<div onClick>`）
- 使用正确的 heading 层级（h1 → h2 → h3）
- 为表单元素添加 `<label>`

### 2. ARIA 属性
- 为交互元素添加 `aria-label` 或 `aria-labelledby`
- 使用 `aria-hidden` 隐藏装饰性图标
- 使用 `role` 属性明确元素角色

```typescript
// ✅ 正确：语义化按钮
<button onClick={handleClick} aria-label="删除用户">
  <Trash2 aria-hidden="true" />
  删除
</button>

// ✅ 正确：表单标签关联
<label htmlFor="username">用户名</label>
<Input id="username" />
```

### 3. 键盘导航
- 所有交互元素应该可以通过键盘访问
- 使用 `tabIndex` 控制焦点顺序
- 实现键盘快捷键（如 Enter 提交表单）

## 页面开发模板

### 列表页标准结构

```typescript
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Pagination, Input } from '@/components/ui';
import { useAsyncOperation } from '@/lib/hooks/useAsyncOperation';
import { apiClient } from '@/lib/api';

export default function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const keyword = searchParams.get('keyword') || '';
  
  const { data, loading, execute } = useAsyncOperation();
  
  const loadData = async () => {
    await execute(async () => {
      return await apiClient.getUsers({ page, keyword });
    });
  };
  
  useEffect(() => {
    loadData();
  }, [page, keyword]);
  
  return (
    <div className="p-6">
      {/* 页面标题和操作 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">用户列表</h1>
        <Button>新增用户</Button>
      </div>
      
      {/* 筛选条件 */}
      <div className="mb-4 flex gap-4">
        <Input
          className="w-48"
          placeholder="搜索用户名..."
          value={keyword}
          onChange={(e) => setSearchParams({ keyword: e.target.value, page: '1' })}
        />
      </div>
      
      {/* 数据列表 */}
      <div className="mb-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-2">
            {/* 列表项 */}
          </div>
        )}
      </div>
      
      {/* 分页 */}
      <Pagination
        current={page}
        total={data?.total || 0}
        onChange={(newPage) => setSearchParams({ page: String(newPage), keyword })}
      />
    </div>
  );
}
```

### 详情页标准结构

```typescript
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from '@/components/ui';
import { useAsyncOperation } from '@/lib/hooks/useAsyncOperation';
import { useFormValidation } from '@/lib/hooks/useFormValidation';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { errors, setFieldError, getFieldError } = useFormValidation();
  const { loading, execute } = useAsyncOperation({
    showSuccessToast: true,
    successMessage: '保存成功',
  });
  
  const handleSubmit = async () => {
    await execute(async () => {
      return await apiClient.updateUser(id!, formData);
    });
  };
  
  return (
    <div className="p-6">
      {/* 返回和标题 */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>返回</Button>
        <h1 className="text-2xl font-bold">用户详情</h1>
      </div>
      
      {/* 详情内容 */}
      <Card className="p-6">
        {/* 表单内容 */}
      </Card>
      
      {/* 操作按钮 */}
      <div className="mt-6 flex gap-4">
        <Button onClick={handleSubmit} loading={loading}>保存</Button>
        <Button variant="ghost" onClick={() => navigate(-1)}>取消</Button>
      </div>
    </div>
  );
}
```

## 工作流 / Agent 节点配置面板 UI

适用于画布侧边栏中的节点配置（如 GraphAgent 的 LLM 节点、工作流节点）：

- **分区与层级**：用圆角卡片分区（系统提示词、模型参数、输出格式、JSON Schema 等），每区有明确标题和可选副标题（如字段名），避免单一大表单
- **配色区分**：系统提示词等「输入/指令」类区域采用柔和蓝系（如 `border-sky-200`、`bg-sky-50/40`、`text-sky-800`）；结构化输出/JSON Schema 等「输出/结构」类区域采用柔和绿系（如 `border-emerald-200`、`bg-emerald-50/30`、`text-emerald-800`），便于一眼区分输入与输出
- **JSON 展示与编辑**：大块 JSON（如 responseSchema）在加载时即用安全格式化函数（如 tryFormatJson）展示为缩进良好的字符串；失焦时再次格式化并写回，提示文案说明「加载与失焦时自动格式化」
- **交互克制**：节点配置保存后不弹出「已保存」类 toast，避免打断用户连续操作；仅在有错误或明确需要反馈时提示
- **可访问与可读**：大文本框使用 `font-mono`、合适行高与最小高度，占位符说明变量引用方式（如 `{{variable}}`）

## 文件组织规范

### 1. 目录结构
```
src/
├── pages/          # 页面组件（路由级别）
├── components/     # 可复用组件
│   ├── ui/         # UI 基础组件（@/components/ui）
│   └── ...         # 业务组件
├── lib/            # 工具函数和配置
│   ├── api/        # API 接口封装
│   ├── hooks/      # 自定义 Hooks
│   └── utils.ts    # 通用工具函数
├── interface/      # TypeScript 类型定义
└── styles/         # 全局样式
```

### 2. 文件命名
- 组件文件：PascalCase（如 `UserProfile.tsx`）
- Hook 文件：camelCase，以 `use` 开头（如 `useFormValidation.ts`）
- 工具文件：camelCase（如 `formatDate.ts`）
- 类型文件：camelCase（如 `userTypes.ts`）或与组件同名（如 `UserProfile.types.ts`）

## 测试策略（参考）

虽然项目当前可能没有完整的测试覆盖，但建议遵循以下测试策略：

### 1. 单元测试
- 测试工具函数和自定义 Hooks
- 测试组件的渲染和基本交互
- 使用 React Testing Library

### 2. 集成测试
- 测试组件间的交互
- 测试页面流程（如表单提交）

### 3. E2E 测试
- 测试关键用户流程
- 使用 Playwright 或 Cypress

## 参数

- `page_type`: 页面类型，如 `list`, `detail`, `form`
- `components`: 需要使用的组件列表
- `responsive`: 是否需要响应式设计，布尔值（默认 true）
- `has_filters`: 是否有筛选条件，布尔值
- `has_form`: 是否有表单，布尔值

## 示例

### 输入示例
```
调用 frontend-design 技能，设计一个用户列表页，包含筛选条件、分页和响应式设计
```

### 输出示例
生成符合项目规范的列表页代码，使用 @/components/ui 组件，遵循 TypeScript 类型定义，使用 Tailwind CSS 样式，包含错误处理和加载状态
