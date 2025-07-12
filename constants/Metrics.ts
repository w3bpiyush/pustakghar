import { scale, verticalScale } from "../utils/styling";

export const Spacing = {
  xs:  scale(4),    // 4 dp
  s:   scale(8),    // 8 dp
  m:   scale(16),   // 16 dp
  l:   scale(24),   // 24 dp
  xl:  scale(32),   // 32 dp
  xxl: scale(40),   // 40 dp
};

export const FontSizes = {
  h1:   scale(32),
  h2:   scale(28),
  h3:   scale(24),
  h4:   scale(20),
  h5:   scale(18),
  h6:   scale(16),
  body: scale(14),
  small: scale(12),
};

export const IconSizes = {
  tiny:   scale(12),
  small:  scale(16),
  medium: scale(24),
  large:  scale(32),
  xl:     scale(40),
};

export const Radii = {
  s:   scale(4),
  m:   scale(8),
  l:   scale(12),
  pill: scale(50),   // fully rounded corners
};

// export const HitSlop = {
//   s:   scale(4),
//   m:   scale(8),
//   l:   scale(12),
// };

// export const ComponentHeights = {
//   header: verticalScale(56),
//   tabBar: verticalScale(64),
//   button: verticalScale(48),
// };

const Metrics = {
  Spacing,
  FontSizes,
  IconSizes,
  Radii,
};

export default Metrics;
