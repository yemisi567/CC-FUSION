module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#4C8DEB",
        "border-color": "#A7A6C3",
        gray: "#405169",
        black: "#000000",
        strokelight: "#ECEEF2",
        strokedark: "#E7E7E7",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        serif: ["ui-serif", "Georgia"],
      },
      fontSize: {
        xss: [
          "0.8rem",
          {
            letterSpacing: "0.02rem",
          },
        ],
        xs: [
          "1rem",
          {
            letterSpacing: "0.024rem",
            lineHeight: "2.4rem",
          },
        ],
        smm: [
          "1.2rem",
          {
            letterSpacing: "0.024rem",
            lineHeight: "2.4rem",
          },
        ],
        sm: [
          "1.4rem",
          {
            letterSpacing: "0.028rem",
            lineHeight: "2rem",
          },
        ],
        base: [
          "1.6rem",
          {
            letterSpacing: "0.032rem",
          },
        ],
        md: [
          "1.6rem",
          {
            lineHeight: "2.4rem",
          },
        ],
        lg: [
          "1.8rem",
          {
            lineHeight: "2.6rem",
          },
        ],
        xl: "2rem",
        xxl: "2.4rem",
      },
      borderRadius: {
        r6: "6px",
        r8: "8px",
      },
      borderWidth: {
        1.5: "1.5px",
      },
      boxShadow: {
        active:
          "0px 0px 0px 1px rgba(87, 106, 129, 0.16), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",
        dropdown:
          "0px 5px 15px 0px rgba(0, 0, 0, 0.08), 0px 15px 35px -5px rgba(17, 24, 38, 0.15), 0px 0px 0px 1px rgba(152, 161, 178, 0.10)",
      },
      height: {
        4: "0.4rem",
        8: "0.8rem",
        12: "1.2rem",
        16: "1.6rem",
        20: "2rem",
        24: "2.4rem",
        28: "2.8rem",
        32: "3.2rem",
        36: "3.6rem",
        40: "4rem",
        44: "4.4rem",
        48: "4.8rem",
      },
      minHeight: {
        4: "0.4rem",
        8: "0.8rem",
        12: "1.2rem",
        16: "1.6rem",
        20: "2rem",
        24: "2.4rem",
        28: "2.8rem",
        32: "3.2rem",
        36: "3.6rem",
        40: "4rem",
        44: "4.4rem",
        48: "4.8rem",
      },
      width: {
        4: "0.4rem",
        8: "0.8rem",
        12: "1.2rem",
        16: "1.6rem",
        20: "2rem",
        24: "2.4rem",
        28: "2.8rem",
        32: "3.2rem",
        36: "3.6rem",
        40: "4rem",
        44: "4.4rem",
        48: "4.8rem",
      },
      padding: {
        4: "4px",
        8: "8px",
        10: "10px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
        36: "36px",
        40: "40px",
        44: "44px",
        48: "48px",
      },
      margin: {
        4: "0.4rem",
        8: "0.8rem",
        10: "1rem",
        12: "1.2rem",
        16: "1.6rem",
        20: "2rem",
        24: "2.4rem",
        28: "2.8rem",
        32: "3.2rem",
        36: "3.6rem",
        40: "4rem",
        44: "4.4rem",
        48: "4.8rem",
      },
      gap: {
        4: "0.4rem",
        8: "0.8rem",
        10: "1rem",
        12: "1.2rem",
        16: "1.6rem",
        20: "2rem",
        24: "2.4rem",
        28: "2.8rem",
        32: "3.2rem",
        36: "3.6rem",
        40: "4rem",
        44: "4.4rem",
        48: "4.8rem",
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".before": {
          content: "''",
        },
        ".after": {
          content: "''",
        },
      };
      addUtilities(newUtilities, ["before", "after"]);
    },
  ],
};
