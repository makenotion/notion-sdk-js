VERSION --raw-output 0.8
PROJECT jahands/docker

prepare-workspace:
	FROM --platform=linux/amd64 debian:12-slim
	WORKDIR /work
	RUN apt-get update \
		&& apt-get install -y curl jq git unzip \
		&& rm -rf /var/lib/apt/lists/*
	RUN curl -fsSL https://sh.uuid.rocks/install/mise | bash
	ENV PATH="$HOME/.local/share/mise/shims:$HOME/.local/bin:$PATH"
	COPY .mise.toml .
	RUN mise trust --yes
	RUN mise install --yes && mise reshim

setup-project:
	FROM +prepare-workspace
	COPY --dir \
		examples \
		packages \
		.

	COPY \
		.earthlyignore \
		.eslintrc.cjs \
		.gitignore \
		.npmrc \
		.prettierignore \
		.prettierrc.cjs \
		.syncpackrc.cjs \
		.cspell.json \
		Justfile \
		package.json \
		pnpm-lock.yaml \
		pnpm-workspace.yaml \
		vitest.workspace.ts \
		tsconfig.json \
		turbo.json \
		.

install-deps:
	FROM +setup-project
	CACHE /pnpm-store
	RUN pnpm config set store-dir /pnpm-store
	RUN pnpm install --frozen-lockfile --child-concurrency=10

test:
	FROM +install-deps
	LET TURBO_TEAM=team_notion_sdk_js
	LET FORCE_COLOR=1
	LET DO_NOT_TRACK=1
	ARG GITHUB_ACTIONS
	RUN --raw-output \
		--secret TURBO_TOKEN \
		--secret TURBO_API \
		--secret TURBO_REMOTE_CACHE_SIGNATURE_KEY \
		pnpm turbo check:ci --log-order=grouped
