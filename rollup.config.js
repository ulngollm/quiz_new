import { nodeResolve } from "@rollup/plugin-node-resolve";
export default {
  input: "src/js/app.js",
  output: {
    file: "build/bundle.js",
  },
  plugins: [nodeResolve()],
};
