# Official platform documentation

Last checked: 2026-11-05

Use these as the primary research starting points. Re-open them when making current or version-sensitive recommendations; do not assume this snapshot remains current indefinitely.

## Apple

- [Human Interface Guidelines — Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)
  - Core gesture principles, standard gestures, accessibility alternatives, system-gesture conflicts, and iOS/iPadOS considerations.
- [Human Interface Guidelines — Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views)
  - Native scrolling expectations and scroll indicators.
- [Handling swipe gestures — UIKit](https://developer.apple.com/documentation/uikit/handling-swipe-gestures)
  - `UISwipeGestureRecognizer`; discrete swipe recognition and appropriate use.
- [Handling UIKit gestures](https://developer.apple.com/documentation/uikit/handling-uikit-gestures)
  - Gesture recognizer states, continuous gestures, and coordination.
- [UINavigationController interactivePopGestureRecognizer](https://developer.apple.com/documentation/uikit/uinavigationcontroller/interactivepopgesturerecognizer)
  - Interactive navigation pop from the leading screen edge.
- [UINavigationController interactiveContentPopGestureRecognizer](https://developer.apple.com/documentation/uikit/uinavigationcontroller/interactivecontentpopgesturerecognizer)
  - Interactive pop behavior initiated by panning in the content area; verify availability and applicability for the target SDK before relying on it.
- [Designing for iOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios)
  - Platform-specific interaction and one-handed reachability considerations.

## Android

- [Ensure compatibility with gesture navigation](https://developer.android.com/develop/ui/views/touch-and-input/gestures/gesturenav)
  - Edge-to-edge, conflicting app gestures, Back from either edge, gesture exclusion, and predictive Back.
- [Add support for the predictive Back gesture](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture)
  - Current implementation guidance, AndroidX and platform callbacks, Compose `PredictiveBackHandler`, and version-specific behavior.
- [Predictive Back design](https://developer.android.com/design/ui/mobile/guides/patterns/predictive-back)
  - User-facing design rationale and commit/cancel preview behavior.
- [Add support for predictive Back animations](https://developer.android.com/guide/navigation/custom-back/support-animations)
  - Custom in-app predictive transitions and animation guidance.
- [Use touch gestures — Android Views](https://developer.android.com/develop/ui/views/touch-and-input/gestures)
  - Gesture detection, scrolling, flinging, touch dispatch, and multi-touch.
- [Understand gestures — Jetpack Compose](https://developer.android.com/develop/ui/compose/touch-input/pointer-input/understand-gestures)
  - High-level gesture APIs, semantics, gesture arbitration, and pointer input.
- [Pointer input in Compose](https://developer.android.com/develop/ui/compose/touch-input/pointer-input)
  - Compose pointer input API overview.
- [Nested scrolling modifiers — Jetpack Compose](https://developer.android.com/develop/ui/compose/touch-input/scroll/nested-scroll-modifiers)
  - Nested scroll delta coordination.
- [Animate a scroll gesture — Android Views](https://developer.android.com/develop/ui/views/touch-and-input/gestures/scroll)
  - Drag, fling, panning, snap-to-page, and overscroll behavior.
- [WindowInsets.Type.systemGestures](https://developer.android.com/reference/android/view/WindowInsets.Type#systemGestures())
  - System gesture insets and exclusion API context.

## Research notes

- Android gesture navigation has used inward Back swipes from both the left and right screen edges since Android 10 (API 29). Android 13 (API 33) introduced predictive Back as a platform direction; implementation and animation support have evolved since then.
- iOS navigation-controller Back is conventionally an interactive swipe from the leading screen edge. In left-to-right layouts this is usually the left edge; use leading/trailing semantics for RTL.
- A discrete swipe recognizer and a continuous pan/drag recognizer are not interchangeable. Choose based on whether the UI needs to track the finger.
- Pull-to-refresh, swipe-to-dismiss, and swipe-to-reveal are common app patterns, not universal system navigation gestures. Their exact affordances and implementation vary by component and platform.
- Horizontal swiping between tabs is contextual, not a universal expectation for every tab bar.
- Android gesture exclusion should be narrowly scoped and justified; it is not a general method for reclaiming system navigation edges.
