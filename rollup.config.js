import rollupTypescript from "rollup-plugin-typescript";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import progress from "rollup-plugin-progress";

// 扩展名
const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
    input: "src/index.ts",
    external: ["react", "react-dom"],
    output: [
        {
            file: "lib/index.js",
            format: "umd",
            name: "Hooks",
            sourcemap: true,
            globals: {
                react: "React",
                "react-dom": "ReactDOM"
            }
        },
        {
            file: "es/index.js",
            format: "es",
            sourcemap: true
        }
    ],
    plugins: [
        resolve({
            jsnext: true,
            extensions
        }),
        commonjs({
            include: "node_modules/**"
        }),
        rollupTypescript(),
        progress({ clearLine: true })
    ]
};
