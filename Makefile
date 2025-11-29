.PHONY: help setup install install-browsers dev build test lint type-check clean

# Default target
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

## help: Show this help message
help:
	@echo "$(BLUE)Available commands:$(NC)"
	@echo ""
	@grep -E '^##' Makefile | sed 's/##//' | sed 's/^/  /'
	@echo ""

## setup: Complete project setup (install dependencies and Playwright browsers)
setup: install install-browsers
	@echo "$(GREEN)✅ Setup complete!$(NC)"
	@echo "$(YELLOW)Next steps:$(NC)"
	@echo "  - Run 'make dev' to start development servers"
	@echo "  - Run 'make test' to run tests"
	@echo "  - Check README.md for more information"

## install: Install all dependencies
install:
	@echo "$(BLUE)📦 Installing dependencies...$(NC)"
	@pnpm install
	@echo "$(GREEN)✅ Dependencies installed$(NC)"

## install-browsers: Install Playwright browsers (required for testing)
install-browsers:
	@echo "$(BLUE)🌐 Installing Playwright browsers...$(NC)"
	@pnpm exec playwright install
	@echo "$(GREEN)✅ Playwright browsers installed$(NC)"

## dev: Start all apps in development mode
dev:
	@echo "$(BLUE)🚀 Starting development servers...$(NC)"
	@pnpm dev

## build: Build all apps for production
build:
	@echo "$(BLUE)🔨 Building applications...$(NC)"
	@pnpm build

## test: Run all unit tests
test:
	@echo "$(BLUE)🧪 Running tests...$(NC)"
	@pnpm test

## test-e2e: Run E2E tests
test-e2e:
	@echo "$(BLUE)🧪 Running E2E tests...$(NC)"
	@pnpm test:e2e

## test-e2e-ui: Run E2E tests in UI mode (interactive - see browser running!)
test-e2e-ui:
	@echo "$(BLUE)🧪 Opening Playwright UI (interactive mode)...$(NC)"
	@echo "$(YELLOW)💡 Tip: You'll see the browser running and can watch tests in real-time!$(NC)"
	@echo "$(YELLOW)💡 The UI will open in your browser automatically.$(NC)"
	@echo "$(YELLOW)Select which app to test:$(NC)"
	@echo "  1) Web app (port 3000)"
	@echo "  2) Admin app (port 3001)"
	@read -p "Enter choice (1 or 2): " choice; \
	if [ "$$choice" = "1" ]; then \
		cd apps/web && pnpm exec playwright test --ui; \
	elif [ "$$choice" = "2" ]; then \
		cd apps/admin && pnpm exec playwright test --ui; \
	else \
		echo "$(YELLOW)Running web app by default...$(NC)"; \
		cd apps/web && pnpm exec playwright test --ui; \
	fi

## test-e2e-web: Run E2E tests for web app in UI mode
test-e2e-ui-web:
	@echo "$(BLUE)🧪 Opening Playwright UI for web app...$(NC)"
	@cd apps/web && pnpm exec playwright test --ui

## test-e2e-ui-admin: Run E2E tests for admin app in UI mode
test-e2e-ui-admin:
	@echo "$(BLUE)🧪 Opening Playwright UI for admin app...$(NC)"
	@cd apps/admin && pnpm exec playwright test --ui

## test-e2e-headed: Run E2E tests with visible browser (headed mode)
test-e2e-headed:
	@echo "$(BLUE)🧪 Running E2E tests with visible browser...$(NC)"
	@echo "$(YELLOW)Select which app to test:$(NC)"
	@echo "  1) Web app (port 3000)"
	@echo "  2) Admin app (port 3001)"
	@read -p "Enter choice (1 or 2): " choice; \
	if [ "$$choice" = "1" ]; then \
		cd apps/web && pnpm exec playwright test --headed; \
	elif [ "$$choice" = "2" ]; then \
		cd apps/admin && pnpm exec playwright test --headed; \
	else \
		echo "$(YELLOW)Running web app by default...$(NC)"; \
		cd apps/web && pnpm exec playwright test --headed; \
	fi

## test-e2e-headed-web: Run E2E tests for web app with visible browser
test-e2e-headed-web:
	@echo "$(BLUE)🧪 Running E2E tests for web app with visible browser...$(NC)"
	@cd apps/web && pnpm exec playwright test --headed

