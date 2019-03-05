// 显示打包进度
import progress from "rollup-plugin-progress";
// 解析node_modules里的包
import resolve from "rollup-plugin-node-resolve";
// 解析ts
import typescript from "rollup-plugin-typescript";

// 扩展名
const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
    input: "src/index.ts",
    external: ["react"],
    output: {
        file: "dist/index.es.js",
        format: "es",
        sourcemap: true
    },
    plugins: [
        resolve({
            jsnext: true,
            extensions
        }),
        typescript(),
        progress({ clearLine: true })
    ]
};
