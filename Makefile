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

