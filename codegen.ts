import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema.graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      config: {
        documentMode: "string",
        immutableTypes: true,
        enumsAsTypes: true,
        avoidOptionals: true,

        strictScalars: true,
        defaultScalarType: "unknown",
        scalars: {
          Date: "string",
          DateTime: "string",
          GeoPoint: "{ latitude: number, longitude: number }",
          Integer: "number",
          URI: "string",
        },
      },
    },
  },
};

export default config;
