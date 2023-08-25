import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    banner: "#! /usr/bin/env node",
    dir: "bin",
  },
  plugins: [typescript()],
};
