import { colors } from "./colors";

const family = {
  light: 'System',
  system: 'System',
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  semi: 'System',
  bold: 'Montserrat-Bold',
  secondaryRegular: 'Montserrat-Regular',
};



const sizes = {
  h1: 24,
  h2: 16,
  h3: 14,
  h4: 13,
};

const headerBig = {
  medium: {
    fontSize: 44,
    lineHeight: 54,
    fontFamily: family.system,
  },
  bold: {
    fontSize: 44,
    lineHeight: 54,
    fontFamily: family.system,
  },
};

const h1 = {
  regular: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: family.system,
  },
  semi: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: family.system,
  },
  bold: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: family.system,
  },
};

const h2 = {
  light: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: family.system,
    color: colors.silver
  },
  regular: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: family.system,
  },
  semi: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: family.system,
  },
};

const h3 = {
  light: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: family.system,
  },
  regular: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: family.system,
  },
  medium: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: family.system,
  },
  semi: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: family.semi,
  },
  secondary: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: family.secondaryRegular,
  },
};

const h4 = {
  secondary: {
    fontSize: 8,
    lineHeight: 14,
    fontFamily: family.system,
  },
  light: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: family.light,
  },
  regular: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: family.regular,
  },
  medium: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: family.medium,
  },
  semi: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: family.semi,
  },
};

export const fonts = {
  family,
  sizes,
  headerBig,
  h1,
  h2,
  h3,
  h4,
};
