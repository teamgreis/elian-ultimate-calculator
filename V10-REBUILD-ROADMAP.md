# ELIAN Ultimate Calculator V10 — Complete Rebuild

**Status:** Planning baseline  
**Target:** V10.0.0  
**Approach:** Rebuild from zero. V9.x is a reference for behavior and mathematics, not a codebase to extend.

## Product direction

ELIAN V10 is a complete redesign of the calculator: a modern, iOS-inspired interface with a fast, precise and maintainable mathematical core. The experience should feel immediate on phone, tablet and desktop, with responsive layouts and polished interaction.

## Non-negotiable priority

**PERFORMANCE AND EFFICIENCY HAVE TOP PRIORITY!!!**

The application must be fast in startup, input response, calculation, rendering, navigation and memory use. Visual effects must never make calculation or interaction sluggish. Prefer simple, measurable, efficient implementations over unnecessary abstraction.

## V10 principles

1. **Clean start:** no blind carry-over of V9 implementation. Reuse only validated algorithms, requirements and test cases.
2. **Mathematical correctness:** exact arithmetic where appropriate, explicit numeric precision, predictable parsing and useful error messages.
3. **Responsive by design:** phone-first interaction, iOS-inspired visual language, adaptive tablet and desktop layouts.
4. **Offline-first:** core calculations work without network access. Network features are optional and transparent.
5. **Modular core:** UI, calculation engine, domain modules, persistence and platform integrations remain separate.
6. **Accessible and efficient:** keyboard, touch, reduced motion, readable contrast and scalable text.
7. **Testable:** mathematical behavior is covered by deterministic unit tests and regression fixtures.

## Proposed core architecture

The exact implementation language and framework must be selected after a small performance and platform evaluation. Avoid committing to a framework merely for fashion.

- **Application shell:** lifecycle, navigation, responsive layout, settings and global state.
- **Design system:** tokens, typography, spacing, surfaces, controls, animation and theming.
- **Expression engine:** lexer/tokenizer, parser, AST, evaluator, operator precedence and diagnostics.
- **Numeric core:** safe numeric representation, rational arithmetic, complex numbers, precision and tolerances.
- **Symbolic engine:** simplification, differentiation, integration capabilities and symbolic transformations.
- **Module registry:** typed module metadata, lazy loading and capability boundaries.
- **Plotting engine:** 2D/3D sampling, rendering, interaction and export, isolated from calculation UI.
- **Persistence layer:** versioned local data, migrations, import/export and integrity checks.
- **Platform adapters:** keyboard, touch, clipboard, share, files and optional speech input.
- **Update service:** opt-in updates, integrity verification, rollback-safe installation.

## Performance requirements

- Keep initial startup and first interactive render lean; defer nonessential modules.
- Load heavy modules only when opened or explicitly needed.
- Avoid recalculating unchanged expressions; use bounded caches where measurement justifies them.
- Keep expensive plotting and symbolic work off the main interaction path where the platform allows it.
- Debounce only operations where it improves responsiveness; never make calculator input feel delayed.
- Minimize allocations, DOM/layout churn and unnecessary rendering.
- Respect device limits; degrade optional visual effects before degrading core interaction.
- Measure startup, input-to-result latency, plot frame rate, memory and bundle size on representative phone, tablet and desktop hardware.
- Establish performance budgets before feature implementation and track regressions in CI.

## Planned functional areas

The V10 scope should be rebuilt as independently testable modules:

- Standard and scientific calculator
- Expression history, favorites, undo and redo
- Algebra, equations and linear systems
- Polynomials and complex numbers
- Calculus and symbolic operations
- Sequences and series
- 2D and 3D function plotting
- Statistics, distributions, tests and regression
- Matrices and vectors
- Geometry and unit conversion
- Programmer tools and number bases
- Financial calculations
- Formula library, constants, notes and learning tools
- Data management, settings and optional user profiles

Each module must declare its inputs, outputs, dependencies, error model and tests. Modules should not directly manipulate unrelated UI or persistence internals.

## Rebuild sequence

### Phase 0 — Audit and specification
- Inventory V9 features and behavior.
- Separate must-have features from obsolete or low-value features.
- Build a mathematical acceptance-test corpus from known-good examples.
- Benchmark candidate implementation approaches on representative devices.
- Decide framework, language and packaging based on evidence.

### Phase 1 — Foundation
- Create repository structure, coding standards and CI.
- Implement design tokens and application shell.
- Implement the expression engine and numeric core.
- Add unit tests, fuzz/property tests where useful, and performance baselines.

### Phase 2 — Core experience
- Build calculator input/display and scientific functions.
- Add history, favorites and keyboard/touch interaction.
- Implement persistence and migrations.

### Phase 3 — Advanced modules
- Add algebra, symbolic mathematics, matrices, statistics and plotting as isolated modules.
- Profile each module and optimize measured bottlenecks.

### Phase 4 — Platform polish
- Complete responsive phone/tablet/desktop layouts.
- Add accessibility, reduced-motion behavior and platform integrations.
- Verify offline behavior, data export/import and update integrity.

### Phase 5 — V10 release
- Run full regression, compatibility, security and performance testing.
- Publish release notes, known limitations and migration guidance.
- Keep V9 available as a reference until V10 migration is validated.

## Definition of done

V10 is not complete merely because the screens look new. Release requires:
- Core workflows work reliably on supported device sizes.
- Mathematical regression tests pass.
- No known critical data-loss or security defects.
- Performance budgets are met on representative hardware.
- Offline operation and data migration are verified.
- Every shipped module has documented limitations and tests.

## Explicit non-goals

- Do not preserve V9's single-file architecture just for compatibility.
- Do not add visual effects that compromise responsiveness.
- Do not claim native iOS behavior or platform integration unless implemented and tested.
- Do not port every V9 feature automatically; validate value and correctness first.