## test-e2e-headed-admin: Run E2E tests for admin app with visible browser
test-e2e-headed-admin:
	@echo "$(BLUE)🧪 Running E2E tests for admin app with visible browser...$(NC)"
	@cd apps/admin && pnpm exec playwright test --headed

## lint: Lint all packages
lint:
	@echo "$(BLUE)📏 Linting code...$(NC)"
	@pnpm lint

## lint-fix: Fix linting issues automatically
lint-fix:
	@echo "$(BLUE)🔧 Fixing linting issues...$(NC)"
	@pnpm lint:fix

## type-check: Type check all packages
type-check:
	@echo "$(BLUE)🔍 Type checking...$(NC)"
	@pnpm type-check

## check-deps: Check for unused dependencies
check-deps:
	@echo "$(BLUE)🔍 Checking for unused dependencies...$(NC)"
	@pnpm check:deps

## check-i18n: Validate i18n translations
check-i18n:
	@echo "$(BLUE)🌍 Validating i18n translations...$(NC)"
	@pnpm check:i18n

## storybook: Start Storybook
storybook:
	@echo "$(BLUE)📚 Starting Storybook...$(NC)"
	@pnpm storybook

## spotlight: Start Sentry Spotlight for local error monitoring
spotlight:
	@echo "$(BLUE)🔍 Starting Sentry Spotlight...$(NC)"
	@echo "$(YELLOW)💡 Spotlight allows you to see errors locally without sending to Sentry$(NC)"
	@echo "$(YELLOW)💡 Make sure your dev server is running in another terminal$(NC)"
	@cd apps/web && pnpm dev:spotlight

## spotlight-admin: Start Sentry Spotlight for admin app
spotlight-admin:
	@echo "$(BLUE)🔍 Starting Sentry Spotlight for admin app...$(NC)"
	@cd apps/admin && pnpm dev:spotlight

## clean: Clean all build artifacts, test results, and node_modules
clean:
	@echo "$(BLUE)🧹 Cleaning build artifacts...$(NC)"
	@pnpm clean
	@echo "$(BLUE)🧹 Cleaning test results...$(NC)"
	@rm -rf apps/*/test-results apps/*/playwright-report
	@rm -rf test-results playwright-report playwright
	@echo "$(BLUE)🧹 Cleaning temporary files...$(NC)"
	@rm -f cache turbo *@0.1.0 *-boilerplate@*
	@echo "$(GREEN)✅ Clean complete$(NC)"

## clean-all: Clean everything including node_modules (use with caution)
clean-all:
	@echo "$(YELLOW)⚠️  Cleaning everything including node_modules...$(NC)"
	@rm -rf node_modules apps/*/node_modules packages/*/node_modules
	@rm -rf apps/*/test-results apps/*/playwright-report
	@rm -rf test-results playwright-report playwright
	@rm -f cache turbo *@0.1.0 *-boilerplate@*
	@pnpm clean
	@echo "$(GREEN)✅ Deep clean complete$(NC)"

## format: Format code with Prettier
format:
	@echo "$(BLUE)💅 Formatting code...$(NC)"
	@pnpm format

## build-stats: Build with bundle analysis
build-stats:
	@echo "$(BLUE)📊 Building with bundle analysis...$(NC)"
	@pnpm build-stats

## clean-test: Clean only test results and artifacts
clean-test:
	@echo "$(BLUE)🧹 Cleaning test results...$(NC)"
	@rm -rf apps/*/test-results apps/*/playwright-report
	@rm -rf test-results playwright-report playwright
	@echo "$(GREEN)✅ Test artifacts cleaned$(NC)"

## clean-temp: Clean temporary files (cache, empty files, etc.)
clean-temp:
	@echo "$(BLUE)🧹 Cleaning temporary files...$(NC)"
	@rm -f cache turbo *@0.1.0 *-boilerplate@*
	@echo "$(GREEN)✅ Temporary files cleaned$(NC)"

## verify: Run all checks (lint, type-check, test)
verify: lint type-check test
	@echo "$(GREEN)✅ All checks passed!$(NC)"

## reset: Reset project to clean state (install + browsers)
reset: clean-all install install-browsers
	@echo "$(GREEN)✅ Project reset complete$(NC)"

