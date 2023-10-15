# Bitgrow frontend

1. 修改 env 文件

```bash
cp .env.example .env
```

填写 wallet_connect 注册的 PROJECT_ID

2. 运行项目

```bash
pnpm install
pnpm dev
```

3. 编译到服务器

```bash
pnpm build
python3 -m http.server --directory dist # 用python当服务器
```

