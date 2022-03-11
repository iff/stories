const { execFileSync } = require("child_process");
const { parseExpression } = require("@babel/parser");
const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(({ references }) => {
  if (references.importBlob) {
    references.importBlob.forEach((referencePath) => {
      const blobId = referencePath.parent.arguments[0].value;

      const response = JSON.parse(
        execFileSync(process.execPath, [
          "-e",
          `
            require("request")({
              url: "${process.env.API}/api",
              method: "POST",
              json: {
                query: "query { blob(name: \\"${blobId}\\") { name asImage { url dimensions { width height } placeholder { url } } asVideo { poster { url dimensions { width height } placeholder { url } } renditions { url } } } }"
              }
            }, (err, response, body) => {
              process.stdout.write(JSON.stringify(body));
            });
          `,
        ])
      );

      const blob = response.data.blob;

      if (blob.asVideo) {
        const replacement = parseExpression(`${JSON.stringify(blob)}`);
        referencePath.parentPath.replaceWith(replacement);
      } else {
        const value = {
          name: blob.name,
          hash: blob.name,

          src: blob.asImage.url,

          ...blob.asImage.dimensions,
          sqip: {
            src: blob.asImage.placeholder.url,
          },
        };

        const replacement = parseExpression(`${JSON.stringify(value)}`);
        referencePath.parentPath.replaceWith(replacement);
      }
    });
  }
});
