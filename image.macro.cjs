const { execFileSync } = require("child_process");
const { parseExpression } = require("@babel/parser");
const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(({ references }) => {
  if (references.importBlob) {
    references.importBlob.forEach((referencePath) => {
      const blobId = referencePath.parent.arguments[0].value;

      const response = JSON.parse(
        execFileSync(process.execPath, [
          "--input-type=module",
          "-e",
          `
            import fetch from "node-fetch"
            fetch("${process.env.API}/api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: "query { blob(name: \\"${blobId}\\") { id name asImage { url dimensions { width height } placeholder { url } } asVideo { poster { url dimensions { width height } placeholder { url } } renditions { url } } } }"
              })
            }).then(res => res.json()).then(json => {
              process.stdout.write(JSON.stringify(json));
            });
          `,
        ])
      );

      const replacement = parseExpression(`${JSON.stringify(response.data.blob)}`);
      referencePath.parentPath.replaceWith(replacement);
    });
  }
});
