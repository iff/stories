{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };

          banner = pkgs.writeShellScriptBin "banner" ''
            clear

            ${pkgs.figlet}/bin/figlet stories
            echo " … for nothing remains of us but the vibrations we leave behind."
          '';

          scripts = {
            dev = pkgs.writeShellScriptBin "dev" ''
              ./node_modules/.bin/next dev
            '';
          };
        in {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs
              pkgs.nodejs.pkgs.pnpm

              scripts.dev
            ];

            shellHook = ''
              ${banner}/bin/banner
            '';
          };

          devShells.workflow = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs
              pkgs.nodejs.pkgs.pnpm

              pkgs.curl
            ];

            shellHook = ''
              pnpm install >/dev/null 2>&1
            '';

            PLAYWRIGHT_EXECUTABLE_PATH = "${pkgs.chromium}/bin/chromium";
          };
        }
      );
}
