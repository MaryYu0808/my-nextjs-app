import type { Category, UseCase } from '../types'

/**
 * Convert a workflow-category slug (or name) to its display name.
 * Tries slug match first, then name match, falls back to the raw value.
 */
export function workflowCategoryLabel(value: string, categories: Category[]): string {
  return categories.find((c) => c.slug === value || c.name === value)?.name ?? value
}

/**
 * Return the display label for an automation maturity level.
 * The value is already human-readable after normalization, but this
 * function provides a single consistent call-site across the codebase.
 */
export function automationLabel(level: string): string {
  return level
}

/**
 * Convert a use-case slug (or name) to its display name.
 * Tries slug match first, then name match, falls back to the raw value.
 */
export function useCaseLabel(value: string, useCases: UseCase[]): string {
  return useCases.find((uc) => uc.slug === value || uc.name === value)?.name ?? value
}
